$(document).ready(function () {
  // All Category
  if (window.location.pathname === "/index.html") {
    $.ajax({
      url: "https://www.themealdb.com/api/json/v1/1/categories.php",
      method: "GET",
      success: function (data) {
        let categories = data.categories;
        categories.forEach((category) => {
          $("#category-list").append(`
                        <div class="col-md-3 col-6">
                            <div class="card" style='background-image: url(${category.strCategoryThumb}); background-size: cover; background-position:center'>
                               <div class="overlay"></div>
                                <div class="card-body">
                                    <h5 class="card-title">${category.strCategory}</h5>
                                </div>
                            </div>
                        </div>
                    `);
        });
        $("#category-list").on("click", ".card", function () {
          const categoryClicked = $(this).find(".card-title").text();
          window.location.href = `meals.html?category=${categoryClicked}`;
        });
      },
    });
  }

  // Meals per Category
  if (window.location.pathname === "/meals.html") {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");
    $("#category-name").text(categoryName);

    $.ajax({
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
      method: "GET",
      success: function (data) {
        let meals = data.meals;
        const mealsPerPage = 8;
        const totalPages = Math.ceil(meals.length / mealsPerPage);
        let currentPage = 1;

        function displayMeals(page) {
          $("#meal-list").empty();
          const start = (page - 1) * mealsPerPage;
          const end = start + mealsPerPage;
          const mealsToShow = meals.slice(start, end);

          mealsToShow.forEach((meal) => {
            $("#meal-list").append(`
                            <div class="col-md-3 col-6">
                                <div class="card" data-id='${meal.idMeal}' style='background-image: url(${meal.strMealThumb}); background-size: cover; background-position:center'>
                                   <div class="overlay"></div>
                                    <div class="card-body">
                                        <h5 class="card-title">${meal.strMeal}</h5>
                                    </div>
                                </div>
                            </div>
                        `);
          });
        }

        function setPagination() {
          $("#pagination-controls").empty();
          for (let i = 1; i <= totalPages; i++) {
            $("#pagination-controls").append(`
                <li class="page-item ${i === currentPage ? "active" : ""}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
          }
        }

        displayMeals(currentPage);
        setPagination();

        $("#pagination-controls").on("click", ".page-link", function (event) {
          event.preventDefault();
          currentPage = parseInt($(this).data("page"));
          displayMeals(currentPage);
          setPagination();
        });

        $("#meal-list").on("click", ".card", function () {
          const mealClicked = $(this).data("id");
          window.location.href = `meal-detail.html?meal=${mealClicked}`;
        });
      },
    });
  }

  // Meal Detail
  if (window.location.pathname === "/meal-detail.html") {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get("meal");

    $.ajax({
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      method: "GET",
      success: function (data) {
        const meal = data.meals[0];
        $("#meal-title").text(meal.strMeal);

        if (meal.strTags) {
          const tags = meal.strTags.split(",").map((tag) => tag.trim());
          tags.forEach((tag) => {
            $("#meal-tags").append(
              `<span class="badge text-bg-primary me-2">${tag}</span>`
            );
          });
        }

        if (!meal.strTags) {
          $("#meal-tags").append(
            `<span class="badge me-2">${meal.strCategory}</span>`
          );
        }

        $(document).ready(function () {
          let favoriteMeals =
            JSON.parse(localStorage.getItem("favoriteMeals")) || [];

          if (favoriteMeals.includes(mealId)) {
            $("#add-to-favorites")
              .text("Remove from Favorite")
              .addClass("filled")
              .removeClass("unfilled");
          } else {
            $("#add-to-favorites")
              .text("Add to Favorite")
              .removeClass("filled")
              .addClass("unfilled");
          }

          $("#add-to-favorites").on("click", function () {
            if (favoriteMeals.includes(mealId)) {
              favoriteMeals = favoriteMeals.filter((id) => id !== mealId);
              alert("Meal removed from favorites");
              $(this).text("Add to Favorite");
            } else {
              favoriteMeals.push(mealId);
              alert("Meal added to favorites");
              $(this).text("Remove from Favorite");
            }

            localStorage.setItem(
              "favoriteMeals",
              JSON.stringify(favoriteMeals)
            );
          });
        });

        $("#meal-image")
          .attr("src", meal.strMealThumb)
          .attr("alt", meal.strMeal);

        const instructions = meal.strInstructions.split(/\r\n/);
        instructions.forEach((instruction) => {
          if (instruction.trim()) {
            $("#meal-description").append(
              `<p style="text-align: justify; margin-bottom: 1.5rem;">${instruction}</p>`
            );
          }
        });

        Object.keys(meal)
          .filter((key) => key.startsWith("strIngredient") && meal[key])
          .forEach((key) => {
            const ingredient = meal[key];
            const measure = meal[`strMeasure${key.slice(-1)}`];

            const ingredientId = `ingredient-${key.slice(-1)}-${mealId}`;

            $("#meal-recipe").append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <label for="${ingredientId}" class="form-check-label">
                <b>${ingredient}</b> - ${measure}
                </label>
                <input type="checkbox" id="${ingredientId}" class="form-check-input" />
            </li>
          `);
          });

        function loadIngredientStates() {
          Object.keys(meal)
            .filter((key) => key.startsWith("strIngredient") && meal[key])
            .forEach((key) => {
              const ingredientId = `ingredient-${key.slice(-1)}-${mealId}`;
              const isChecked = localStorage.getItem(ingredientId) === "true";
              $(`#${ingredientId}`).prop("checked", isChecked);
            });
        }

        function saveIngredientStates(ingredientId) {
          const isChecked = $(`#${ingredientId}`).is(":checked");
          localStorage.setItem(ingredientId, isChecked);
        }

        $(document).ready(function () {
          loadIngredientStates();

          $("#meal-recipe").on("change", "input[type='checkbox']", function () {
            const ingredientId = $(this).attr("id");
            saveIngredientStates(ingredientId);
          });
        });

        const youtubeId = meal.strYoutube.split("v=")[1];
        $("#youtube-container").append(`
                <iframe width="100%" height="415" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe>
            `);
      },
    });
  }

  // Favorite Meals
  if (window.location.pathname === "/meals-favorite.html") {
    let favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    favoriteMeals.forEach((mealId) => {
      $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
        method: "GET",
        success: function (data) {
          const meal = data.meals[0];
          $("#favorite-meals-list").append(`
              <div class="col-md-3 col-6">
                  <div class="card" data-id='${meal.idMeal}' style='background-image: url(${meal.strMealThumb}); background-size: cover; background-position:center'>
                    <div class="overlay"></div>
                      <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                      </div>
                  </div>
                </div>
              </div>
            `);
        },
      });
    });

    $("#favorite-meals-list").on("click", ".card", function () {
      const mealClicked = $(this).data("id");
      window.location.href = `meal-detail.html?meal=${mealClicked}`;
    });
  }
});

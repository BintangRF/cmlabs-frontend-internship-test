# Meal Categories Web App

Aplikasi web ini memungkinkan pengguna untuk menjelajahi kategori makanan, melihat daftar makanan dalam kategori yang dipilih, dan melihat detail makanan. Aplikasi ini menggunakan API dari [TheMealDB](https://www.themealdb.com) untuk mendapatkan data kategori dan makanan.

## Fitur

- **Daftar Kategori**: Pengguna dapat melihat daftar kategori makanan yang tersedia.
- **Detail Kategori**: Ketika kategori dipilih, pengguna dapat melihat daftar makanan dalam kategori tersebut.
- **Detail Makanan**: Pengguna dapat melihat detail lengkap dari makanan yang dipilih, termasuk bahan-bahan, resep, dan video tutorial di YouTube.
- **Responsif**: Desain aplikasi responsif dan dapat diakses dengan baik di perangkat seluler maupun desktop.

### Fitur Tambahan

1. **Checkbox pada Resep**:

   - Pengguna dapat menandai bahan-bahan yang telah dibeli menggunakan checkbox yang tersedia di bagian resep. Ini memudahkan pengguna untuk melacak bahan-bahan yang telah mereka beli saat berbelanja.
   - Status checkbox akan disimpan menggunakan **Local Storage**, sehingga pengguna dapat menutup dan membuka kembali aplikasi tanpa kehilangan informasi tentang bahan yang telah ditandai.

2. **My Favorite**:
   - Pengguna dapat menandai makanan sebagai favorit dengan mengklik tombol favorit. Makanan favorit akan disimpan dalam **Local Storage**, sehingga pengguna dapat dengan mudah mengaksesnya di lain waktu.
   - Pengguna dapat melihat daftar makanan favorit mereka kapan saja melalui halaman favorit yang disediakan.

## Cara Menjalankan Aplikasi

1. **Clone atau Unduh Repositori**:

   - Clone repositori ini atau unduh file ZIP dari repositori.

2. **Buka File HTML**:

   - Navigasikan ke folder proyek di komputer Anda.
   - Buka file `index.html` di browser Anda dengan cara mengklik ganda pada file tersebut atau dengan menggunakan menu "Open File" di browser.

3. **Navigasi Melalui Aplikasi**:
   - Di halaman utama, Anda akan melihat daftar kategori makanan. Klik pada kategori untuk melihat daftar makanan yang terkait.
   - Klik pada makanan untuk melihat detail lengkapnya.

## Teknologi yang Digunakan

- HTML
- CSS (Bootstrap)
- JavaScript (jQuery)
- API: [TheMealDB](https://www.themealdb.com)

## Catatan

Pastikan Anda terhubung ke internet untuk memuat data kategori dan makanan dari API.

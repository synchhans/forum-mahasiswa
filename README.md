# Forum Mahasiswa

Proyek ini adalah aplikasi web yang dibangun menggunakan **Next.js** dan **TypeScript**, dengan integrasi ke **MongoDB** untuk penyimpanan data dan di-deploy menggunakan **Vercel**. Aplikasi ini ditujukan untuk menyediakan platform dinamis yang dapat digunakan oleh universitas mana pun untuk forum mahasiswa, lengkap dengan fitur untuk pengembang dan penyesuaian penuh.

---

## Fitur

- **Informasi Utama**: Mahasiswa dapat melihat pengumuman, diskusi, dan agenda yang relevan.
- **Pengaturan Dinamis**: Developer dapat mengubah logo, nama, tautan, dan elemen lainnya melalui dashboard pengembang.
- **Dashboard Developer**: Developer dapat mengakses `/dev` dan login menggunakan akun yang sudah didaftarkan di **Clerk** oleh developer asli.
- **CRUD Data**: Manajemen data pengumuman, diskusi, dan agenda secara penuh.
- **Desain Responsif**: Antarmuka pengguna yang ramah perangkat mobile.
- **Deployment Cepat**: Menggunakan **Vercel** untuk pengembangan dan penyebaran.

---

## Teknologi yang Digunakan

- **Next.js**: Framework React untuk pengembangan aplikasi web.
- **TypeScript**: Bahasa pemrograman dengan tipe statis untuk meningkatkan pengembangan.
- **MongoDB**: Database NoSQL untuk penyimpanan data.
- **Vercel**: Platform untuk hosting aplikasi Next.js.
- **Tailwind CSS**: CSS Utility-first untuk desain responsif.
- **Clerk**: Platform otentikasi modern.

---

## Prasyarat

Sebelum memulai, pastikan Anda sudah menginstal:

- [Node.js](https://nodejs.org/) (versi 14 atau lebih baru)
- [MongoDB](https://www.mongodb.com/) (untuk pengembangan lokal atau gunakan MongoDB Atlas)
- [GitHub](https://github.com/) (jika belum memiliki akun, buat terlebih dahulu)
- [Vercel](https://vercel.com/) (jika belum memiliki akun, buat terlebih dahulu)
- [Clerk](https://clerk.com/) (jika belum memiliki akun, buat terlebih dahulu)

---

## Instalasi

1. **Clone repo ini**:

   ```bash
   git clone https://github.com/username/forum-mahasiswa.git
   cd forum-mahasiswa
   ```

2. **Instal dependensi**:

   ```bash
   npm install
   ```

3. **Setup variabel lingkungan**:

   Buat file `.env.local` di root proyek Anda dan tambahkan konfigurasi berikut:

   ```
   MONGODB_URI=<your_mongodb_connection_string>
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
   CLERK_SECRET_KEY=<your_secret_key>
   ```

4. **Jalankan proyek secara lokal**:

   ```bash
   npm run dev
   ```

   Akses aplikasi di `http://localhost:3000`.

---

## Deployment

Proyek ini siap untuk di-deploy di **Vercel**. Anda dapat mengikuti langkah-langkah berikut:

1. Push perubahan Anda ke GitHub.
2. Daftarkan proyek Anda di [Vercel](https://vercel.com/).
3. Sambungkan repositori GitHub Anda, dan Vercel akan otomatis mengatur proses build dan deploy.

---

## Struktur Direktori

Berikut adalah struktur direktori utama proyek:

```
.
├── public/               # File statis seperti gambar, favicon, dll.
├── src/                  # Kode sumber utama aplikasi
│   ├── app/              # Halaman Next.js
│   ├── app/components/   # Komponen React
│   ├── app/api/          # Layanan API
├── utils/                # Logika Aplikasi dan Model
├── .env.local            # Variabel lingkungan
├── package.json          # Konfigurasi npm
└── tsconfig.json         # Konfigurasi TypeScript
```

---

## Tutorial

Ikuti langkah-langkah detail untuk mengonfigurasi aplikasi ini, mulai dari pengaturan lingkungan, hingga deployment di Vercel dengan mengakses tutorial YouTube berikut:
[🔗 Tutorial YouTube](https://youtu.be/wqsY3gVGo_4)

---

## Aplikasi

Untuk saat ini perancangan nya kita break dulu sampai web app, jika banyak yang suka, Gasss kita buat pengembangan untuk aplikasi mobile nya ya! ^-^

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, ikuti langkah-langkah berikut:

1. Fork repositori ini.
2. Buat cabang baru untuk fitur/bug fix Anda.
3. Kirim pull request dengan deskripsi perubahan Anda.

---

## Kontak

- [LinkedIn](https://www.linkedin.com/in/muhamadfarhaninc)
- [YouTube](https://youtube.com/codeworshipper)
- Email: muhamadfarhan.inc@gmail.com

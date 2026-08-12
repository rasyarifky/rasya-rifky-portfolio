# Rasya Rifky — Personal Portfolio

Website portofolio multi-halaman untuk Rasya Rifky (`FYRNNN`) dengan tema dark emerald, dua bahasa, galeri Design, Program, Animation, modal detail, video preview, dan desain responsif.

## Teknologi

- React 19
- Next.js 16
- Vinext + Vite
- TypeScript
- React Icons
- Cloudflare-compatible Worker output

## Persyaratan

- Node.js 22.13 atau lebih baru
- npm 10 atau lebih baru

Cek versi:

```bash
node --version
npm --version
```

## Menjalankan di Komputer

1. Ekstrak ZIP.
2. Buka terminal di folder proyek.
3. Instal dependency:

```bash
npm ci
```

4. Jalankan development server:

```bash
npm run dev
```

5. Buka alamat lokal yang ditampilkan terminal.

Perintah `npm run dev` sudah kompatibel dengan PowerShell, Command Prompt, macOS, dan Linux. Jika sebelumnya muncul pesan `'WRANGLER_LOG_PATH' is not recognized`, gunakan versi kode terbaru ini.

## Build Produksi

```bash
npm run lint
npm run build
```

Hasil produksi dibuat di folder `dist/` dan sudah menggunakan format Worker ESM yang kompatibel dengan Cloudflare.

## Bagian yang Paling Sering Diubah

- Konten karya, URL sosial, dan tautan proyek: `app/data.ts`
- Komponen dan teks Indonesia/Inggris: `app/components/PortfolioSite.tsx`
- Seluruh tampilan, animasi, dan responsivitas: `app/globals.css`
- Metadata SEO: `app/layout.tsx`, `app/robots.ts`, dan `app/sitemap.ts`
- Video animasi: `public/media/mvi-2116.mp4`
- Ikon website: `public/favicon.svg`

## Menambah atau Mengganti Karya

Edit array berikut di `app/data.ts`:

- `designs` untuk karya desain
- `programs` untuk proyek website/aplikasi
- `animations` untuk karya animasi
- `social` untuk tautan media sosial

Nilai rasio yang tersedia:

```ts
ratio: "portrait"   // 4:5
ratio: "landscape"  // 16:10
ratio: "square"     // 1:1
```

Untuk proyek Program, ganti nilai `url` dengan alamat proyek asli. Tautan contoh saat ini sengaja disediakan agar tombol **Lihat Website** dapat diuji.

Semua media dapat menggunakan link berbagi Google Drive. Pastikan akses file adalah **Siapa saja yang memiliki link**.

Contoh karya Design dengan gambar Drive:

```ts
{
  id: "d7",
  title: "Nama Karya",
  subtitle: { id: "Desain poster", en: "Poster design" },
  ratio: "portrait",
  tone: 1,
  image: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
  imageAlt: "Deskripsi singkat gambar",
  description: {
    id: "Deskripsi bahasa Indonesia.",
    en: "English description."
  }
}
```

Contoh Program dengan screenshot Drive:

```ts
{
  id: "p4",
  title: "Nama Program",
  subtitle: { id: "Aplikasi web", en: "Web application" },
  ratio: "landscape",
  tone: 2,
  image: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
  url: "https://alamat-proyek.com",
  description: {
    id: "Deskripsi bahasa Indonesia.",
    en: "English description."
  }
}
```

## Menambah Video Animation dari Google Drive

Tambahkan link berbagi pada properti `video`:

```ts
{
  id: "a4",
  title: "Nama Animasi",
  subtitle: { id: "Desain gerak — 00:30", en: "Motion design — 00:30" },
  ratio: "landscape",
  tone: 3,
  video: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
  description: {
    id: "Deskripsi bahasa Indonesia.",
    en: "English description."
  }
}
```

Website otomatis:

- mengambil thumbnail Google Drive untuk kartu animasi;
- memakai pemutar Google Drive pada modal;
- mengambil thumbnail Drive untuk gambar Design dan Program;
- tetap menerima path lokal jika suatu saat diperlukan.

Jika menggunakan file lokal:

1. Simpan video baru di `public/media/`.
2. Isi `video: "/media/nama-video.mp4"` pada karya terkait.
3. Gunakan MP4 H.264 agar kompatibel dengan sebagian besar browser.

## Hosting Gratis

Kode ini menghasilkan Worker ESM dan paling cocok dipasang pada layanan Cloudflare. Website tidak membutuhkan database, API berbayar, atau penyimpanan eksternal untuk fungsi yang sekarang.

Sebelum memasang pada domain sendiri:

1. Ganti seluruh tautan contoh di `app/data.ts`.
2. Ganti URL sosial dan Saweria.
3. Ganti metadata/domain di `app/layout.tsx`, `app/robots.ts`, dan `app/sitemap.ts`.
4. Jalankan `npm run lint` dan `npm run build`.

## Perintah Tersedia

```bash
npm run dev       # development
npm run lint      # pemeriksaan kode
npm run build     # build produksi + validasi artifact
npm test          # build dan pengujian metadata
npm run start     # menjalankan hasil build
```

## Fitur yang Sudah Tersedia

- Home, About, Design, Program, dan Animation
- Bahasa Indonesia dan Inggris
- Navbar hide/show berdasarkan arah scroll
- Mobile navigation
- Modal dengan X, Escape, backdrop, previous, dan next
- Focus trap dan pengembalian focus
- Scroll lock saat modal terbuka
- Rasio media konsisten
- Marquee pause saat hover dan kembali berjalan setelah modal ditutup
- Video animasi autoplay/controls
- Reduced-motion support
- SEO metadata, sitemap, robots, dan favicon
- Social icons dan tautan eksternal

## Catatan

Folder `node_modules`, `dist`, `.git`, dan cache lokal tidak disertakan dalam ZIP karena dapat dibuat ulang melalui `npm ci` dan `npm run build`.

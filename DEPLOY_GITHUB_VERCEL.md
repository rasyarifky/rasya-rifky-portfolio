# Deploy melalui GitHub dan Vercel

## Jalankan secara lokal

```bat
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Simpan ke GitHub

1. Buat repository kosong bernama `rasya-rifky-portfolio` di GitHub.
2. Jangan aktifkan README, `.gitignore`, atau License ketika membuat repository.
3. Buka CMD pada folder project ini.
4. Jalankan perintah berikut dan ganti URL repository.

```bat
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/rasya-rifky-portfolio.git
git push -u origin main
```

## Hubungkan ke Vercel

1. Masuk ke https://vercel.com menggunakan akun GitHub.
2. Pilih **Add New > Project**.
3. Pilih repository `rasya-rifky-portfolio`.
4. Pastikan Framework Preset terbaca sebagai **Next.js**.
5. Biarkan Build Command `next build` dan Output Directory kosong/default.
6. Pilih **Deploy**.

Setiap perubahan berikutnya dikirim dengan:

```bat
git add .
git commit -m "Update portfolio"
git push
```

Vercel akan melakukan deployment otomatis setelah push berhasil.

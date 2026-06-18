# Web Nokos

Web sewa nomor virtual buat terima OTP, pakai API [RumahOTP](https://www.rumahotp.io). Dibikin dua bagian:

- `backend/` — Express, proxy ke RumahOTP (API key disimpan di server, gak nyentuh browser), simpan riwayat pesanan ke file JSON lokal.
- `frontend/` — React + Vite + Tailwind, ngomong ke backend, bukan langsung ke RumahOTP.

Keduanya dibikin dengan struktur **clean architecture**: `domain` (entity + kontrak interface) tidak bergantung ke apapun, `usecases` cuma bergantung ke kontrak domain, `infrastructure` adalah implementasi konkret dari kontrak (axios, file JSON, fetch ke backend), dan `presentation` (controller/route di backend, component/page di frontend) yang merangkai semuanya lewat satu *composition root* (`container.js` / pemanggilan hook).

## Jalanin di Termux

```bash
# Backend
cd backend
npm install
cp .env.example .env
# edit .env, isi RUMAHOTP_API_KEY
npm run dev          # jalan di :4000

# Frontend (buka termux session baru / pakai tmux)
cd frontend
npm install
cp .env.example .env  # VITE_API_BASE_URL udah default ke localhost:4000/api
npm run dev           # jalan di :5173
```

## Deploy

- **Backend** → push ke VPS atau Railway, jalanin pakai PM2 (`pm2 start server.js --name web-nokos-api`), atau native di Railway. Set environment variable `RUMAHOTP_API_KEY` lewat dashboard/`.env`, jangan pernah commit `.env` (udah ada di `.gitignore`).
- **Frontend** → deploy ke Vercel, set `VITE_API_BASE_URL` ke URL backend yang udah online (misal `https://api-nokos.up.railway.app/api`).

## Alur pakai

1. **Beli Nomor** → pilih aplikasi (WhatsApp/Telegram/dst) → pilih negara & harga → pilih operator → otomatis bikin pesanan.
2. Begitu pesanan aktif, frontend polling status tiap 5 detik (`/api/orders/:id`) sampai OTP masuk, kadaluarsa, atau dibatalkan.
3. **Riwayat** narik semua pesanan yang pernah dibuat dari `backend/data/orders.json` (lokal, bukan dari RumahOTP — APInya sendiri gak nyediain endpoint "list semua order").
4. **Saldo** nunjukin saldo akun RumahOTP kamu saat ini.

## Catatan

- Rate limit RumahOTP: 5 request / 10 detik per IP — jangan spam tombol refresh/pesan.
- Sesuai ToS RumahOTP: API ini cuma buat testing & bisnis yang legal, bukan buat hal ilegal.
- `backend/data/orders.json` itu state lokal — kalau pindah server tanpa mindahin file ini, riwayat ilang (gpp buat status pesanan, karena status final tetep bisa dicek ulang lewat `order_id` ke RumahOTP kalau perlu).

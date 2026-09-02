# 🚀 Panduan Deployment Portal Berita Dua Narasi (`duanarasi.com`)

Panduan lengkap untuk men-deploy aplikasi Next.js Portal Berita **Dua Narasi** ke server production.

---

## 📋 Prasyarat Sistem & Environment

Pastikan server Anda memiliki:
- **Node.js**: versi 20.x LTS atau lebih baru
- **PostgreSQL**: versi 14+ (disarankan versi 16)
- **Git**
- **Docker & Docker Compose** (opsional, jika menggunakan container)

### Environment Variables (`.env`)
Salin file `.env.example` menjadi `.env` di server:
```bash
cp .env.example .env
```

Sesuaikan isian variabel berikut:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="ganti-dengan-string-acak-rahasia-minimal-32-karakter"
IMGBB_API_KEY="fbe192c84a6e4a523741fb4297724951"
NEXT_PUBLIC_IMGBB_API_KEY="fbe192c84a6e4a523741fb4297724951"
NEXTAUTH_URL="https://duanarasi.com"
NODE_ENV="production"
PORT=3000
```

---

## 🐳 Opsi 1: Deploy Menggunakan Docker & Docker Compose (Paling Mudah)

Aplikasi telah dilengkapi konfigurasi multi-stage build `Dockerfile` dan `docker-compose.yml`.

### 1. Jalankan Container
```bash
# Build dan jalankan service aplikasi + database PostgreSQL di background
docker-compose up -d --build
```

### 2. Jalankan Migrasi Database & Seed Data Awal
```bash
# Push skema database Prisma
docker-compose exec web npx prisma db push

# (Opsional) Isi database dengan data artikel & akun redaksi awal
docker-compose exec web npm run seed
docker-compose exec web npm run seed:users
```

Aplikasi Anda kini aktif di port `3000`.

---

## 🖥️ Opsi 2: Deploy di VPS Linux (Ubuntu / Debian) dengan PM2 & Nginx

### 1. Clone Repositori & Install Dependencies
```bash
git clone https://github.com/cemoyz/duanarasi.com.git
cd duanarasi.com
npm ci
```

### 2. Setup Database PostgreSQL & Prisma
```bash
# Konfigurasi .env
nano .env

# Push schema ke database
npx prisma db push

# Isi data seed awal (opsional)
npm run seed
npm run seed:users
```

### 3. Build Aplikasi Production
```bash
npm run build
```

### 4. Jalankan Aplikasi dengan PM2
```bash
# Install PM2 secara global
npm install -g pm2

# Jalankan server
pm2 start npm --name "duanarasi" -- start

# Simpan proses agar otomatis berjalan saat reboot
pm2 save
pm2 startup
```

### 5. Konfigurasi Reverse Proxy Nginx & SSL (Certbot)
Contoh konfigurasi `/etc/nginx/sites-available/duanarasi.com`:
```nginx
server {
    server_name duanarasi.com www.duanarasi.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktifkan konfigurasi dan pasang SSL gratis:
```bash
sudo ln -s /etc/nginx/sites-available/duanarasi.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d duanarasi.com -d www.duanarasi.com
```

---

## ☁️ Opsi 3: Deploy di Vercel / Railway / Render / Coolify

1. **Hubungkan GitHub Repository**: [github.com/cemoyz/duanarasi.com](https://github.com/cemoyz/duanarasi.com)
2. **Set Environment Variables**:
   - `DATABASE_URL`: URL PostgreSQL Anda (Supabase / Neon / Railway PostgreSQL)
   - `JWT_SECRET`: String rahasia JWT
   - `IMGBB_API_KEY`: API key ImgBB
   - `NEXT_PUBLIC_IMGBB_API_KEY`: API key ImgBB
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next` (otomatis terdeteksi oleh Vercel)

---

## 🔑 Akun Default Administrator & Redaksi (Setelah Seeding)

Jika menjalankan `npm run seed:users`, akun berikut dapat langsung digunakan untuk login di `/login`:

| Peran | Email | Password Default |
|---|---|---|
| **Super Admin** | `admin@hoom.com` | `admin123` |
| **Editor** | `editor@hoom.com` | `editor123` |
| **Author** | `author@hoom.com` | `author123` |

> ⚠️ **PENTING**: Segera ganti password akun administrator di menu **Dashboard &rarr; Manajemen Pengguna** setelah proses deploy pertama selesai!

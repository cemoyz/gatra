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
IMGBB_API_KEY="6f594898aecb2c268834c7aaf299548f"
NEXT_PUBLIC_IMGBB_API_KEY="6f594898aecb2c268834c7aaf299548f"
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
docker-compose exec web npx prisma db push --skip-generate

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
npx prisma db push --skip-generate

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

## 🤖 Setup Auto-Deploy Otomatis (CI/CD via GitHub Actions)

Repositori ini telah dilengkapi dengan workflow GitHub Actions di `.github/workflows/deploy.yml`. Setiap kali Anda melakukan `git push origin main`, server akan otomatis melakukan pull kode terbaru, build container / aplikasi, migrasi database Prisma, dan restart service tanpa perlu login manual ke VPS.

### 1. Tambahkan Secrets di Repositori GitHub
Buka repositori GitHub Anda di browser:
👉 **Settings &rarr; Secrets and variables &rarr; Actions &rarr; New repository secret**

Tambahkan variabel-variabel berikut:

| Secret Name | Deskripsi | Contoh Nilai |
|---|---|---|
| `SERVER_HOST` | Alamat IP Publik VPS Anda | `103.187.147.20` atau domain server |
| `SERVER_USER` | Username login SSH | `root` atau `ubuntu` |
| `SERVER_SSH_KEY` | Private SSH Key server (`id_ed25519` / `id_rsa`) | *(Isi konten file `~/.ssh/id_rsa`)* |
| `SERVER_PASSWORD` | *(Opsional)* Password SSH jika tidak menggunakan SSH Key | `password-vps-anda` |
| `SERVER_PORT` | *(Opsional)* Port SSH server (default: 22) | `22` |
| `SERVER_APP_DIR` | Lokasi folder clone proyek di server | `/var/www/duanarasi.com` atau `/root/duanarasi.com` |

---

### 2. Cara Membuat & Memasang SSH Key (Jika Belum Ada)

Jalankan perintah ini di VPS Anda untuk membuat pasangan kunci SSH khusus deploy:
```bash
# 1. Generate SSH key baru di server
ssh-keygen -t ed25519 -C "deploy@duanarasi.com" -f ~/.ssh/github_deploy -N ""

# 2. Masukkan public key ke authorized_keys agar server mengizinkan login
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 3. Tampilkan private key untuk disalin ke GitHub Secret (SERVER_SSH_KEY)
cat ~/.ssh/github_deploy
```
> Salin seluruh isi output private key (termasuk baris `-----BEGIN OPENSSH PRIVATE KEY-----` sampai `-----END OPENSSH PRIVATE KEY-----`) dan tempel ke **`SERVER_SSH_KEY`** di GitHub Secrets.

---

### 3. Persiapan Pertama Kali di Server VPS

Pastikan repository sudah di-clone pertama kali di path `SERVER_APP_DIR`:
```bash
# Contoh direktori /var/www/duanarasi.com
sudo mkdir -p /var/www
cd /var/www
git clone https://github.com/cemoyz/duanarasi.com.git
cd duanarasi.com

# Salin dan isi environment variables .env
cp .env.example .env
nano .env

# Beri izin eksekusi pada script deploy
chmod +x deploy.sh
```

---

### 4. Menguji Auto-Deploy

Sekarang, cukup lakukan push perubahan dari komputer lokal Anda:
```bash
git add .
git commit -m "feat: setup auto deploy"
git push origin main
```

Buka tab **Actions** di GitHub repository Anda:
- Anda akan melihat workflow **Auto Deploy to Production Server** berjalan otomatis.
- Klik workflow tersebut untuk melihat live log proses pull, build, migrasi database, dan restart server.

---

## 🔑 Akun Default Administrator & Redaksi (Setelah Seeding)

Jika menjalankan `npm run seed:users`, akun berikut dapat langsung digunakan untuk login di `/login`:

| Peran | Email | Password Default |
|---|---|---|
| **Super Admin** | `admin@hoom.com` | `admin123` |
| **Editor** | `editor@hoom.com` | `editor123` |
| **Author** | `author@hoom.com` | `author123` |

> ⚠️ **PENTING**: Segera ganti password akun administrator di menu **Dashboard &rarr; Manajemen Pengguna** setelah proses deploy pertama selesai!

---

## 🛠️ Solusi Error Connection / Authentication Database ("FATAL: password authentication failed")

Jika muncul eror `Invalid prisma.user.findUnique() invocation: Authentication failed against database server at db` atau `FATAL: password authentication failed for user "postgres"` saat deployment:

### 1. Jika Menggunakan Docker Compose (Paling Sering)
PostgreSQL Docker menyerap `POSTGRES_PASSWORD` **hanya pada pembuatan volume data pertama kali**. Mengubah `.env` **TIDAK** otomatis mengubah password pada volume `pgdata` yang sudah ada.

**Opsi A (Reset Volume Database - jika belum ada data penting):**
```bash
docker-compose down -v
docker-compose up -d --build
docker-compose exec web npx prisma db push --skip-generate
docker-compose exec web npm run seed:users
```

**Opsi B (Ubah Password Postgres di dalam Container tanpa hapus data):**
```bash
docker-compose exec db psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'postgres';"
docker-compose restart web
```

### 2. Jika Menggunakan Native VPS (PM2)
Update password `postgres` langsung di PostgreSQL OS:
```bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'password_yang_ada_di_env';"
```


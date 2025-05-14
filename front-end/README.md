# Managerku – Project & Task Management Web App

**Managerku** adalah aplikasi web yang dirancang untuk membantu individu maupun tim dalam mengelola proyek dan tugas secara efisien. Dengan antarmuka yang modern dan intuitif, Managerku mempermudah perencanaan, pelacakan, dan pelaporan proyek dari awal hingga selesai.

- **Repository**: [GitHub – Managerku](https://github.com/pricelia1508/122140075_Tubes_Pemweb_Managerku)

---

## Fitur Utama

### Manajemen Proyek

- Tambah, edit, dan hapus proyek
- Penetapan tujuan dan deskripsi proyek
- Penjadwalan (tanggal mulai & selesai)
- Status proyek: belum mulai, dalam progres, tertunda, selesai

### Manajemen Tugas

- Penetapan batas waktu tugas
- Sub-tugas dan checklist
- Prioritas: tinggi, sedang, rendah
- Status tugas: to-do, in progress, done

### Fitur Pendukung

- Autentikasi pengguna (daftar & login)
- Manajemen anggota proyek
- Dashboard dan laporan proyek
- Integrasi kalender dan notifikasi

---

## Tech Stack

### Frontend

- Vite
- React.js
- React Router DOM
- Shadcn/UI – komponen UI modern
- Lucide React – ikon berbasis React
- PropTypes – validasi properti komponen
- Tailwind CSS – styling utility-first
- Day.js – manipulasi waktu ringan

### Backend

- Python Pyramid – framework web
- RESTful API

### Database

- PostgreSQL

### Testing & Tools

- Pytest – pengujian backend
- Git & GitHub
- Visual Studio Code

---

## Skema Database (ERD)

### Tabel: `users`

| Field    | Type    |
| -------- | ------- |
| id       | integer |
| username | string  |
| email    | string  |
| password | string  |
| role     | string  |

### Tabel: `projects`

| Field       | Type      |
| ----------- | --------- |
| id          | integer   |
| name        | string    |
| description | text      |
| start_date  | date      |
| end_date    | date      |
| status      | string    |
| created_at  | timestamp |
| finish_at   | timestamp |

### Tabel: `tasks`

| Field       | Type                       |
| ----------- | -------------------------- |
| id          | integer                    |
| project_id  | integer (FK ke `projects`) |
| name        | string                     |
| description | text                       |
| priority    | enum                       |
| status      | string                     |
| assigned_to | integer (FK ke `users`)    |

---

## Instalasi Lokal

### 1. Clone Repository

```bash
git clone https://github.com/pricelia1508/122140075_Tubes_Pemweb_Managerku.git
cd 122140075_Tubes_Pemweb_Managerku
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd backend
pip install -r requirements.txt
pyramid serve development.ini
```

---

## Developer

**Pricelia Putri SZ**
Email: [pricelia.122140075@student.itera.ac.id](mailto:pricelia.122140075@student.itera.ac.id)

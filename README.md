# Tubes\_Pemweb\_Managerku

UAS

# Managerku – Project & Task Management Web App

**Managerku** adalah aplikasi web yang dirancang untuk membantu individu maupun tim dalam mengelola proyek dan tugas secara efisien. Dengan antarmuka yang modern dan intuitif, Managerku mempermudah perencanaan, pelacakan, dan pelaporan proyek dari awal hingga selesai.

* **Repository**: [GitHub – Managerku](https://github.com/pricelia1508/122140075_Tubes_Pemweb_Managerku)

---

## Fitur Utama

### Manajemen Proyek

* Tambah, edit, dan hapus proyek
* Penetapan tujuan dan deskripsi proyek
* Penjadwalan (tanggal mulai & selesai)
* Status proyek: belum mulai, dalam progres, tertunda, selesai

### Manajemen Tugas

* Penetapan batas waktu tugas
* Sub-tugas dan checklist
* Prioritas: tinggi, sedang, rendah
* Status tugas: to-do, in progress, done

### Fitur Pendukung

* Autentikasi pengguna (daftar & login)
* Manajemen anggota proyek
* Dashboard dan laporan proyek
* Integrasi kalender dan notifikasi

---

## Tech Stack

### Frontend

* Vite
* React.js
* React Router DOM
* Shadcn/UI – komponen UI modern
* Lucide React – ikon berbasis React
* PropTypes – validasi properti komponen
* Tailwind CSS – styling utility-first
* Day.js – manipulasi waktu ringan

### Backend

* Python Pyramid – framework web
* RESTful API

### Database

* PostgreSQL

### Testing & Tools

* Pytest – pengujian backend
* Git & GitHub
* Visual Studio Code

---

## Skema Database (ERD)

### Tabel: `users`

| Field    | Type    |
| -------- | ------- |
| id       | integer |
| username | string  |
| email    | string  |
| password | string  |

### Tabel: `projects`

| Field       | Type      |
| ----------- | --------- |
| id          | integer   |
| name        | string    |
| description | text      |
| start\_date | date      |
| end\_date   | date      |
| status      | string    |
| created\_at | timestamp |
| updated\_at  | timestamp |
| user_id  | string (FK ke `users`) |


### Tabel: `tasks`

| Field        | Type                       |
| ------------ | -------------------------- |
| id           | integer                    |
| project\_id  | integer (FK ke `projects`) |
| name         | string                     |
| description  | text                       |
| status       | string                     |
| start\_date | date      |
| end\_date   | date      |
| created\_at | timestamp |
| updated\_at  | timestamp |

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
cd pyramid_projects
```

#### a. Buat environment virtual

```bash
python3 -m venv env
```

#### b. Upgrade tools

```bash
env/bin/pip install --upgrade pip setuptools
```

#### c. Install dependensi dan testing tools

```bash
env/bin/pip install -e ".[testing]"
```

#### d. Inisialisasi database dengan Alembic

```bash
env/bin/alembic -c development.ini revision --autogenerate -m "init"
env/bin/alembic -c development.ini upgrade head
```

#### e. Isi database dengan data awal

```bash
env/bin/initialize_pyramid_projects_db development.ini
```

#### f. Jalankan test backend

```bash
env/bin/pytest
```

#### g. Jalankan backend

```bash
env/bin/pserve development.ini
```

---

## Dokumentasi Visual (Screenshot)

Semua tangkapan layar (SS) aplikasi disimpan dalam direktori:

```
front-end/public/screenshot/
```

Berikut beberapa contoh fungsi yang telah diintegrasikan dengan backend:

* `create-project.png` – membuat proyek
* `create-task.png` – menambahkan tugas
* `edit-project.png` – mengubah data proyek
* `edit-tugas.png` – mengubah data tugas
* `delete-project.png` – menghapus proyek
* `project-detail.png` – melihat detail proyek
* `logout.png` – logout pengguna
* `profile.png` – profil pengguna
* `manage-projects.png` – dashboard manajemen proyek
* `login.png` – halaman login
* `register.png` – halaman register


Semua fitur ini mendemonstrasikan hasil integrasi React frontend ↔ Pyramid backend.

---

## Developer

**Pricelia Putri SZ**
Email: [pricelia.122140075@student.itera.ac.id](mailto:pricelia.122140075@student.itera.ac.id)

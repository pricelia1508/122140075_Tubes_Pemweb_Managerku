# Pyramid Projects – Backend

## Repositori ini adalah implementasi backend untuk aplikasi manajemen proyek berbasis **Pyramid Framework**. Sistem ini mendukung autentikasi pengguna, pengelolaan proyek, dan tugas dengan struktur RESTful API yang modular.

## Struktur Proyek

```
.
├── models/             # Model database (SQLAlchemy ORM)
├── views/              # API endpoint (view_config-based)
├── scripts/            # Inisialisasi dan utilitas skrip
├── templates/          # Template Jinja2 (404 dan default)
├── tests.py            # Unit test backend
├── context.py          # Ekstraksi source code ke Markdown
├── cors.py             # Middleware untuk CORS
├── pshell.py           # Bootstrap untuk interactive shell
├── routes.py           # Routing API
├── security.py         # Group finder untuk autentikasi ACL
├── __init__.py         # Entry point aplikasi Pyramid
└── development.ini     # Konfigurasi Pyramid (tidak ditampilkan)
```

---

## Penjelasan Per File Utama

### `__init__.py`

- Entry point untuk konfigurasi Pyramid.
- Mengatur authentication policy (AuthTkt), JSON renderer, tween (CORS), dan modul modular seperti `models`, `routes`, `views`.

### `routes.py`

- Mendaftarkan semua route API:

  - `/api/v1/projects` (CRUD proyek)
  - `/api/v1/tasks` (CRUD tugas)
  - `/api/v1/login`, `/register`, `/logout`

### `cors.py`

- Menyediakan middleware (`tween`) untuk mengaktifkan CORS terhadap client seperti React/Vite.
- Menangani preflight `OPTIONS` request.

### `security.py`

- Fungsi `groupfinder()` yang mengaitkan user dengan grup sederhana untuk ACL, meskipun tidak digunakan aktif saat ini.

### `pshell.py`

- Menyiapkan variabel penting (`request.tm`, `dbsession`, `models`) saat membuka shell interaktif via `pshell`.

---

## Modul Models (`/models`)

### `meta.py`

- Deklarasi `Base` dan `MetaData` dengan naming convention agar kompatibel dengan Alembic.

### `user.py`

- Model `User` menyimpan informasi pengguna.
- Mendukung `set_password()` dan `check_password()` menggunakan `bcrypt`.

### `project.py`

- Model `Project` mewakili proyek yang dibuat oleh user.
- Memiliki hubungan many-to-one ke `User`.

### `task.py`

- Model `Task` mewakili tugas dalam proyek.
- Memiliki relasi many-to-one ke `Project`.

### `__init__.py`

- Setup `get_engine`, `get_session_factory`, `get_tm_session` dan method `includeme()` untuk integrasi dengan Pyramid.

---

## Modul Views (`/views`)

### `auth.py`

- Endpoint register, login, dan logout.
- Menggunakan AuthTkt token dan validasi menggunakan `passlib`.

### `project.py`

- Endpoint untuk CRUD proyek.
- Validasi kepemilikan proyek dengan `get_user_project_or_404()`.

### `task.py`

- Endpoint untuk CRUD tugas.
- Mendukung validasi tanggal dan pengecekan keberadaan task.

### `default.py`

- View untuk route `'/'` dengan template (default Pyramid view).

### `notfound.py`

- View 404 untuk error page menggunakan template `404.jinja2`.

---

## Script Utilitas (`/scripts`)

### `initialize_db.py`

- Menyediakan data dummy untuk user, project, dan task.
- Gunakan perintah:

  ```
  python -m scripts.initialize_db development.ini
  ```

---

## Testing

### `tests.py`

- Menggunakan `unittest` untuk menguji:

  - Model (User, Project, Task)
  - View (`project`, `task`, `auth`)

- Mendukung test validasi:

  - Login gagal, email duplikat, tanggal salah, dan akses tidak sah.

- Jalankan:

  ```bash
  python tests.py
  ```

---

## Database & Konfigurasi

- Menggunakan SQLite in-memory saat testing.
- Dalam produksi bisa menggunakan PostgreSQL/MySQL (ubah di `development.ini`).
- Autentikasi menggunakan cookie berbasis `AuthTktAuthenticationPolicy`.

---

## Jalankan Aplikasi

1. **Masuk ke direktori proyek**:

   ```bash
   cd pyramid_projects
   ```

2. **Buat virtual environment**:

   ```bash
   python3 -m venv env
   ```

3. **Upgrade pip dan setuptools**:

   ```bash
   env/bin/pip install --upgrade pip setuptools
   ```

4. **Install dependencies proyek dalam mode editable + testing**:

   ```bash
   env/bin/pip install -e ".[testing]"
   ```

5. **Inisialisasi dan upgrade database menggunakan Alembic**:

   - Generate revisi awal:

     ```bash
     env/bin/alembic -c development.ini revision --autogenerate -m "init"
     ```

   - Jalankan upgrade ke revisi tersebut:

     ```bash
     env/bin/alembic -c development.ini upgrade head
     ```

6. **Isi database dengan data default**:

   ```bash
   env/bin/initialize_pyramid_projects_db development.ini
   ```

7. **Jalankan test proyek**:

   ```bash
   env/bin/pytest
   ```

8. **Jalankan aplikasi**:

   ```bash
   env/bin/pserve development.ini
   ```

---

## Developer

**Pricelia Putri SZ**
Email: [pricelia.122140075@student.itera.ac.id](mailto:pricelia.122140075@student.itera.ac.id)

---

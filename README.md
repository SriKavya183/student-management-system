# Student Management System

A full-stack web application to manage student records.

**Stack:** React + Vite (Frontend) | Django + DRF (Backend) | SQLite (Database)

---

## Folder Structure

```
project/
├── backend/
│   ├── student_management/     # Django project (settings, urls, wsgi)
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── students/               # Django app (models, serializers, views, urls)
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StudentList.jsx
│   │   │   ├── StudentDetail.jsx
│   │   │   ├── AddStudent.jsx
│   │   │   └── EditStudent.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios API calls
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── students.db                 # Existing SQLite database
└── README.md
```

---

## Setup & Installation

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher

---

### Backend Setup

Open a terminal in the `project/` directory:

```bash
# 1. Go to the backend folder
cd backend

# 2. Create a virtual environment
python -m venv venv

# 3. Activate the virtual environment
#    Windows:
venv\Scripts\activate
#    Mac / Linux:
source venv/bin/activate

# 4. Install Python dependencies
pip install -r requirements.txt

# 5. Run database migrations (creates Django admin tables in students.db)
python manage.py migrate

# 6. (Optional) Create a Django admin superuser
python manage.py createsuperuser

# 7. Start the Django development server
python manage.py runserver
```

Backend runs at: **http://localhost:8000**

---

### Frontend Setup

Open a **new** terminal in the `project/` directory:

```bash
# 1. Go to the frontend folder
cd frontend

# 2. Install Node.js dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## API Endpoints

| Method   | Endpoint                        | Description             |
|----------|---------------------------------|-------------------------|
| GET      | /api/students/                  | Get all students        |
| POST     | /api/students/                  | Add a new student       |
| GET      | /api/students/{id}/             | Get student by ID       |
| PUT      | /api/students/{id}/             | Update student          |
| DELETE   | /api/students/{id}/             | Delete student          |
| GET      | /api/students/?search=query     | Search students         |
| GET      | /api/students/stats/            | Dashboard statistics    |

---

## Student Fields

| Field        | Type    | Constraints        |
|--------------|---------|--------------------|
| student_id   | Text    | Required, unique   |
| name         | Text    | Required           |
| age          | Integer | 15 – 35            |
| gender       | Text    | Male / Female / Other |
| department   | Text    | CSE, ECE, IT, EEE, MECH, CIVIL |
| semester     | Integer | 1 – 8              |
| gpa          | Float   | 0.0 – 10.0         |

---

## Features

- Dashboard with stats (total students, departments, average GPA, gender count)
- View all students in a responsive, searchable table
- Search by name, student ID, department, or gender
- View individual student detail page
- Add new student with form validation
- Edit existing student details
- Delete student with confirmation
- Color-coded GPA and gender badges
- Loading states and error handling
- Responsive layout (mobile-friendly)

---

## Notes

- The Django backend uses `managed = False` on the `Student` model so it connects to the existing `students` table without modifying it.
- The SQLite database (`students.db`) is shared between the migration tables (Django admin) and the `students` table.
- No authentication is required — all API endpoints are open.
- Django Admin is available at http://localhost:8000/admin/ (requires superuser).

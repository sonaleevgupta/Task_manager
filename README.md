🗂️ Task Manager:
A modern Task Manager web application built with React (Frontend) and FastAPI (Backend) featuring authentication, protected dashboard, and task management with a clean and responsive UI.
This project was developed as part of a Frontend Developer Intern assignment, with focus on frontend UX while integrating a minimal backend.

🚀 Tech Stack
Frontend:
React.js + TypeScript
Vite
Tailwind CSS
shadcn/ui
React Router
React Hook Form + Zod
TanStack React Query
Axios
Backend
Python – FastAPI
SQLAlchemy
MySQL (via XAMPP)
JWT Authentication
bcrypt password hashing

✨ Features
🔐 Authentication
User Signup & Login
Password hashing (bcrypt)
JWT-based authentication
Protected routes (Dashboard, Tasks, Profile)
📊 Dashboard
Auth-protected dashboard
Task summary (Total / Completed / Pending)
Responsive layout with sidebar & header

✅ Task Management (CRUD)
Create, Read, Update, Delete tasks
Task status (Todo / In Progress / Done)
Priority (Low / Medium / High)
Search & filter tasks
Pagination-ready structure

👤 Profile
Logged-in user profile view
Prepared for future profile update integration
 UX & Quality
Loading states
Error & success messages
Clean, modular project structure
Scalable codebase

 Project Structure
Task_manager/
├── backend/        # FastAPI backend
│   ├── app/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/       # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── vite.config.ts
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/sonaleevgupta/Task_manager.git
cd Task_manager

2️⃣ Backend Setup (FastAPI)
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Database
Start XAMPP
Enable MySQL
Create database:
CREATE DATABASE task_manager;

Run Backend
uvicorn app.main:app --reload


Backend runs at:

http://127.0.0.1:8000


Swagger docs:

http://127.0.0.1:8000/docs

3️⃣ Frontend Setup (React)
cd frontend
npm install
npm run dev


Frontend runs at:
http://localhost:8080

🔑 Environment Variables
Backend (.env)
DATABASE_URL=mysql+pymysql://root:@localhost/task_manager
SECRET_KEY=your_secret_key
ALGORITHM=HS256

Frontend (.env)
VITE_API_BASE_URL=http://127.0.0.1:8000

🧪 Demo Credentials (Optional)

You can create accounts using the Signup page, or use:

Email: pihu@example.com
Password: password123

📬 API Documentation

Swagger UI available at /docs
REST APIs versioned under /api/v1/*

🔐 Security Highlights
Password hashing (bcrypt)
JWT validation on protected routes
Input validation (frontend + backend)
CORS properly configured

📈 How I Would Scale This for Production
Use Docker for containerization
Move secrets to environment variables / vault
Enable refresh tokens for JWT
Add rate limiting & request logging
Use PostgreSQL with proper indexing
Introduce Redis caching
Deploy frontend via Vercel / Netlify
Deploy backend via AWS / Render
Enable CI/CD pipelines

👩‍💻 Author

Sonali Gupta
Frontend Developer | Full-Stack Enthusiast

✅ Assignment Checklist

✔ Auth (Signup/Login)
✔ Protected Dashboard
✔ CRUD UI
✔ Backend APIs
✔ Validation & Error Handling
✔ Clean UI & UX
✔ Scalable Structure

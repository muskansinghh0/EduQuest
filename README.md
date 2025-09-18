# EduQuest 🚀

EduQuest is a **gamified rural learning platform** designed to deliver engaging education in low-resource settings.  
It combines **offline-first access**, **teacher support tools**, and **gamification** to maximize learning outcomes for students.

---

## ✨ Overview

- 🎮 **Gamification** – Points, badges, leaderboards, and streaks.
- 📚 **Interactive Content** – Lessons with text, audio, video, and quizzes.
- 🌍 **Multilingual** – English, Hindi, and local languages.
- 📊 **Progress Tracking** – Real-time reports for students and teachers.
- 📡 **Offline-first** – Works even with poor or zero internet.
- 👩‍🏫 **Teacher Dashboard** – Upload lessons, assign tasks, and monitor progress.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Redux Toolkit
- **Styling**: TailwindCSS + Framer Motion animations
- **Data Visualization**: D3.js + Recharts
- **Forms**: React Hook Form
- **Backend (planned)**: Node.js, Express.js, MongoDB, JWT auth
- **Communication**: Twilio / SMS API

---

## 📋 Features (Frontend)

- Modern **React 18** app with concurrent rendering.
- **Vite** for lightning-fast dev builds.
- **Reusable Components** for clean architecture.
- **Responsive UI** with Tailwind breakpoints.
- **Animations** for smoother learning experience.
- **Testing** with Jest & React Testing Library.

---

## 📂 Project Structure

eduquest/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components
│ ├── styles/ # Global styles + Tailwind config
│ ├── App.jsx # Main app component
│ ├── Routes.jsx # Routing
│ └── index.jsx # Entry point
├── .env # Environment variables
├── index.html # HTML template
├── package.json # Dependencies & scripts
├── tailwind.config.js # Tailwind config
└── vite.config.js # Vite config

# LinkHub

A simple and modern link-in-bio web application built with the MERN stack.

Users can add links, edit them, reorder with drag-and-drop, update their bio, upload an avatar, and share a public profile using a unique username.

## Features
- User authentication (JWT)
- Add / edit / delete links
- Drag & drop link ordering (dnd-kit)
- Update profile bio and avatar
- Public profile page (`/username`)
- Clean UI with TailwindCSS and multiple theme options

## Tech Stack
**Frontend:** React, Vite, TailwindCSS, Zustand, Formik/Yup, dnd-kit  
**Backend:** Node.js, Express, MongoDB, Multer, JWT

## Setup
```bash
git clone https://github.com/gokhanbay05/link-share.git

Backend:
cd backend
npm install
npm start

Create a .env file in backend:
PORT=5000
MONGO_URI=your_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_ORIGIN=http://localhost:5173

Frontend:
cd frontend
npm install
npm run dev

Create a .env file in frontend:
VITE_API_URL=http://localhost:5000/api
VITE_API_BASE_URL=http://localhost:5000






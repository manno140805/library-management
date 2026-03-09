# SyllabusHub

A full-stack web application for managing syllabi and educational resources with admin and user roles.

## Tech Stack
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB

## Features
- Admin: Dashboard, syllabus management, member management, issue/return resources, reports
- User: Search syllabi, borrow/return, view history

## Setup
1. Install dependencies for backend: `cd backend && npm install`
2. Install dependencies for frontend: `cd frontend && npm install`
3. Start MongoDB
4. Start backend: `cd backend && npm run dev`
5. Start frontend: `cd frontend && npm start`

## Environment Variables
Create .env in backend with MONGO_URI, JWT_SECRET, PORT
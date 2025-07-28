# Palmonas CRM - Admin Portal

## Overview
This project is an **Admin CRM Portal** built for managing customer orders from multiple e-commerce platforms.  
It includes both **frontend** and **backend** applications, fully Dockerized for easy deployment.

---

## Prerequisites
- Node.js >= 18
- MongoDB (local or cloud e.g. Mongo Atlas) OR Docker
- Docker & Docker Compose (for containerized deployment)

---

## Running Locally (Without Docker)

### Backend
1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/palmonas
   JWT_SECRET=supersecret123
   ```
4. Start the backend:
   ```bash
   node index.js
   ```
   Runs on [http://localhost:5001](http://localhost:5001)

---

### Frontend
1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5001/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```
   Runs on [http://localhost:5173](http://localhost:5173)

---

## Running with Docker

1. Ensure Docker is installed.
2. From project root:
   ```bash
   docker-compose up --build
   ```
3. Access:
   - Backend: [http://localhost:5001](http://localhost:5001)
   - Frontend: [http://localhost:5173](http://localhost:5173)

---

## Deployment on Render

### Backend
1. Create a **Web Service** on Render.
2. Use the backend Dockerfile.
3. Add environment variables from backend `.env`.

### Frontend
1. Create a **Static Site** or **Web Service**.
2. Build with Vite:
   ```bash
   npm install && npm run build
   ```
3. Set publish directory: `dist`
4. Set environment variable in frontend `.env`:
   ```env
   VITE_API_BASE_URL=https://<render-backend-url>/api
   ```

---

## Default URLs
- Login Page: `/`
- Dashboard: `/dashboard`
- Orders Page: `/orders`

---

## Notes
- Ensure MongoDB connection is whitelisted for Render deployment.
- JWT secret should be kept secure in environment variables.
- For production, replace `localhost` with your Render backend URL.



LOCAL:
backend:
PORT=5001 npm start
http://localhost:5001/api/auth/register

frontend:
npm run dev
http://localhost:5173/login

cron:
npm run ingest  

PROD:
mongo:
roopalagrawal1998
ErNyjZLk8ZBeklBh

backend:
https://palmonas-crm-backend.onrender.com/api/auth/register
frontend:
https://palmonas-crm-frontend.onrender.com/login



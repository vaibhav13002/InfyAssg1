# Shoe Brand Sales Dashboard (MERN Stack)

A full-featured analytics dashboard for visualizing and analyzing sales, ad spend, and engagement metrics for a shoe brand. Built with the MERN stack (MongoDB, Express, React, Node.js) and designed for modern, cloud-based deployment.

---

## Features
- **Interactive summary tiles** with pie chart icons and expandable product contribution charts
- **Sales trend line chart** with selectable metrics and shoe models
- **Sortable, filterable data table** with grand totals
- **Advanced metrics panel** (Net Profit, ROAS, Conversion Rate, etc.)
- **Responsive, modern UI** (React + Vite)
- **Backend REST API** (Express + MongoDB)
- **Cloud-ready deployment** (Render.com, Vercel, MongoDB Atlas)

---

## Project Structure
```
Shoe-Sales-Dashboard/
├── backend/           # Express API, MongoDB models, seed scripts
├── frontend/          # React + Vite app
└── README.md
```

---

## Backend Setup (Express + MongoDB)

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (free tier is fine)

### 2. Environment Variables
Create a `.env` file in the `backend/` folder:
```
MONGO_URI=your-mongodb-atlas-connection-string
```
**Note:** `.env` is in `.gitignore` and should NOT be committed to GitHub.

### 3. Install Dependencies
```powershell
cd backend
npm install
```

### 4. Seed the Database (Optional)
To generate sample data for 2024-01-01 to 2025-05-25:
```powershell
node seed.js
```

### 5. Run the Backend Locally
```powershell
node server.js
```
The API will run on `http://localhost:5000` (or the port set by `PORT`).

### 6. API Endpoints
- `GET /api/sales/summary` — Overall metrics for a date range
- `GET /api/sales/summary-by-shoe` — Per-shoe metrics for a date range
- `GET /api/sales/daily` — Daily metrics for a shoe and date range
- `GET /api/sales/shoes` — List of shoe models

---

## Frontend Setup (React + Vite)

### 1. Prerequisites
- Node.js (v18+ recommended)

### 2. Environment Variables
Create a `.env` file in the `frontend/` folder:
```
VITE_API_URL=http://localhost:5000
```
Set this to your backend URL in production (e.g., `https://your-backend.onrender.com`).

### 3. Install Dependencies
```powershell
cd frontend
npm install
```

### 4. Run the Frontend Locally
```powershell
npm run dev
```
The app will run on `http://localhost:5173` by default.

---

## Deployment (Free Cloud Hosting)

### 1. MongoDB Atlas
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Add a database user and get your connection string
- Use this string as `MONGO_URI` in your backend environment variables

### 2. Backend (Render.com)
- Push your code to GitHub
- Create a new Web Service on [Render.com](https://render.com)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`
- Set environment variable: `MONGO_URI`
- Choose the free plan and deploy

### 3. Frontend (Vercel or Netlify)
- Import your repo to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Set environment variable: `VITE_API_URL` to your Render backend URL
- Deploy

---

## Security
- **Never commit `.env` files or secrets to GitHub.**
- Always use environment variables for credentials and API URLs.
- If you accidentally pushed secrets, rotate them in your cloud provider.

---

## Usage
- Open the deployed frontend in your browser
- Select a date range within the seeded data (e.g., 2024-06-01 to 2025-05-20)
- Explore summary tiles, charts, and analytics

---

## Customization & Extending
- Add new metrics or visualizations in `frontend/src/components/`
- Add new API endpoints in `backend/routes/` and `backend/controllers/`
- Update seed data logic in `backend/seed.js`

---

## License
This project is for educational/demo purposes. For production use, review and update security, error handling, and deployment settings.

---

## Credits
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Chart.js](https://www.chartjs.org/)
- Free hosting via [Render.com](https://render.com), [Vercel](https://vercel.com), [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

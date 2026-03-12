# 💰 Smart Expense Tracker

A full-stack expense tracking web application built with the MERN stack. Users can register, log in, and manage their income and expenses with real-time charts and a clean dashboard.

## 🖥️ Live Demo
> Coming soon



## 📸 Screenshots



## ✨ Features

- User authentication with JWT and bcrypt password hashing
- Add and delete income transactions with emoji,category,source,and date
- Add and delete expense transactions with emoji, category, and date
- Dashboard with total balance, income, and expense summary cards
- Financial overview pie chart (income vs expenses)
- Income bar chart showing daily breakdown
- Expense bar chart showing daily spending
- Expense category breakdown
- Protected routes — unauthenticated users redirected to login
- Responsive sidebar layout with profile section

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Recharts
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication**
- JSON Web Tokens (JWT)
- bcryptjs

---

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Auth, transaction, analytics logic
│   ├── middleware/      # JWT auth middleware
│   ├── models/         # User and Transaction schemas
│   ├── routes/         # Express API routes
│   └── server.js       # Entry point
│
└── frontend/
    └── src/
        ├── components/ # Reusable UI components
        ├── context/    # Auth context
        ├── pages/      # Login, Signup, Dashboard, Income, Expenses
        └── services/   # Axios API service
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/YOURUSERNAME/expense-tracker.git
cd expense-tracker
```

**2. Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

**3. Setup Frontend**

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

**4. Open the app**

Visit `http://localhost:5173` in your browser.

---

## 🌐 API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Transactions
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions/add` | Add new transaction |
| GET | `/api/transactions/income` | Get income transactions |
| GET | `/api/transactions/expense` | Get expense transactions |
| DELETE | `/api/transactions/:id` | Delete a transaction |

### Analytics
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/analytics/summary` | Get financial summary |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

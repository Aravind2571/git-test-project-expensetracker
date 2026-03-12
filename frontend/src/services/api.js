import axios from "axios";

// Base URL for all API calls
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor — automatically attaches JWT token to every request
// This runs before every request is sent
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth API calls
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Transaction API calls
export const addTransaction = (data) => API.post("/transactions/add", data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
export const getAllTransactions = () => API.get("/transactions");
export const getIncomeTransactions = () => API.get("/transactions/income");
export const getExpenseTransactions = () => API.get("/transactions/expense");

// Analytics API call
export const getAnalyticsSummary = () => API.get("/analytics/summary");

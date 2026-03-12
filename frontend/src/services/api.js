import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const addTransaction = (data) => API.post("/transactions/add", data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
export const getAllTransactions = () => API.get("/transactions");
export const getIncomeTransactions = () => API.get("/transactions/income");
export const getExpenseTransactions = () => API.get("/transactions/expense");

export const getAnalyticsSummary = () => API.get("/analytics/summary");

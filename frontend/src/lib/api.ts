import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  timeout: 30_000,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(err);
  }
);

export default api;

// Auth
export const login = (email: string, password: string) =>
  api.post("/api/auth/login", { email, password }).then((r) => r.data);

export const register = (name: string, email: string, password: string) =>
  api.post("/api/auth/register", { name, email, password }).then((r) => r.data);

// Resumes
export const uploadResume = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return api.post("/api/resumes/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);
};

export const listResumes = () =>
  api.get("/api/resumes").then((r) => r.data);

// Optimization
export const optimizeResume = (resumeId: string, jobDescription: string) =>
  api.post(`/api/resumes/${resumeId}/optimize`, { jobDescription }).then((r) => r.data);

export const getJobStatus = (jobId: string) =>
  api.get(`/api/resumes/jobs/${jobId}`).then((r) => r.data);

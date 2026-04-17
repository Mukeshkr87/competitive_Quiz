const envApiUrl =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL;

export const apiUrl = envApiUrl || "http://localhost:3000";

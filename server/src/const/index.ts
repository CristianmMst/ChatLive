enum URLS_CLIENT {
  DEV = "http://localhost:5173",
  PROD = "https://chatlive-mmst.vercel.app",
}

enum URLS_SERVER {
  DEV = "http://localhost:3000/api",
  PROD = "https://chatlive-xat8.onrender.com/api",
}

export const API_URL = URLS_SERVER.PROD;
export const CLIENT_URL = URLS_CLIENT.PROD;

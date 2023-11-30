enum URLS_CLIENT {
  DEV = "http://localhost:5173",
  PROD = "https://chatlive-mmst.vercel.app",
}

enum URLS_SERVER {
  DEV = "http://localhost:3000/api",
  PROD = "https://chat-live-iyck.onrender.com/api",
  SOCKET_DEV = "ws://localhost:3000",
  SOCKET_PROD = "https://chat-live-iyck.onrender.com",
}

export const API_URL = URLS_SERVER.DEV;
export const CLIENT_URL = URLS_CLIENT.DEV;
export const SOCKET_URL = URLS_SERVER.SOCKET_DEV;

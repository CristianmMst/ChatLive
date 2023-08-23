import { PrivateRoute } from "./PrivateRoutes";
import { Routes, Route } from "react-router-dom";
import { Auth, Chat, Login, Register } from "@/pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

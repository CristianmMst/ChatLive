import { PrivateRoute } from "./PrivateRoutes";
import { Chat, Login, Register } from "@/pages";
import { Routes, Route } from "react-router-dom";

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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

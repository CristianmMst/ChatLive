import { PrivateRoute } from "./PrivateRoutes";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "@/modules/auth/components";
import { ChatContainer } from "@/modules/chat/components/ChatContainer";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ChatContainer />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

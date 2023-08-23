import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { BarLoader } from "react-spinners";
import { Navigate } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

export function PrivateRoute({ children }: Props) {
  const { token, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="grid place-content-center h-[100vh]">
        <BarLoader color="#ffffff" />
      </div>
    );

  return token ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;

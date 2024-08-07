import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { BarLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/user";

type Props = {
  children?: ReactNode;
};

export function PrivateRoute({ children }: Props) {
  const { isLoading } = useAuth();
  const { id } = useUserStore((state) => state);

  if (isLoading)
    return (
      <div className="grid place-content-center h-[100vh]">
        <BarLoader color="#ffffff" />
      </div>
    );

  return id ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;

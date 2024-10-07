import { BarLoader } from "react-spinners";
import { useAuth } from "@/modules/auth/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/modules/shared/store/user";

export function PrivateRoute() {
  const { isLoading } = useAuth();
  const { id } = useUserStore((state) => state);

  if (isLoading)
    return (
      <div className="grid place-content-center h-[100vh]">
        <BarLoader color="#ffffff" />
      </div>
    );

  return id ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;

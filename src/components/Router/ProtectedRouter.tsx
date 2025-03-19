import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter = () => {
  const isSessionAlive = true;

  return isSessionAlive ? <Outlet /> : <Navigate to="/auth/login" />;
};

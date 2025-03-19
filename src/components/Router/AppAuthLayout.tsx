import { Navigate, Outlet } from "react-router-dom";

export const AppAuthLayout = () => {
  const isSessionAlive = true;

  return !isSessionAlive ? <Outlet /> : <Navigate to="/dashboard" />;
};

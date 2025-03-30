import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { backendApi } from "../utils/backendApi";

export const AppAuthLayout = () => {
  const [isSessionAlive, setIsSessionAlive] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const load = async () => {
        const response = await backendApi.checkToken(token);

        if (response.ok) {
          setIsSessionAlive(true);
        } else {
          setIsSessionAlive(false);
        }
      };
      load();
    } else {
      setIsSessionAlive(false);
    }
  }, []);

  if (isSessionAlive === null) {
    // loading
    return;
  }

  return !isSessionAlive ? <Outlet /> : <Navigate to="/" />;
};

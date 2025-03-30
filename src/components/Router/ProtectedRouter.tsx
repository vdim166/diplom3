import { Navigate, Outlet } from "react-router-dom";
import { backendApi } from "../utils/backendApi";
import { useEffect, useState } from "react";

export const ProtectedRouter = () => {
  const [isSessionAlive, setIsSessionAlive] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const load = async () => {
        const response = await backendApi.checkToken(token);

        if (response.ok) {
          const data: {
            is_valid: boolean;
            user: {
              email: string | null;
              full_name: string | null;
              username: string;
            };
          } = await response.json();

          if (data.is_valid) {
            setIsSessionAlive(true);
          } else {
            setIsSessionAlive(false);
          }
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

  if (!isSessionAlive) {
    return <Navigate to="/auth/login" />;
  }

  return isSessionAlive ? <Outlet /> : <Navigate to="/auth/login" />;
};

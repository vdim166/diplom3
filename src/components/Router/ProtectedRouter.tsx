import { Navigate, Outlet } from "react-router-dom";
import { backendApi } from "../utils/backendApi";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Contexts/useGlobalContext";

export const ProtectedRouter = () => {
  const [isSessionAlive, setIsSessionAlive] = useState<boolean | null>(null);

  const { setCurrentUser } = useGlobalContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const load = async () => {
        const response = await backendApi.checkToken(token);

        if (response.ok) {
          type DataType = {
            is_valid: boolean;
            user: {
              username: string;
              is_manager: boolean;
            };
          };

          const data: DataType = await response.json();

          if (data.is_valid) {
            setIsSessionAlive(true);

            setCurrentUser({
              username: data.user.username,
              isManager: data.user.is_manager,
            });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import cls from "./styles.module.scss";

export const MainTemplate = () => {
  return (
    <div className={cls.main}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

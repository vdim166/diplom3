import { Link, useNavigate } from "react-router-dom";
import cls from "./styles.module.scss";
import { useGlobalContext } from "../Contexts/useGlobalContext";

export const Sidebar = () => {
  const n = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    n("/auth/login");
  };

  const { name } = useGlobalContext();
  return (
    <div className={cls.main}>
      <Link
        to={"/"}
        className={cls.option}
        style={{
          marginTop: "10px",
        }}
      >
        Главная
      </Link>
      <Link to={"/storage"} className={cls.option}>
        Склад
      </Link>
      <Link to={"/forecast"} className={cls.option}>
        Прогноз
      </Link>
      <Link to={"/taskmanager"} className={cls.option}>
        Менеджер задач
      </Link>
      <Link to={"/stats"} className={cls.option}>
        Статистика
      </Link>

      <div className={cls.userSection}>
        <div className={cls.userName}>{name}</div>
        <div className={cls.option} onClick={handleLogout}>
          Выйти
        </div>
      </div>
    </div>
  );
};

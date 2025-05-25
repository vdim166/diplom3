import { Link, useNavigate } from "react-router-dom";
import cls from "./styles.module.scss";
import { useGlobalContext } from "../Contexts/useGlobalContext";
import logo from "../shared/images/istorage.png";

export const Sidebar = () => {
  const n = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    n("/auth/login");
  };

  const { currentUser } = useGlobalContext();

  const { name } = useGlobalContext();
  return (
    <div className={cls.main}>
      <div className={cls.logoWrapper}>
        <img src={logo} />
        <p>IStorage</p>
      </div>
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
      <Link to={"/storage/products"} className={cls.option}>
        Все продукты
      </Link>

      {currentUser?.isManager && (
        <Link to={"/for/manager"} className={cls.option}>
          Для менеджера
        </Link>
      )}

      <div className={cls.userSection}>
        <div className={cls.userName}>{name}</div>
        <div className={cls.option} onClick={handleLogout}>
          Выйти
        </div>
      </div>
    </div>
  );
};

import { Link } from "react-router-dom";
import cls from "./styles.module.scss";

export const Sidebar = () => {
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
    </div>
  );
};

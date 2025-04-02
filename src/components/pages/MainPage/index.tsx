import { useGlobalContext } from "../../Contexts/useGlobalContext";
import NumberAnimation from "../../NumberAnimation";
import cls from "./styles.module.scss";

export const MainPage = () => {
  const now = new Date();

  const weekday = now.toLocaleString("ru-RU", { weekday: "long" });
  const month = now.toLocaleString("ru-RU", { month: "long" });
  const day = now.toLocaleString("ru-RU", { day: "numeric" });

  const { name, tasks, allUsers } = useGlobalContext();

  return (
    <div className={cls.main}>
      <p className={cls.dayOfWeek}>
        {weekday[0].toUpperCase() + weekday.slice(1)}, {day} {month}
      </p>
      <p className={cls.welcome}>Добрый день, {name}</p>
      <div className={cls.line}>
        <p className={cls.done}>Закоченных задач:</p>
        {tasks === null ? (
          <p>Loading</p>
        ) : (
          <NumberAnimation
            finalNumber={tasks.filter((t) => t.status === "done").length}
            duration={2.5}
            id="makscmdskocmkosdmckods"
          />
        )}
      </div>
      <div className={cls.line}>
        <p className={cls.done}>Количество участников:</p>
        {allUsers === null ? (
          <p>Loading</p>
        ) : (
          <NumberAnimation
            finalNumber={allUsers.length}
            duration={2.5}
            id="cdkscmskcmksdcjn"
          />
        )}
      </div>
    </div>
  );
};

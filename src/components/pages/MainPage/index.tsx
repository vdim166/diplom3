import { useGlobalContext } from "../../Contexts/useGlobalContext";
import NumberAnimation from "../../NumberAnimation";
import cls from "./styles.module.scss";

export const MainPage = () => {
  const now = new Date();

  const weekday = now.toLocaleString("ru-RU", { weekday: "long" });
  const month = now.toLocaleString("ru-RU", { month: "long" });
  const day = now.toLocaleString("ru-RU", { day: "numeric" });

  const { name } = useGlobalContext();

  return (
    <div className={cls.main}>
      <p className={cls.dayOfWeek}>
        {weekday[0].toUpperCase() + weekday.slice(1)}, {day} {month}
      </p>
      <p className={cls.welcome}>Добрый день, {name}</p>
      <div className={cls.line}>
        <p className={cls.done}>Закоченных задач:</p>
        <NumberAnimation
          finalNumber={3}
          duration={2.5}
          id="makscmdskocmkosdmckods"
        />
      </div>
      <div className={cls.line}>
        <p className={cls.done}>Количество участников:</p>
        <NumberAnimation
          finalNumber={2}
          duration={2.5}
          id={"cdkscmskcmksdcjn"}
        />
      </div>
    </div>
  );
};

import cls from "./styles.module.scss";

export const MainPage = () => {
  const now = new Date();

  const weekday = now.toLocaleString("ru-RU", { weekday: "long" });
  const month = now.toLocaleString("ru-RU", { month: "long" });
  const day = now.toLocaleString("ru-RU", { day: "numeric" });

  const userName = "Vadim";

  return (
    <div className={cls.main}>
      <p className={cls.dayOfWeek}>
        {weekday[0].toUpperCase() + weekday.slice(1)}, {day} {month}
      </p>
      <p className={cls.welcome}>Добрый день, {userName}</p>
      <p className={cls.done}>Закоченных задач: 0</p>
      <p className={cls.done}>Количество участников: 0</p>
    </div>
  );
};

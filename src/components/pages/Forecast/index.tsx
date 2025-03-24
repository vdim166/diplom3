import cls from "./styles.module.scss";

export const Forecast = () => {
  return (
    <div className={cls.main}>
      <div className={cls.window}>
        <p>NAME</p>
      </div>
      <div className={cls.buttons}>
        <button className={cls.generate}>Создать прогноз</button>
      </div>
    </div>
  );
};

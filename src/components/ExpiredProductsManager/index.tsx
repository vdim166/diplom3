import { ActiveButton } from "../ActiveButton";
import cls from "./styles.module.scss";

export const ExpiredProductsManager = () => {
  return (
    <div className={cls.main}>
      <p className={cls.title}>Товары которые скоро просрочаться</p>
      <div className={cls.block}>
        <div className={`${cls.option} ${cls.option_red}`}>
          <p>Oranges</p> <p>до 12.12.2025</p>{" "}
          <p className={cls.days}>10 дней</p>
        </div>

        <div className={`${cls.option} ${cls.option_light}`}>
          <p className={cls.name}>Oranges</p> <p>до 12.12.2025</p>{" "}
          <p className={cls.days}>10 дней</p>
        </div>

        <div className={`${cls.option} ${cls.option_red}`}>
          <p>Oranges</p> <p>до 12.12.2025</p>{" "}
          <p className={cls.days}>10 дней</p>
        </div>

        <div className={`${cls.option} ${cls.option_light}`}>
          <p className={cls.name}>Oranges</p> <p>до 12.12.2025</p>{" "}
          <p className={cls.days}>10 дней</p>
        </div>
        <div className={`${cls.option} ${cls.option_red}`}>
          <p>Oranges</p> <p>до 12.12.2025</p>{" "}
          <p className={cls.days}>10 дней</p>
        </div>

        <div className={`${cls.option} ${cls.option_light}`}>
          <p className={cls.name}>Oranges</p> <p>до 12.12.2025</p>{" "}
          <p className={cls.days}>10 дней</p>
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <ActiveButton
          style={{
            maxWidth: "180px",
          }}
        >
          Создать задачу
        </ActiveButton>
      </div>
    </div>
  );
};

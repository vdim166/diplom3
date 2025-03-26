import { Card } from "../../Card";
import cls from "./styles.module.scss";

export const TaskManager = () => {
  return (
    <div className={cls.main}>
      <div className={cls.title}>
        <h1>Kanban manager</h1>
      </div>
      <div className={cls.kanban}>
        <span className={cls.line}>
          <div className={cls.lineName}>TODO</div>
          <div className={cls.options}>
            <Card
              style={{
                marginTop: "20px",
              }}
            />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </span>
        <span className={cls.line}>
          <div className={cls.lineName}>В прогрессе</div>
          <div className={cls.options}>
            <Card
              style={{
                marginTop: "20px",
              }}
            />
            <Card />
            <Card />
          </div>
        </span>
        <span className={cls.line}>
          <div className={cls.lineName}>Сделано</div>
          <div className={cls.options}>
            <Card
              style={{
                marginTop: "20px",
              }}
            />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card
              style={{
                marginBottom: "22px",
              }}
            />
          </div>
        </span>
      </div>
    </div>
  );
};

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
          <div className={cls.lineName}>Hello</div>
          <div className={cls.options}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </span>
        <span className={cls.line}>
          <div className={cls.lineName}>Hello</div>
          <div className={cls.options}>
            <Card />
            <Card />
            <Card />
          </div>
        </span>
        <span className={cls.line}>
          <div className={cls.lineName}>Hello</div>
          <div className={cls.options}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </span>
      </div>
    </div>
  );
};

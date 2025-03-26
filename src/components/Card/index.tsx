import { CSSProperties } from "react";
import cls from "./styles.module.scss";

interface CardProps {
  style?: CSSProperties;
  taskText: string;
  worker: string;
}

export const Card = ({ style, taskText, worker }: CardProps) => {
  return (
    <div className={cls.card} style={style}>
      <div className={cls.taskBlock}>
        <p className={cls.taskP}>
          Задача: {taskText.substring(0, 110)}
          {taskText.length > 110 && "..."}
        </p>
      </div>
      <div>
        <p className={cls.worker}>Исполнитель: {worker}</p>
      </div>
    </div>
  );
};

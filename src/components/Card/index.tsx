import { CSSProperties } from "react";
import cls from "./styles.module.scss";

export const Card = ({ style }: { style?: CSSProperties }) => {
  const taskText = `Купить моркови Купить моркови Купить моркови Купить моркови
          Купить моркови Купить моркови Купить моркови Купить моркови Купить
          моркови`;

  return (
    <div className={cls.card} style={style}>
      <div className={cls.taskBlock}>
        <p className={cls.taskP}>
          Задача: {taskText.substring(0, 110)}
          {taskText.length > 110 && "..."}
        </p>
      </div>

      <div>
        <p className={cls.worker}>Исполнитель: Vasya</p>
      </div>
    </div>
  );
};

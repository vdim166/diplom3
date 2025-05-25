import { CSSProperties } from "react";
import cls from "./styles.module.scss";

interface CardProps {
  style?: CSSProperties;
  taskText: string;
  worker: string;
}

export const Card = ({ style, taskText, worker }: CardProps) => {
  const isForSell = taskText.startsWith("Срочно продать");

  if (isForSell) {
    return (
      <div className={cls.card} style={style}>
        <div className={cls.taskBlock}>
          <p className={cls.taskP}>Задача: Срочно продать </p>

          {taskText
            .replace("Срочно продать", "")
            .substring(0, 110)
            .split(", ")
            .filter((_, index) => index < 5)
            .map((p) => {
              return (
                <div>
                  <p
                    style={{
                      fontSize: "15px",
                      paddingLeft: "15px",
                    }}
                  >
                    - {p}
                  </p>
                </div>
              );
            })}
          {/* {taskText.length > 110 && "..."} */}
        </div>
        <div>
          <p className={cls.worker}>Исполнитель: {worker}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cls.card} style={style}>
      <div className={cls.taskBlock}>
        <p className={cls.taskP}>
          Задача: {taskText.replace("storage_", "стеллаж ").substring(0, 110)}
          {taskText.length > 110 && "..."}
        </p>
      </div>
      <div>
        <p className={cls.worker}>Исполнитель: {worker}</p>
      </div>
    </div>
  );
};

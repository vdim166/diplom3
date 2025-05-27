import { CSSProperties } from "react";
import cls from "./styles.module.scss";
import { useGlobalContext } from "../Contexts/useGlobalContext";

interface CardProps {
  style?: CSSProperties;
  taskText: string;
  worker: string;

  deleteHandle: () => void;
}

const TrashSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      style={{ height: "17px" }}
    >
      <path
        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
        fill="red"
      ></path>
    </svg>
  );
};
export const Card = ({ style, taskText, worker, deleteHandle }: CardProps) => {
  const isForSell = taskText.startsWith("Срочно продать");
  const { currentUser } = useGlobalContext();

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

        {currentUser?.isManager && (
          <div className={cls.deleteBlock} onClick={deleteHandle}>
            <TrashSvg />
          </div>
        )}
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

      {currentUser?.isManager && (
        <div className={cls.deleteBlock} onClick={deleteHandle}>
          <TrashSvg />
        </div>
      )}
    </div>
  );
};

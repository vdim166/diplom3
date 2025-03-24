import { CSSProperties, useState } from "react";
import cls from "../styles.module.scss";
import s from "./styles.module.scss";

const Cross = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      viewBox="0 0 25 25"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      width={10}
      height={10}
      className={s.cross}
      onClick={onClick}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>cross</title> <desc>Created with Sketch Beta.</desc>{" "}
        <defs> </defs>{" "}
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Icon-Set-Filled"
            transform="translate(-469.000000, -1041.000000)"
            fill="#000000"
          >
            <path
              d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
              id="cross"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
const storeStorage = [
  { name: "Яблоки", count: 42 },
  { name: "Бананы", count: 36 },
  { name: "Упаковки молока", count: 15 },
  { name: "Яйца", count: 72 },
  { name: "Буханки хлеба", count: 20 },
  { name: "Куриные грудки", count: 25 },
  { name: "Мешки картофеля", count: 18 },
  { name: "Апельсиновый сок", count: 12 },
  { name: "Коробки хлопьев", count: 30 },
  { name: "Йогурты", count: 45 },
  { name: "Сырные головки", count: 22 },
  { name: "Помидоры", count: 38 },
  { name: "Лук", count: 50 },
  { name: "Пачки кофе", count: 28 },
  { name: "Коробки пасты", count: 40 },
  { name: "Мешки риса", count: 15 },
  { name: "Консервированная фасоль", count: 60 },
  { name: "Замороженная пицца", count: 16 },
  { name: "Мороженое", count: 24 },
  { name: "Пачки чипсов", count: 35 },
];

type BlockType = {
  style: CSSProperties;
  onHover?: () => void;
  onLeave?: () => void;
};

export const Block = ({ style, onHover, onLeave }: BlockType) => {
  const [isClicked, setIsClicked] = useState(false);

  const closeModal = () => {
    setIsClicked(false);
  };
  return (
    <div className={`${s.main}`}>
      <div
        className={`${cls.block}`}
        style={style}
        onClick={() => {
          setIsClicked((prev) => !prev);
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      ></div>
      {isClicked && (
        <div className={s.modal}>
          <Cross onClick={closeModal} />
          <p className={s.text}>На этом складе есть</p>

          <div className={s.options}>
            {storeStorage.map((item) => {
              return (
                <div className={s.option} key={item.name}>
                  <p style={{ whiteSpace: "nowrap", padding: 0, margin: 0 }}>
                    {item.name} {item.count}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

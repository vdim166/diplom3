import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import cls from "../styles.module.scss";
import s from "./styles.module.scss";
import { Cross } from "../../../icons/Cross";

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
  setOpenedStorage: () => void;
  onClose: () => void;
};

function isElementFitsViewport(element: HTMLDivElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const isOutOfViewportTop = rect.top < 0;
  const isOutOfViewportBottom = rect.bottom > viewportHeight;
  const isOutOfViewportLeft = rect.left < 0;
  const isOutOfViewportRight = rect.right > viewportWidth;

  return {
    fitsVertically: !isOutOfViewportTop && !isOutOfViewportBottom,
    fitsHorizontally: !isOutOfViewportLeft && !isOutOfViewportRight,
    isOutOfViewportTop,
    isOutOfViewportBottom,
    isOutOfViewportLeft,
    isOutOfViewportRight,
  };
}

export const Block = ({
  style,
  onHover,
  onLeave,
  setOpenedStorage,
  onClose,
}: BlockType) => {
  const [isClicked, setIsClicked] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isClicked) {
      const result = isElementFitsViewport(ref.current!);

      if (result.fitsVertically === false) {
        if (result.isOutOfViewportTop) {
          if (ref.current) {
            ref.current.style.top = "120%";
          }
        } else if (result.isOutOfViewportBottom) {
          if (ref.current) {
            ref.current.style.top = "0%";
          }
        }
      }
    }
  }, [isClicked]);

  const closeModal = () => {
    setIsClicked(false);
    onClose();
  };
  return (
    <div className={`${s.main}`}>
      <div
        className={`${cls.block}`}
        style={style}
        onClick={() => {
          setIsClicked((prev) => !prev);
          setOpenedStorage();
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      ></div>
      {isClicked && (
        <div className={s.modal} ref={ref}>
          <Cross onClick={closeModal} className={s.cross} />
          <p className={s.text}>На этом складе есть</p>

          <div className={s.options}>
            {storeStorage.map((item) => {
              return (
                <div className={s.option} key={item.name}>
                  <p style={{ whiteSpace: "nowrap", padding: 0, margin: 0 }}>
                    {item.name}
                  </p>
                  <p style={{ margin: 0 }}>{item.count}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

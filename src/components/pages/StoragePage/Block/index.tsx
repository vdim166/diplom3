import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import cls from "../styles.module.scss";
import s from "./styles.module.scss";
import { Cross } from "../../../icons/Cross";

type BlockType = {
  style: CSSProperties;
  onHover?: () => void;
  onLeave?: () => void;
  setOpenedStorage: () => void;
  onClose: () => void;
  storage: {
    name: string;
    count: number;
  }[];
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
  storage,
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
        className={`${cls.item}`}
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
            {storage.map((item) => {
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

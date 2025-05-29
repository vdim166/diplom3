import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import cls from "../styles.module.scss";
import s from "./styles.module.scss";
import { Cross } from "../../../icons/Cross";
import { productObject } from "../../../utils/fetchProductDataApi";

const imageUrls: { [key: string]: string } = {
  "Romaine Lettuce":
    "https://avatars.mds.yandex.net/get-altay/5235220/2a0000017b63088027e3f7615420a29a1648/XXL_height",

  Strawberries:
    "https://www.lebensbaum.com/media/20/1b/99/1715066869/Erdbeere_2.png",
  "Red Leaf Lettuce":
    "https://t4.ftcdn.net/jpg/00/39/76/27/360_F_39762757_Vj5vh1ngEAX5uX0AP2vTNyzlgOQ5Lgog.jpg",
  Potatoes:
    "https://cdn.optipic.io/site-105164/images/detailed/76/1706119735_binomen-ru-p-rannii-kartofel-pinterest-6.jpg",
  Oranges:
    "https://main-cdn.sbermegamarket.ru/big1/hlr-system/574/499/273/451/214/100031007610b0.jpg",
  "Iceberg Lettuce":
    "https://avatars.mds.yandex.net/i?id=c7081c587bd632b79c6ef19e7fcb176a_l-3739799-images-thumbs&n=13",
  "Green Leaf Lettuce":
    "https://main-cdn.sbermegamarket.ru/big2/hlr-system/393/075/269/413/126/100051348014b0.jpg",
  Celery:
    "https://ogorod-shop.ru/upload/iblock/290/37x7k3bx32zokrm526ns81iydcrui6jq.jpg",
  Cauliflower:
    "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-21/373/534/964/261/410/100050923912b0.png",
  Carrots:
    "https://i.pinimg.com/originals/72/d9/3c/72d93c09ab3ac6884f2982dcd2424b0e.png",
  Cantaloupe:
    "https://i.pinimg.com/originals/5d/cd/13/5dcd13c6e3645a73427ab1ca25a14342.jpg",
  "Broccoli Crowns":
    "https://thumbs.dreamstime.com/b/têtes-de-broccoli-18139065.jpg",
  Avocados:
    "https://i.pinimg.com/originals/f3/1b/1a/f31b1af984bb9b2713365571f83ce21d.jpg",
  "Broccoli Bunches":
    "https://main-cdn.sbermegamarket.ru/big1/hlr-system/989/004/380/104/133/9/100029280376b0.jpg",
  Asparagus:
    "https://avatars.mds.yandex.net/get-mpic/5243609/img_id2044758129972258145.jpeg/orig",
  "Flame Grapes":
    "https://agro-market24.ru/upload/medialibrary/ea9/ea96c158af697449b3bf45721d6f10f7.jpg",
  "Thompson Grapes": "",
  Honeydews:
    "https://i.pinimg.com/originals/12/6b/0d/126b0da5e3afefc31fb945dc8fae2080.jpg",
  Tomatoes:
    "https://avatars.mds.yandex.net/get-eda/12773219/8a8f981120250e285da8c22588c86fb8/orig",
  Plums:
    "https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/ce/dd/d02826acd725889a6c18b6e54b77.jpg",
  Peaches:
    "https://avatars.mds.yandex.net/i?id=3079104ac75e14a95f79592f84983790dc61c3f4-5307457-images-thumbs&n=13",
  Nectarines:
    "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-20/219/449/998/311/67/100059673219b0.jpg",
};

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
          <p className={s.text}>На этом стеллаже есть </p>

          <div className={s.options}>
            {storage.map((item) => {
              return (
                <div className={s.option} key={item.name}>
                  <img className={s.productImage} src={imageUrls[item.name]} />
                  <p style={{ whiteSpace: "nowrap", padding: 0, margin: 0 }}>
                    {productObject[item.name]}
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

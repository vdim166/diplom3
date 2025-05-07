import { useEffect, useRef, useState } from "react";
import cls from "./styles.module.scss";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { MODALS } from "../../ModalComponent/types";
import { backendApi } from "../../utils/backendApi";
import { productIndexesRu } from "../../consts/productIndexesRu";

const RUB = 80;

export const Forecast = () => {
  const [text, setText] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

  const { setCurrentOpenModal, setModalData } = useGlobalContext();

  const myText = "Запрашивание предсказаний...";

  const pause = (ms: number = 0) => new Promise((res) => setTimeout(res, ms));
  const checkIfScrolledToBottom = () => {
    if (!containerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    return scrollTop + clientHeight >= scrollHeight - 10; // +10px допуск
  };

  useEffect(() => {
    if (!isUserScrolledUp && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleScroll = () => {
    if (!checkIfScrolledToBottom()) {
      setIsUserScrolledUp(true); // Пользователь ушёл вверх
    } else {
      setIsUserScrolledUp(false); // Пользователь внизу
    }
  };
  const generateResponse = async () => {
    const currentIndex = text.length;

    if (currentIndex > 0) {
      setText((prev) => [...prev, "____________________________"]);
    }

    setIsDisabled(true);

    setText((prev) => [...prev, ""]);
    for (let i = 0; i < myText.length; ++i) {
      await pause(10);
      const elem = myText[i];
      setText((prev) => {
        const newState = [...prev];

        newState[newState.length - 1] =
          (prev[newState.length - 1] || "") + elem;

        return newState;
      });
    }
    setText((prev) => [...prev, "____________________________"]);

    const { data, result } = await backendApi.forecast();

    await pause(500);

    let max = 0;

    const best = [];
    const worst = [];

    for (let i = 0; i < data.length; ++i) {
      const item = data[i];

      const myText2 = `${productIndexesRu[item.product_code]} на ферме=${(
        item.farmprice * RUB
      ).toFixed(2)}₽, предсказано ${(result[i].price * RUB).toFixed(2)}₽`;

      const value = result[i].price - item.farmprice;

      if (value > 0) {
        best.push({ index: i, value });
      } else if (value < 0) {
        worst.push({ index: i, value });
      }

      if (value > max) {
        max = value;
      }

      setText((prev) => [...prev, ""]);
      for (let j = 0; j < myText2.length; ++j) {
        await pause(10);
        const elem = myText2[j];
        setText((prev) => {
          const newState = [...prev];

          newState[newState.length - 1] =
            (prev[newState.length - 1] || "") + elem;

          return newState;
        });
      }
    }

    setText((prev) => [...prev, "____________________________"]);

    if (best.length > 0) {
      for (let i = 0; i < best.length; ++i) {
        const str = `Предсказание на ${
          productIndexesRu[best[i].index]
        } больше на ${(Number(best[i].value.toFixed(2)) * RUB).toFixed(2)}₽`;

        setText((prev) => [...prev, ""]);
        for (let j = 0; j < str.length; ++j) {
          await pause(10);
          const elem = str[j];
          setText((prev) => {
            const newState = [...prev];

            newState[newState.length - 1] =
              (prev[newState.length - 1] || "") + elem;

            return newState;
          });
        }
      }

      pause(500);
    } else {
      const str = `Выгоды не выявлено`;
      setText((prev) => [...prev, ""]);
      for (let j = 0; j < str.length; ++j) {
        await pause(10);
        const elem = str[j];
        setText((prev) => {
          const newState = [...prev];

          newState[newState.length - 1] =
            (prev[newState.length - 1] || "") + elem;

          return newState;
        });
      }
    }

    if (worst.length > 0) {
      for (let i = 0; i < best.length; ++i) {
        const str = `Предсказание на ${
          productIndexesRu[worst[i].index]
        } меньше на ${(Number(worst[i].value.toFixed(2)) * RUB).toFixed(2)}₽`;

        setText((prev) => [...prev, ""]);
        for (let j = 0; j < str.length; ++j) {
          await pause(10);
          const elem = str[j];
          setText((prev) => {
            const newState = [...prev];

            newState[newState.length - 1] =
              (prev[newState.length - 1] || "") + elem;

            return newState;
          });
        }
      }
    }

    setText((prev) => [...prev, "____________________________"]);

    const newStr = `Хотите создать задачу по предоставленной статистике?`;
    setText((prev) => [...prev, ""]);
    for (let j = 0; j < newStr.length; ++j) {
      await pause(10);
      const elem = newStr[j];
      setText((prev) => {
        const newState = [...prev];

        newState[newState.length - 1] =
          (prev[newState.length - 1] || "") + elem;

        return newState;
      });
    }

    setModalData({ best, worst });
    pause(500);
    setCurrentOpenModal(MODALS.ADD_TASK);

    setIsDisabled(false);
  };

  return (
    <div className={cls.main}>
      <div className={cls.window} ref={containerRef} onScroll={handleScroll}>
        {text.map((t) => {
          return (
            <p
              style={{
                lineHeight: "1.5",
              }}
            >
              {t}
            </p>
          );
        })}
      </div>
      <div className={cls.buttons}>
        <button
          className={cls.generate}
          onClick={generateResponse}
          disabled={isDisabled}
        >
          Создать прогноз
        </button>
      </div>
    </div>
  );
};

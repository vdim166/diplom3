import { useState } from "react";
import cls from "./styles.module.scss";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { MODALS } from "../../ModalComponent/types";
import { backendApi } from "../../utils/backendApi";

const productIndexesRu = [
  "Клубника",
  "Салат Романо",
  "Краснолистный салат",
  "Картофель",
  "Апельсины",
  "Салат Айсберг",
  "Зеленолистный салат",
  "Сельдерей",
  "Цветная капуста",
  "Морковь",
  "Дыня Канталупа",
  "Соцветия брокколи",
  "Авокадо",
  "Пучки брокколи",
  "Спаржа",
  "Виноград Флейм",
  "Виноград Томпсон",
  "Дыня Медовая",
  "Помидоры",
  "Сливы",
  "Персики",
  "Нектарины",
];

const RUB = 80;

export const Forecast = () => {
  const [text, setText] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { setCurrentOpenModal, setModalData } = useGlobalContext();

  const myText = "Запрашивание предсказаний...";

  const pause = (ms: number = 0) => new Promise((res) => setTimeout(res, ms));

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
    let product = -1;

    for (let i = 0; i < data.length; ++i) {
      const item = data[i];

      const myText2 = `${productIndexesRu[item.product_code]} на ферме=${(
        item.farmprice * RUB
      ).toFixed(2)}₽, предсказано ${(result[i].price * RUB).toFixed(2)}₽`;

      const value = result[i].price - item.farmprice;

      if (value > max) {
        max = value;
        product = i;
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

    if (product != -1) {
      const str = `Предсказание на ${productIndexesRu[product]} больше на ${(
        Number(max.toFixed(2)) * RUB
      ).toFixed(2)}₽`;

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

      setText((prev) => [...prev, "____________________________"]);

      const newStr = `Хотите создать задачу на покупку ${productIndexesRu[product]}?`;
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

      setModalData(productIndexesRu[product]);
      pause(500);
      setCurrentOpenModal(MODALS.ADD_TASK);
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

    setIsDisabled(false);
  };

  return (
    <div className={cls.main}>
      <div className={cls.window}>
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

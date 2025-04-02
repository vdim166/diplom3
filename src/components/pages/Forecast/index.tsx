import { useState } from "react";
import cls from "./styles.module.scss";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { MODALS } from "../../ModalComponent/types";
// import { backendApi } from "../../utils/backendApi";

export const Forecast = () => {
  const [text, setText] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { setCurrentOpenModal } = useGlobalContext();

  const myText =
    "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello";

  const myText2 =
    " Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello";

  const pause = (ms: number = 0) => new Promise((res) => setTimeout(res, ms));

  const generateResponse = async () => {
    setCurrentOpenModal(MODALS.ADD_TASK);

    setIsDisabled(true);
    for (let i = 0; i < myText.length; ++i) {
      await pause(10);
      const elem = myText[i];
      setText((prev) => prev + elem);
    }
    await pause(500);
    for (let i = 0; i < myText2.length; ++i) {
      await pause(10);
      const elem = myText2[i];
      setText((prev) => prev + elem);
    }
    setIsDisabled(false);
  };

  return (
    <div className={cls.main}>
      <div className={cls.window}>
        <p
          style={{
            lineHeight: "1.5",
          }}
        >
          {text}
        </p>
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

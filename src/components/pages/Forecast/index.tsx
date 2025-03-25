import { useState } from "react";
import cls from "./styles.module.scss";

export const Forecast = () => {
  const [text, setText] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const myText =
    "Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello";

  const myText2 =
    " Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello";

  const pause = (ms: number = 0) => new Promise((res) => setTimeout(res, ms));

  const generateResponse = async () => {
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

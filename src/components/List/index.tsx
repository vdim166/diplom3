import { useRef, useState } from "react";

import cls from "./styles.module.scss";
import { KeyValueType } from "../ConstructorForTask/types/TypeForModal";

type ListProps = {
  pickedOption: KeyValueType | null;
  setIsPickedOption: (value: KeyValueType | null) => void;
  allOptions: KeyValueType[];
};

export const List = ({
  pickedOption,
  setIsPickedOption,
  allOptions,
}: ListProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handle = (option: KeyValueType) => {
    return () => {
      setIsClicked(false);
      setIsPickedOption(option);
    };
  };
  const randId = useRef(Math.random().toString());

  return (
    <div className={cls.wrapper}>
      <div className={cls.list} onClick={() => setIsClicked((prev) => !prev)}>
        <p className={cls.mainTitle}>{pickedOption?.value}</p>
      </div>
      {isClicked && (
        <div className={cls.modal}>
          {allOptions &&
            allOptions.map((option) => (
              <div
                className={cls.option}
                onClick={handle(option)}
                key={option.key + randId.current}
              >
                <p>{option.value}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

import { useRef, useState } from "react";

import cls from "./styles.module.scss";

type ListProps = {
  pickedUser: string | null;
  setIsPickedUser: React.Dispatch<React.SetStateAction<string | null>>;
  allOptions: string[];
};

export const List = ({
  pickedUser,
  setIsPickedUser,
  allOptions,
}: ListProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handle = (option: string) => {
    return () => {
      setIsClicked(false);
      setIsPickedUser(option);
    };
  };
  const randId = useRef(Math.random().toString());

  return (
    <div className={cls.wrapper}>
      <div className={cls.list} onClick={() => setIsClicked((prev) => !prev)}>
        <p className={cls.mainTitle}>{pickedUser}</p>
      </div>
      {isClicked && (
        <div className={cls.modal}>
          {allOptions &&
            allOptions.map((user) => (
              <div
                className={cls.option}
                onClick={handle(user)}
                key={user + randId.current}
              >
                <p>{user}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

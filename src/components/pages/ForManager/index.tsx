import { useEffect, useState } from "react";
import cls from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { List } from "../../List";
// import { Input } from "../../Input";
import { ConstructorForTask } from "../../ConstructorForTask";
import { ActiveButton } from "../../ActiveButton";

export const ForManagerPage = () => {
  const nav = useNavigate();
  const { currentUser, allUsers } = useGlobalContext();
  const [pickedUser, setIsPickedUser] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser?.isManager) {
      nav("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!allUsers) return;

  return (
    <div className={cls.main}>
      <div className={cls.wrapper}>
        <ConstructorForTask />

        <div className={cls.column}>
          <p>Выберите пользователя</p>
          <List
            pickedUser={pickedUser}
            setIsPickedUser={setIsPickedUser}
            allOptions={allUsers}
          />
        </div>
        <div>
          <ActiveButton>Создать карточку</ActiveButton>
        </div>
      </div>
    </div>
  );
};

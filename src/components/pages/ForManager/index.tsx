import { useEffect, useState } from "react";
import cls from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { List } from "../../List";
// import { Input } from "../../Input";
import { ConstructorForTask } from "../../ConstructorForTask";
import { ActiveButton } from "../../ActiveButton";
import { backendApi } from "../../utils/backendApi";

export type AnswerType = {
  what: string | null;
  action: string | null;
  query?: string;
};

export const ForManagerPage = () => {
  const nav = useNavigate();
  const { currentUser, allUsers, setTasks } = useGlobalContext();
  const [pickedUser, setIsPickedUser] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser?.isManager) {
      nav("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [answer, setAnswer] = useState<AnswerType>({
    what: null,
    action: null,
  });

  if (!allUsers) return;

  const handleClick = async () => {
    if (pickedUser)
      if (answer) {
        const data = await backendApi.createTask({
          title: `Необходимо ${answer.action} ${answer.what}`,
          description: "",
          query: answer.query,
          assigned_to: pickedUser,
        });

        setTasks((prev) => {
          if (!prev) return null;

          return [
            ...prev,
            {
              id: data.id,
              status: data.status,
              text: data.title,
              worker: data.assigned_to,
            },
          ];
        });

        setAnswer({ what: null, action: null });
        setIsPickedUser(null);
        nav("/taskmanager");
      }
  };

  return (
    <div className={cls.main}>
      <div className={cls.wrapper}>
        <ConstructorForTask
          answer={answer}
          setAnswer={(answer) => setAnswer(answer)}
        />

        <div className={cls.column}>
          <p>Выберите пользователя</p>
          <List
            pickedUser={pickedUser}
            setIsPickedUser={setIsPickedUser}
            allOptions={allUsers}
          />
        </div>
        <div>
          <ActiveButton
            disabled={answer.what === null && answer.action === null}
            onClick={handleClick}
          >
            Создать карточку
          </ActiveButton>
        </div>
      </div>
    </div>
  );
};

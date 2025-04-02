import { useState } from "react";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { MODALS } from "../../ModalComponent/types";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";

const List = ({
  pickedUser,
  setIsPickedUser,
}: {
  pickedUser: string | null;
  setIsPickedUser: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { allUsers } = useGlobalContext();

  const [isClicked, setIsClicked] = useState(false);

  const handleUser = (user: string) => {
    return () => {
      setIsClicked(false);
      setIsPickedUser(user);
    };
  };

  return (
    <div className={cls.wrapper}>
      <div className={cls.list} onClick={() => setIsClicked((prev) => !prev)}>
        <p className={cls.mainTitle}>{pickedUser}</p>
      </div>
      {isClicked && (
        <div className={cls.modal}>
          {allUsers &&
            allUsers.map((user) => (
              <div className={cls.option} onClick={handleUser(user)} key={user}>
                <p>{user}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export const AddTaskModal = () => {
  const { setCurrentOpenModal } = useGlobalContext();

  const [pickedUser, setIsPickedUser] = useState<string | null>(null);
  const { setTasks } = useGlobalContext();
  const [showUsers, setShowUsers] = useState<boolean>(false);

  const closeModal = () => {
    setCurrentOpenModal(MODALS.NOTHING);
  };

  const handleYes = async () => {
    if (pickedUser === null) {
      return setShowUsers(true);
    }

    if (pickedUser !== null) {
      const data = await backendApi.createTask({
        title: "test1",
        description: "test2",
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
      closeModal();
    }
  };

  return (
    <div className={cls.main}>
      <p>Нужно добавить задачу в менеджер задач?</p>
      {showUsers && (
        <div className={cls.wrapperList}>
          <List pickedUser={pickedUser} setIsPickedUser={setIsPickedUser} />
        </div>
      )}
      <div className={cls.buttons}>
        <button onClick={handleYes}>Да</button>{" "}
        <button onClick={closeModal}>Нет</button>
      </div>
    </div>
  );
};

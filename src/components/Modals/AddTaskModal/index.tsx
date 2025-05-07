import { useState } from "react";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { MODALS } from "../../ModalComponent/types";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";
import { List } from "../../List";

export const AddTaskModal = () => {
  const { setCurrentOpenModal, modalData, setModalData } = useGlobalContext();

  const [pickedUser, setIsPickedUser] = useState<string | null>(null);
  const { setTasks, allUsers } = useGlobalContext();
  const [showUsers, setShowUsers] = useState<boolean>(false);

  const closeModal = () => {
    setCurrentOpenModal(MODALS.NOTHING);
    setModalData(null);
  };

  const handleYes = async () => {
    if (pickedUser === null) {
      return setShowUsers(true);
    }

    if (pickedUser !== null) {
      const data = await backendApi.createTask({
        title: `Необходимо закупить ${modalData}`,
        description: "",
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

  if (!allUsers) return;

  return (
    <div className={cls.main}>
      <p>Нужно добавить задачу в менеджер задач для покупки {modalData}?</p>
      {showUsers && (
        <div className={cls.wrapperList}>
          <p>Выберите пользователя</p>
          <List
            pickedUser={pickedUser}
            setIsPickedUser={setIsPickedUser}
            allOptions={allUsers}
          />
        </div>
      )}
      <div className={cls.buttons}>
        <button onClick={handleYes}>{pickedUser ? "Подтвердить" : "Да"}</button>
        <button onClick={closeModal}>Нет</button>
      </div>
    </div>
  );
};

import { useState } from "react";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { MODALS } from "../../ModalComponent/types";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";
import { List } from "../../List";
import { productIndexesRu } from "../../consts/productIndexesRu";
import { getRandomColor } from "../../utils/getRandomColor";
import { KeyValueType } from "../../ConstructorForTask/types/TypeForModal";

export const AddTaskModal = () => {
  const { setCurrentOpenModal, modalData, setModalData } = useGlobalContext();

  const [pickedUser, setIsPickedUser] = useState<KeyValueType | null>(null);
  const { setTasks, allUsers } = useGlobalContext();
  const [showUsers, setShowUsers] = useState<boolean>(false);

  const closeModal = () => {
    setCurrentOpenModal(MODALS.NOTHING);
    setModalData(null);
  };

  const { best, worst } = modalData;

  const handleYes = async () => {
    if (pickedUser === null) {
      return setShowUsers(true);
    }

    if (pickedUser !== null) {
      for (let i = 0; i < best.length; ++i) {
        const data = await backendApi.createTask({
          title: `Необходимо купить ${productIndexesRu[best[i].index]}`,
          description: "",
          assigned_to: pickedUser.key,
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
      }

      for (let i = 0; i < worst.length; ++i) {
        const data = await backendApi.createTask({
          title: `Необходимо продать ${productIndexesRu[worst[i].index]}`,
          description: "",
          assigned_to: pickedUser.key,
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
      }

      closeModal();
    }
  };

  if (!allUsers) return;

  return (
    <div className={cls.main}>
      <p>
        Нужно добавить задачу в менеджер задач для{" "}
        <span
          style={{
            color: "green",
          }}
        >
          покупки
        </span>
        ?
      </p>
      <div>
        {best.map((b: { index: number }) => {
          return (
            <p
              style={{
                color: getRandomColor(),
              }}
            >
              {productIndexesRu[b.index]}
            </p>
          );
        })}
      </div>

      <p>
        и добавить задачу в менеджер задач для{" "}
        <span
          style={{
            color: "red",
          }}
        >
          продажи
        </span>
        ?
      </p>
      <div>
        {worst.map((w: { index: number }) => {
          return (
            <p
              style={{
                color: getRandomColor(),
              }}
            >
              {productIndexesRu[w.index]}
            </p>
          );
        })}
      </div>
      {showUsers && (
        <div className={cls.wrapperList}>
          <p>Выберите пользователя</p>
          <List
            pickedOption={pickedUser}
            setIsPickedOption={setIsPickedUser}
            allOptions={allUsers.map((user) => ({ key: user, value: user }))}
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

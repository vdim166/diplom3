import { useEffect, useState } from "react";
import { Modal } from "../../../Modal";
import { KeyValueType, TypeForModal } from "../../types/TypeForModal";
import cls from "../styles.module.scss";
import { backendApi } from "../../../utils/backendApi";
import { ActiveButton } from "../../../ActiveButton";
import { List } from "../../../List";
import style from "./styles.module.scss";
import { useGlobalContext } from "../../../Contexts/useGlobalContext";

export const DeleteUserModal = ({ closeModal }: TypeForModal) => {
  const [users, setUsers] = useState<string[]>([]);

  const { currentUser } = useGlobalContext();

  const [pickedUser, setPickedUser] = useState<KeyValueType | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const workers: string[] = (await backendApi.getWorkers()).users;

        const admins = (await backendApi.getManagers()).users.filter(
          (name: string) => name !== currentUser?.username
        );

        setUsers([...workers, ...admins]);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (!pickedUser) return;
    try {
      await backendApi.deleteUser(pickedUser.key);

      closeModal();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal>
      <div className={cls.modalMain}>
        <div className={cls.back}>
          <ActiveButton onClick={closeModal}>Назад</ActiveButton>
        </div>

        <div className={style.main}>
          <p className={style.text}>
            Выберите сотрудника, которого хотите удалить
          </p>
          <List
            allOptions={users.map((user) => {
              return {
                key: user,
                value: user,
              };
            })}
            pickedOption={pickedUser}
            setIsPickedOption={setPickedUser}
          />

          <ActiveButton disabled={!pickedUser} onClick={handleSubmit}>
            Удалить
          </ActiveButton>
        </div>
      </div>
    </Modal>
  );
};

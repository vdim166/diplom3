import { useEffect, useState } from "react";
import { backendApi } from "../../utils/backendApi";
import cls from "./styles.module.scss";
import { Modal } from "../../Modal";
import { TypeForModal } from "./SellModal";
import { ActiveButton } from "../../ActiveButton";
import { List } from "../../List";

export const RemovePermissionModal = ({ closeModal }: TypeForModal) => {
  const [pickedUser, setIsPickedUser] = useState<string | null>(null);

  const [workers, setWorkers] = useState<string[]>([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      const { users } = await backendApi.getManagers();

      setWorkers(users);
    };

    fetchWorkers();
  }, []);

  const handleSubmit = async () => {
    if (!pickedUser) return;
    await backendApi.removePermission(pickedUser);
    closeModal();
  };
  return (
    <Modal>
      <div className={cls.modalMain}>
        <div className={cls.back}>
          <ActiveButton onClick={closeModal}>Назад</ActiveButton>
        </div>

        <p>У кого удалить?</p>
        <List
          pickedUser={pickedUser}
          setIsPickedUser={setIsPickedUser}
          allOptions={workers || []}
        />
        <div>
          <ActiveButton onClick={handleSubmit}>Ok</ActiveButton>
        </div>
      </div>
    </Modal>
  );
};

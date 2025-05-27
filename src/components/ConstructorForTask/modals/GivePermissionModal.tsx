import { useEffect, useState } from "react";
import { List } from "../../List";
import { Modal } from "../../Modal";
import { TypeForModal } from "./SellModal";
import cls from "./styles.module.scss";
import { ActiveButton } from "../../ActiveButton";
import { backendApi } from "../../utils/backendApi";

export const GivePermissionModal = ({ closeModal }: TypeForModal) => {
  const [pickedUser, setIsPickedUser] = useState<string | null>(null);

  const [workers, setWorkers] = useState<string[]>([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      const { users } = await backendApi.getWorkers();

      setWorkers(users);
    };

    fetchWorkers();
  }, []);

  const handleSubmit = async () => {
    if (!pickedUser) return;

    await backendApi.givePermission(pickedUser);

    closeModal();
  };
  return (
    <Modal>
      <div className={cls.modalMain}>
        <div className={cls.back}>
          <ActiveButton onClick={closeModal}>Назад</ActiveButton>
        </div>

        <p>Дать права кому?</p>
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

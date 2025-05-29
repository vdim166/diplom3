import { useEffect, useState } from "react";
import cls from "../styles.module.scss";
import { backendApi } from "../../../utils/backendApi";
import { KeyValueType, TypeForModal } from "../../types/TypeForModal";
import { Modal } from "../../../Modal";
import { ActiveButton } from "../../../ActiveButton";
import { List } from "../../../List";

export const RemovePermissionModal = ({ closeModal }: TypeForModal) => {
  const [pickedUser, setIsPickedUser] = useState<KeyValueType | null>(null);

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
    await backendApi.removePermission(pickedUser.key);
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
          pickedOption={pickedUser}
          setIsPickedOption={setIsPickedUser}
          allOptions={
            workers.map((worker) => ({ key: worker, value: worker })) || []
          }
        />
        <div>
          <ActiveButton onClick={handleSubmit}>Ok</ActiveButton>
        </div>
      </div>
    </Modal>
  );
};

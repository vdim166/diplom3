import { useGlobalContext } from "../Contexts/useGlobalContext";
import { Modal } from "../Modal";
import { AddTaskModal } from "../Modals/AddTaskModal";
import { MODALS } from "./types";

export const ModalComponent = () => {
  const { currentOpenModal } = useGlobalContext();

  if (currentOpenModal === null) return;
  else if (currentOpenModal === MODALS.NOTHING) return;
  else if (currentOpenModal === MODALS.ADD_TASK)
    return (
      <Modal>
        <AddTaskModal />
      </Modal>
    );
};

import { ReactNode, useState } from "react";
import { GlobalContext, GlobalContextType } from "./GlobalContext";
import { Task } from "../pages/TaskManager";
import { MODALS } from "../ModalComponent/types";

export type CurrentType = {
  username: string;
  isManager: boolean;
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [name, setName] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [allUsers, setAllUsers] = useState<string[] | null>(null);

  const [currentOpenModal, setCurrentOpenModal] = useState<
    keyof typeof MODALS | null
  >(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalData, setModalData] = useState<any>(null);

  const [currentUser, setCurrentUser] = useState<CurrentType | null>(null);

  const state: GlobalContextType = {
    name,
    setName,
    tasks,
    setTasks,
    allUsers,
    setAllUsers,
    currentOpenModal,
    setCurrentOpenModal,
    modalData,
    setModalData,
    currentUser,
    setCurrentUser,
  };

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};

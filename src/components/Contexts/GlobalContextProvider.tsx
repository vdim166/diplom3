import { ReactNode, useState } from "react";
import { GlobalContext, GlobalContextType } from "./GlobalContext";
import { Task } from "../pages/TaskManager";
import { MODALS } from "../ModalComponent/types";

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

  const state: GlobalContextType = {
    name,
    setName,
    tasks,
    setTasks,
    allUsers,
    setAllUsers,
    currentOpenModal,
    setCurrentOpenModal,
  };

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};

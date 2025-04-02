import { createContext } from "react";
import { Task } from "../pages/TaskManager";
import { MODALS } from "../ModalComponent/types";

export type GlobalContextType = {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  tasks: Task[] | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
  allUsers: string[] | null;
  setAllUsers: React.Dispatch<React.SetStateAction<string[] | null>>;
  currentOpenModal: keyof typeof MODALS | null;
  setCurrentOpenModal: React.Dispatch<
    React.SetStateAction<keyof typeof MODALS | null>
  >;
};

export const GlobalContext = createContext<GlobalContextType>({
  name: null,
  setName: () => {},
  tasks: null,
  setTasks: () => {},
  allUsers: null,
  setAllUsers: () => {},
  currentOpenModal: null,
  setCurrentOpenModal: () => {},
});

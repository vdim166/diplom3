import { createContext } from "react";
import { Task } from "../pages/TaskManager";
import { MODALS } from "../ModalComponent/types";
import { CurrentType } from "./GlobalContextProvider";

export type GlobalContextType = {
  tasks: Task[] | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
  allUsers: string[] | null;
  setAllUsers: React.Dispatch<React.SetStateAction<string[] | null>>;
  currentOpenModal: keyof typeof MODALS | null;
  setCurrentOpenModal: React.Dispatch<
    React.SetStateAction<keyof typeof MODALS | null>
  >;

  currentUser: CurrentType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentType | null>>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setModalData: any;
};

export const GlobalContext = createContext<GlobalContextType>({
  tasks: null,
  setTasks: () => {},
  allUsers: null,
  setAllUsers: () => {},
  currentOpenModal: null,
  setCurrentOpenModal: () => {},
  modalData: null,
  setModalData: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

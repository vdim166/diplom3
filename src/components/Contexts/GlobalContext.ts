import { createContext } from "react";
import { Task } from "../pages/TaskManager";

export type GlobalContextType = {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  tasks: Task[] | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
  allUsers: number | null;
  setAllUsers: React.Dispatch<React.SetStateAction<number | null>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  name: null,
  setName: () => {},
  tasks: null,
  setTasks: () => {},
  allUsers: null,
  setAllUsers: () => {},
});

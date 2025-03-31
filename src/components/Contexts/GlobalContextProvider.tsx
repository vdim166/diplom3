import { ReactNode, useState } from "react";
import { GlobalContext, GlobalContextType } from "./GlobalContext";
import { Task } from "../pages/TaskManager";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [name, setName] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[] | null>(null);

  const [allUsers, setAllUsers] = useState<number | null>(null);

  const state: GlobalContextType = {
    name,
    setName,
    tasks,
    setTasks,
    allUsers,
    setAllUsers,
  };

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};

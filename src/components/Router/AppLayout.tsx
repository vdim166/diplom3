import { useEffect } from "react";
import { MainTemplate } from "../MainTemplate";
import { backendApi } from "../utils/backendApi";
import { useGlobalContext } from "../Contexts/useGlobalContext";
import { Task } from "../pages/TaskManager";
import { ModalComponent } from "../ModalComponent";

export const AppLayout = () => {
  const { setTasks, setAllUsers } = useGlobalContext();

  useEffect(() => {
    const getAllTasks = async () => {
      const data = await backendApi.getAllTasks();
      const allUsers: { [key: string]: number } = {};

      const result: Task[] = [];

      const todoKeys = Object.keys(data.todo);
      for (let i = 0; i < todoKeys.length; ++i) {
        const key = todoKeys[i];

        allUsers[key] = 1;

        for (let j = 0; j < data.todo[key].length; ++j) {
          const todo = data.todo[key][j];
          result.push({
            id: todo.id,
            text: todo.title,
            status: "todo",
            worker: todo.assigned_to,
          });
        }
      }

      const inProgressKeys = Object.keys(data.in_progress);
      for (let i = 0; i < inProgressKeys.length; ++i) {
        const key = inProgressKeys[i];

        allUsers[key] = 1;
        for (let j = 0; j < data.in_progress[key].length; ++j) {
          const todo = data.in_progress[key][j];
          result.push({
            id: todo.id,
            text: todo.title,
            status: "inProgress",
            worker: todo.assigned_to,
          });
        }
      }

      const doneKeys = Object.keys(data.done);
      for (let i = 0; i < doneKeys.length; ++i) {
        const key = doneKeys[i];
        allUsers[key] = 1;
        for (let j = 0; j < data.done[key].length; ++j) {
          const todo = data.done[key][j];
          result.push({
            id: todo.id,
            text: todo.title,
            status: "done",
            worker: todo.assigned_to,
          });
        }
      }

      setAllUsers(Object.keys(allUsers));
      setTasks(result);
    };

    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalComponent />
      <MainTemplate />
    </>
  );
};

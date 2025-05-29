import { useEffect, useState } from "react";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";

type WorkerType = {
  name: string;
  in_todo: number;
  in_progress: number;
  in_done: number;
  is_manager: boolean;
};

export const Workers = () => {
  const [workers, setWorkers] = useState<WorkerType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const managers: string[] = (await backendApi.getManagers()).users;

        const tasks = await backendApi.getAllTasks();

        const result: {
          [key: string]: {
            in_todo: number;
            in_progress: number;
            in_done: number;
          };
        } = {};

        const todoKeys = Object.keys(tasks.todo);

        for (let i = 0; i < todoKeys.length; ++i) {
          const userName = todoKeys[i];

          const todo = tasks.todo[userName];

          if (result[userName]) {
            result[userName].in_todo = todo?.length ?? 0;
          } else {
            result[userName] = {
              in_todo: todo?.length ?? 0,
              in_progress: 0,
              in_done: 0,
            };
          }
        }

        const progressKeys = Object.keys(tasks.in_progress);
        for (let i = 0; i < progressKeys.length; ++i) {
          const userName = progressKeys[i];

          const progress = tasks.in_progress[userName];

          if (result[userName]) {
            result[userName].in_progress = progress?.length ?? 0;
          } else {
            result[userName] = {
              in_todo: 0,
              in_progress: progress?.length ?? 0,
              in_done: 0,
            };
          }
        }

        const doneKeys = Object.keys(tasks.done);
        for (let i = 0; i < doneKeys.length; ++i) {
          const userName = doneKeys[i];

          const done = tasks.done[userName];

          if (result[userName]) {
            result[userName].in_done = done?.length ?? 0;
          } else {
            result[userName] = {
              in_todo: 0,
              in_progress: 0,
              in_done: done?.length ?? 0,
            };
          }
        }

        setWorkers(
          Object.keys(result).map((name) => ({
            ...result[name],
            name,
            is_manager: managers.includes(name),
          }))
        );
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={cls.main}>
      <p className={cls.title}>Сотрудники</p>
      <div className={cls.workers}>
        <div className={cls.option}>
          <div className={cls.name}>Имя</div>
          <div className={cls.todo}>В todo</div>
          <div className={cls.progress}>В процессе</div>
          <div className={cls.done}>Сделано</div>
          <div className={cls.manager}>Менеджер</div>
        </div>
        {workers.map((worker) => {
          return (
            <div className={cls.option} key={worker.name}>
              <div className={cls.name}>{worker.name}</div>
              <div className={cls.todo}>{worker.in_todo}</div>
              <div className={cls.progress}>{worker.in_progress}</div>
              <div className={cls.done}>{worker.in_done}</div>
              <div className={cls.manager}>
                {worker.is_manager ? "Да" : "Нет"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

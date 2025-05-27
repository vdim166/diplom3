import { useState } from "react";
import { Card } from "../../Card";
import cls from "./styles.module.scss";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { backendApi } from "../../utils/backendApi";

export type Task = {
  id: string;
  text: string;
  worker: string;
  status: "todo" | "inProgress" | "done";
};

const convertStatuses = {
  todo: "todo",
  inProgress: "in_progress",
  done: "done",
};

export const TaskManager = () => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [targetColumn, setTargetColumn] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const { tasks, setTasks } = useGlobalContext();

  if (!tasks) return;

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    setDragOffset({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });

    // Create custom drag image
    const dragImage = document.createElement("div");
    dragImage.style.position = "absolute";
    dragImage.style.pointerEvents = "none";
    dragImage.style.zIndex = "9999";
    dragImage.style.opacity = "0.8";
    dragImage.style.transform = "rotate(5deg)";
    dragImage.innerHTML = `
      <div style="
        width: 280px;
        padding: 10px;
        background: #6074e7;
        border-radius: 5px;
        color: white;
        border: 1px solid white;
      ">
        <div style="margin-bottom: 8px;">
          <strong>Задача:</strong> ${task.text.substring(0, 50)}${
      task.text.length > 50 ? "..." : ""
    }
        </div>
        <div>
          <strong>Исполнитель:</strong> ${task.worker}
        </div>
      </div>
    `;
    document.body.appendChild(dragImage);

    // Position it off-screen initially
    dragImage.style.left = "-1000px";
    dragImage.style.top = "-1000px";

    e.dataTransfer.setDragImage(
      dragImage,
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    // Clean up after a short delay
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.clientX === 0 && e.clientY === 0) return; // Ignore invalid events
    setDragPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    setTargetColumn(status);
  };

  const handleDrop = async (
    e: React.DragEvent,
    status: "todo" | "inProgress" | "done"
  ) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );

      await backendApi.moveTask(draggedTask.id, convertStatuses[status]);
    }
    setDraggedTask(null);
    setTargetColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setTargetColumn(null);
  };

  const filteredTasks = (status: "todo" | "inProgress" | "done") => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => {
        const deleteHandle = async () => {
          try {
            const response = await backendApi.deleteTask(task.id);

            if (response.ok) {
              setTasks((prev) => {
                if (!prev) return null;

                return prev.filter((t) => t.id !== task.id);
              });
            }
          } catch (error) {
            console.log("error", error);
          }
        };

        return (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Card
              style={{ marginTop: "20px" }}
              taskText={task.text}
              worker={task.worker}
              deleteHandle={deleteHandle}
            />
          </div>
        );
      });
  };

  return (
    <div className={cls.main}>
      <div className={cls.title}>
        <h1>Kanban manager</h1>
      </div>
      <div className={cls.kanban}>
        <span
          className={cls.line}
          onDragOver={(e) => handleDragOver(e, "todo")}
          onDrop={(e) => handleDrop(e, "todo")}
          style={{
            backgroundColor:
              targetColumn === "todo"
                ? "rgba(96, 116, 231, 0.3)"
                : "transparent",
            borderRadius: "8px",
          }}
        >
          <div className={cls.lineName}>TODO</div>
          <div className={cls.options}>{filteredTasks("todo")}</div>
        </span>
        <span
          className={cls.line}
          onDragOver={(e) => handleDragOver(e, "inProgress")}
          onDrop={(e) => handleDrop(e, "inProgress")}
          style={{
            backgroundColor:
              targetColumn === "inProgress"
                ? "rgba(96, 116, 231, 0.3)"
                : "transparent",
            borderRadius: "8px",
          }}
        >
          <div className={cls.lineName}>В прогрессе</div>
          <div className={cls.options}>{filteredTasks("inProgress")}</div>
        </span>
        <span
          className={cls.line}
          onDragOver={(e) => handleDragOver(e, "done")}
          onDrop={(e) => handleDrop(e, "done")}
          style={{
            backgroundColor:
              targetColumn === "done"
                ? "rgba(96, 116, 231, 0.3)"
                : "transparent",
            borderRadius: "8px",
          }}
        >
          <div className={cls.lineName}>Сделано</div>
          <div className={cls.options}>{filteredTasks("done")}</div>
        </span>
      </div>

      {/* Custom drag preview */}
      {draggedTask && (
        <div
          style={{
            position: "fixed",
            left: `${dragPosition.x}px`,
            top: `${dragPosition.y}px`,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.8,
            transform: "rotate(5deg)",
            width: "280px",
          }}
        >
          <Card
            taskText={draggedTask.text}
            worker={draggedTask.worker}
            style={{
              border: "2px dashed white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
            deleteHandle={() => {}}
          />
        </div>
      )}
    </div>
  );
};

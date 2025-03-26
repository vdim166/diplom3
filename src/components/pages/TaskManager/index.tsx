import { useState } from "react";
import { Card } from "../../Card";
import cls from "./styles.module.scss";

type Task = {
  id: string;
  text: string;
  worker: string;
  status: "todo" | "inProgress" | "done";
};

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Купить моркови", worker: "Vasya", status: "todo" },
    { id: "2", text: "Помыть машину", worker: "Petya", status: "todo" },
    { id: "3", text: "Сделать домашку", worker: "Masha", status: "todo" },
    { id: "4", text: "Починить кран", worker: "Vasya", status: "todo" },
    { id: "5", text: "Купить продукты", worker: "Petya", status: "todo" },
    { id: "6", text: "Написать код", worker: "Vasya", status: "inProgress" },
    { id: "7", text: "Протестировать", worker: "Masha", status: "inProgress" },
    { id: "8", text: "Развернуть", worker: "Petya", status: "inProgress" },
    { id: "9", text: "Создать дизайн", worker: "Vasya", status: "done" },
    { id: "10", text: "Согласовать ТЗ", worker: "Masha", status: "done" },
    { id: "11", text: "Провести митинг", worker: "Petya", status: "done" },
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [targetColumn, setTargetColumn] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

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

  const handleDrop = (
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
      .map((task) => (
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
          />
        </div>
      ));
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
          />
        </div>
      )}
    </div>
  );
};

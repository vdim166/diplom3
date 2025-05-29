import { useState } from "react";
import { ActiveButton } from "../ActiveButton";
import cls from "./styles.module.scss";
import { AnswerType } from "../pages/ForManager";
import { SellModal } from "./modals/SellModal";
import { AddProductModal } from "./modals/AddProduct";
import { MoveModal } from "./modals/MoveModal";
import { GivePermissionModal } from "./modals/GivePermissionModal";
import { RemovePermissionModal } from "./modals/RemovePermissionModal";

const commands: {
  [key: string]: { [key: string]: { text: string } };
} = {
  Продукт: {
    sell: { text: "Продать" },
    move: { text: "Передвинуть" },
    addProduct: { text: "Добавить продукт" },
  },
  Админ: {
    give: { text: "Дать права" },
    remove: { text: "Удалить права" },
  },
};

type CustomModalsProps = {
  modalTag: string | null;
  closeModal: () => void;
  setAnswer: (answer: AnswerType) => void;
};

const CustomModals = ({
  modalTag,
  closeModal,
  setAnswer,
}: CustomModalsProps) => {
  if (modalTag === "sell") {
    return <SellModal closeModal={closeModal} setAnswer={setAnswer} />;
  } else if (modalTag === "move") {
    return <MoveModal closeModal={closeModal} setAnswer={setAnswer} />;
  } else if (modalTag === "addProduct") {
    return <AddProductModal closeModal={closeModal} setAnswer={setAnswer} />;
  } else if (modalTag === "give") {
    return (
      <GivePermissionModal closeModal={closeModal} setAnswer={setAnswer} />
    );
  } else if (modalTag === "remove") {
    return (
      <RemovePermissionModal closeModal={closeModal} setAnswer={setAnswer} />
    );
  }
};

type ConstructorForTaskType = {
  answer: AnswerType;
  setAnswer: (answer: AnswerType) => void;
};

export const ConstructorForTask = ({
  answer,
  setAnswer,
}: ConstructorForTaskType) => {
  const [pickedCommand, setPickedCommand] = useState<string | null>(null);
  const [promptModal, setPromptModal] = useState<string | null>(null);

  const closeModal = () => {
    setPromptModal(null);
  };

  return (
    <>
      <div className={cls.main}>
        {promptModal && (
          <CustomModals
            modalTag={promptModal}
            closeModal={closeModal}
            setAnswer={setAnswer}
          />
        )}
        <p>Название задачи</p>

        {pickedCommand !== null ? (
          <div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  marginBottom: "10px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Выбран
              </p>
              <p
                style={{
                  marginBottom: "10px",
                  color: "purple",
                  fontSize: "20px",
                }}
              >
                {pickedCommand}
              </p>
            </div>
            <div className={cls.commands}>
              {pickedCommand && (
                <>
                  <ActiveButton onClick={() => setPickedCommand(null)}>
                    Назад
                  </ActiveButton>
                  {Object.keys(commands[pickedCommand] || []).map((command) => {
                    return (
                      <ActiveButton
                        onClick={() => {
                          setPromptModal(command);
                        }}
                      >
                        {commands[pickedCommand][command].text}
                      </ActiveButton>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className={cls.commands}>
            {Object.keys(commands).map((command) => {
              return (
                <ActiveButton onClick={() => setPickedCommand(command)}>
                  {command}
                </ActiveButton>
              );
            })}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              color: "green",
            }}
          >
            {answer.what || "..."}
          </p>
          <p
            style={{
              fontSize: "20px",
              color: "white",
            }}
          >
            нужно
          </p>

          <p
            style={{
              fontSize: "20px",
              color: "blue",
            }}
          >
            {answer.action || "..."}
          </p>
        </div>
      </div>
    </>
  );
};

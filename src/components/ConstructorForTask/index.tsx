import { useState } from "react";
import { ActiveButton } from "../ActiveButton";
import cls from "./styles.module.scss";
import { SellModal } from "./modals/SellModal";
import { MoveModal } from "./modals/MoveModal";
import { ChangePrice } from "./modals/ChangePrice";

const commands: {
  [key: string]: { [key: string]: { text: string } };
} = {
  Продукт: {
    sell: { text: "Продать" },
    move: { text: "Передвинуть" },
    // changePrice: { text: "Изменить цену" },
    addProduct: { text: "Добавить продукт" },
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
  } else if (modalTag === "changePrice") {
    return <ChangePrice closeModal={closeModal} setAnswer={setAnswer} />;
  } else if (modalTag === "addProduct") {
    return;
  }
};

export type AnswerType = {
  what: string | null;
  action: string | null;
};

export const ConstructorForTask = () => {
  const [pickedCommand, setPickedCommand] = useState<string | null>(null);

  const [promptModal, setPromptModal] = useState<string | null>(null);

  const closeModal = () => {
    setPromptModal(null);
  };

  const [answer, setAnswer] = useState<AnswerType>({
    what: null,
    action: null,
  });

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

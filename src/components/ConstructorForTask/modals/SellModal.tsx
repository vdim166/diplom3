import { useEffect, useState } from "react";
import { backendApi } from "../../utils/backendApi";
import { AnswerType } from "..";
import { Modal } from "../../Modal";
import { ActiveButton } from "../../ActiveButton";
import { List } from "../../List";
import cls from "./styles.module.scss";

export type TypeForModal = {
  closeModal: () => void;
  setAnswer: (answer: AnswerType) => void;
};

export const SellModal = ({ closeModal, setAnswer }: TypeForModal) => {
  const [pickedProduct, setPickedProduct] = useState<string | null>(null);
  const [fetchedProducts, setFetchedProducts] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchStorage = async () => {
      const data = await backendApi.fetchStorage();
      setFetchedProducts(data.map((p) => p.name));
    };

    fetchStorage();
  }, []);

  return (
    <Modal>
      <div className={cls.modalMain}>
        <div className={cls.back}>
          <ActiveButton onClick={closeModal}>Назад</ActiveButton>
        </div>
        <p
          style={{
            marginTop: "10px",
          }}
        >
          Что продать
        </p>
        <List
          allOptions={fetchedProducts || []}
          pickedUser={pickedProduct}
          setIsPickedUser={setPickedProduct}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <ActiveButton
              onClick={() => {
                closeModal();
                setAnswer({ what: pickedProduct, action: "продать" });
              }}
              disabled={pickedProduct === null}
            >
              Подтвердить
            </ActiveButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

import { useEffect, useState } from "react";
import { Modal } from "../../Modal";
import { backendApi } from "../../utils/backendApi";
import cls from "./styles.module.scss";
import { ActiveButton } from "../../ActiveButton";
import { TypeForModal } from "./SellModal";
import { List } from "../../List";
import { fetchProductDataApi } from "../../utils/fetchProductDataApi";

export const ChangePrice = ({ closeModal, setAnswer }: TypeForModal) => {
  const [pickedProduct, setPickedProduct] = useState<string | null>(null);
  const [fetchedProducts, setFetchedProducts] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchStorage = async () => {
      const data = await backendApi.fetchStorage();

      console.log("data", data);

      const prices = await fetchProductDataApi.fetch();
      console.log("prices", prices);

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

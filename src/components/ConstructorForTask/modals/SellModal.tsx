import { useEffect, useState } from "react";
import { backendApi, FetchedStorageItem } from "../../utils/backendApi";
import { Modal } from "../../Modal";
import { ActiveButton } from "../../ActiveButton";
import { List } from "../../List";
import cls from "./styles.module.scss";
import { Input } from "../../Input";
import { AnswerType } from "../../pages/ForManager";
import { productObject } from "../../utils/fetchProductDataApi";

export type TypeForModal = {
  closeModal: () => void;
  setAnswer: (answer: AnswerType) => void;
};

export const SellModal = ({ closeModal, setAnswer }: TypeForModal) => {
  const [pickedProduct, setPickedProduct] = useState<string | null>(null);
  const [fetchedProducts, setFetchedProducts] = useState<
    FetchedStorageItem[] | null
  >(null);
  const [pickedStorage, setPickedStorage] = useState<string | null>(null);

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchStorage = async () => {
      const data = await backendApi.fetchStorage();
      console.log("data", data);

      setFetchedProducts(data);
    };

    fetchStorage();
  }, []);

  return (
    <Modal>
      <div className={cls.modalMain}>
        <div className={cls.back}>
          <ActiveButton onClick={closeModal}>Назад</ActiveButton>
        </div>
        <>
          <p
            style={{
              marginTop: "10px",
            }}
          >
            Откуда продать
          </p>
          <List
            allOptions={Array(24)
              .fill(1)
              .map((_, index) => `storage_${index + 1}`)}
            pickedUser={pickedStorage}
            setIsPickedUser={setPickedStorage}
          />
        </>
        {pickedStorage && (
          <>
            <p
              style={{
                marginTop: "10px",
              }}
            >
              Что продать
            </p>
            <List
              allOptions={
                pickedStorage
                  ? fetchedProducts
                      ?.filter((p) => p.storage_id === pickedStorage)
                      .map((p) => p.name) || []
                  : []
              }
              pickedUser={pickedProduct}
              setIsPickedUser={setPickedProduct}
            />
          </>
        )}

        {pickedProduct && (
          <div>
            <p
              style={{
                marginTop: "10px",
              }}
            >
              Какое количество (max:{" "}
              {
                fetchedProducts?.filter(
                  (p) => p.storage_id === pickedStorage
                )[0]?.count
              }
              )
            </p>

            <Input
              type="number"
              style={{
                marginTop: "10px",
              }}
              value={count}
              onChange={(e) => {
                if (fetchedProducts)
                  if (
                    Number(e.target.value) <=
                    Number(
                      fetchedProducts.filter(
                        (p) => p.storage_id === pickedStorage
                      )[0]?.count
                    )
                  ) {
                    setCount(Number(e.target.value));
                  }
              }}
            />
          </div>
        )}
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
                if (!pickedProduct) return;
                closeModal();
                setAnswer({
                  what: productObject[pickedProduct],
                  action: `продать в ${pickedStorage} (${count})`,
                  query: JSON.stringify({
                    action: "sell",
                    product: pickedProduct,
                    count,
                    storage: pickedStorage,
                  }),
                });
              }}
              disabled={count === 0}
            >
              Подтвердить
            </ActiveButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

import { useEffect, useState } from "react";
import cls from "../styles.module.scss";
import { KeyValueType, TypeForModal } from "../../types/TypeForModal";
import { backendApi, FetchedStorageItem } from "../../../utils/backendApi";
import { Modal } from "../../../Modal";
import { ActiveButton } from "../../../ActiveButton";
import { List } from "../../../List";
import { Input } from "../../../Input";
import { productObject } from "../../../utils/fetchProductDataApi";

export const SellModal = ({ closeModal, setAnswer }: TypeForModal) => {
  const [pickedProduct, setPickedProduct] = useState<KeyValueType | null>(null);
  const [fetchedProducts, setFetchedProducts] = useState<
    FetchedStorageItem[] | null
  >(null);
  const [pickedStorage, setPickedStorage] = useState<KeyValueType | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const data = await backendApi.fetchStorage();
        setFetchedProducts(data);
      } catch (error) {
        console.log("error", error);
      }
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
          <p className={cls.mt10}>Откуда продать</p>
          <List
            allOptions={Array(24)
              .fill(1)
              .map((_, index) => ({
                value: `Стеллаж ${index + 1}`,
                key: `storage_${index + 1}`,
              }))}
            pickedOption={pickedStorage}
            setIsPickedOption={setPickedStorage}
          />
        </>
        {pickedStorage && (
          <>
            <p className={cls.mt10}>Что продать</p>
            <List
              allOptions={
                pickedStorage
                  ? fetchedProducts
                      ?.filter((p) => p.storage_id === pickedStorage.key)
                      .map((p) => ({
                        key: p.name,
                        value: productObject[p.name],
                      })) || []
                  : []
              }
              pickedOption={pickedProduct}
              setIsPickedOption={setPickedProduct}
            />
          </>
        )}

        {pickedProduct && (
          <div>
            <p className={cls.mt10}>
              Какое количество (max:{" "}
              {
                fetchedProducts?.filter(
                  (p) =>
                    p.name === pickedProduct?.key &&
                    p.storage_id === pickedStorage?.key
                )[0]?.count
              }
              )
            </p>

            <Input
              type="number"
              className={cls.mt10}
              value={count}
              onChange={(e) => {
                if (fetchedProducts)
                  if (
                    Number(e.target.value) <=
                    Number(
                      fetchedProducts.filter(
                        (p) =>
                          p.name === pickedProduct?.key &&
                          p.storage_id === pickedStorage?.key
                      )[0]?.count
                    )
                  ) {
                    setCount(Number(e.target.value));
                  }
              }}
            />
          </div>
        )}
        <div className={cls.buttonWrapper}>
          <div>
            <ActiveButton
              onClick={() => {
                if (!pickedProduct) return;
                closeModal();
                setAnswer({
                  what: productObject[pickedProduct.key],
                  action: `продать в ${pickedStorage?.value} (${count})`,
                  query: JSON.stringify({
                    action: "sell",
                    product: pickedProduct.key,
                    count,
                    storage: pickedStorage?.key,
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

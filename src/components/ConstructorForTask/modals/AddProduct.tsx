import { useState } from "react";
import { TypeForModal } from "./SellModal";
import { Modal } from "../../Modal";
import cls from "./styles.module.scss";
import { ActiveButton } from "../../ActiveButton";
import { List } from "../../List";
import { Input } from "../../Input";
import { productObject } from "../../utils/fetchProductDataApi";

export const AddProductModal = ({ closeModal, setAnswer }: TypeForModal) => {
  const [pickedProduct, setPickedProduct] = useState<string | null>(null);

  const [pickedStorage, setPickedStorage] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

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
            Куда добавить
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
              Что добавить
            </p>
            <List
              allOptions={Object.keys(productObject)}
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
              Какое количество
            </p>

            <Input
              type="number"
              style={{
                marginTop: "10px",
              }}
              value={count}
              onChange={(e) => {
                setCount(Number(e.target.value));
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
                if (!pickedProduct) return pickedProduct;

                closeModal();

                setAnswer({
                  what: productObject[pickedProduct],
                  action: `добавить на ${pickedStorage} (${count})`,
                  query: JSON.stringify({
                    action: "add",
                    product: pickedProduct,
                    count,
                    storage: pickedStorage,
                  }),
                });
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

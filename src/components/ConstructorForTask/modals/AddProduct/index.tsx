import { useState } from "react";
import { Modal } from "../../../Modal";
import cls from "../styles.module.scss";
import { ActiveButton } from "../../../ActiveButton";
import { List } from "../../../List";
import { KeyValueType, TypeForModal } from "../../types/TypeForModal";
import { productObject } from "../../../utils/fetchProductDataApi";
import { Input } from "../../../Input";

export const AddProductModal = ({ closeModal, setAnswer }: TypeForModal) => {
  const [pickedProduct, setPickedProduct] = useState<KeyValueType | null>(null);

  const [pickedStorage, setPickedStorage] = useState<KeyValueType | null>(null);
  const [count, setCount] = useState<number>(0);

  return (
    <Modal>
      <div className={cls.modalMain}>
        <div className={cls.back}>
          <ActiveButton onClick={closeModal}>Назад</ActiveButton>
        </div>

        <>
          <p className={cls.mt10}>Куда добавить</p>
          <List
            allOptions={Array(24)
              .fill(1)
              .map((_, index) => ({
                key: `storage_${index + 1}`,
                value: `Стеллаж ${index + 1}`,
              }))}
            pickedOption={pickedStorage}
            setIsPickedOption={setPickedStorage}
          />
        </>
        {pickedStorage && (
          <>
            <p className={cls.mt10}>Что добавить</p>
            <List
              allOptions={Object.keys(productObject).map((key) => ({
                key,
                value: productObject[key],
              }))}
              pickedOption={pickedProduct}
              setIsPickedOption={setPickedProduct}
            />
          </>
        )}

        {pickedProduct && (
          <div>
            <p className={cls.mt10}>Какое количество</p>

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
        <div className={cls.buttonWrapper}>
          <div>
            <ActiveButton
              onClick={() => {
                if (!pickedProduct) return pickedProduct;

                closeModal();

                setAnswer({
                  what: productObject[pickedProduct.key],
                  action: `добавить на ${pickedStorage?.value} (${count})`,
                  query: JSON.stringify({
                    action: "add",
                    product: pickedProduct.key,
                    count,
                    storage: pickedStorage?.key,
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

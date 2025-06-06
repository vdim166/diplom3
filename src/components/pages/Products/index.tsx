import { useEffect, useState } from "react";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";
import { productObject } from "../../utils/fetchProductDataApi";
import { Rocket } from "../../shared/svgs/Rocket";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { MODALS } from "../../ModalComponent/types";

export const ProductsPage = () => {
  const [productState, setProductState] = useState<{
    [key: string]: {
      storages: string[];
      count: number;
    };
  }>({});

  const { setCurrentOpenModal, setModalData } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await backendApi.fetchStorage();

      const result: { [key: string]: { storages: string[]; count: number } } =
        {};

      for (let i = 0; i < data.length; ++i) {
        const item = data[i];

        if (!result[item.name]) {
          result[item.name] = {
            count: item.count,
            storages: [item.storage_id],
          };
        } else {
          result[item.name].count += item.count;
          result[item.name].storages.push(item.storage_id);
        }
      }

      setProductState(result);
    };

    fetchData();
  }, []);

  const handleChangeExpTime = (key: string) => () => {
    setModalData({ key });
    setCurrentOpenModal(MODALS.CHANGE_EXP_TIME);
  };

  return (
    <div className={cls.main}>
      <div className={cls.options}>
        <div className={cls.option}>
          <div className={cls.name}>Имя</div>
          <div className={cls.count}>Количество</div>
          <div className={cls.storages}>Склады</div>
        </div>
        {Object.keys(productState).map((key, index) => {
          const item = productState[key];

          return (
            <div className={cls.option} key={`${item}-${item.count}-${index}`}>
              <div className={cls.name}>{productObject[key]}</div>
              <div className={cls.count}>{item.count} шт.</div>
              <div className={cls.storages}>
                {item.storages
                  .map((s) => s.replace("storage_", "стеллаж "))
                  .join(", ")}
              </div>
              <div
                className={cls.changeExpTime}
                onClick={handleChangeExpTime(key)}
              >
                <Rocket />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

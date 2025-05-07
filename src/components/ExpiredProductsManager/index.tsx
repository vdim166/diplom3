import { useEffect, useState } from "react";
import { ActiveButton } from "../ActiveButton";
import cls from "./styles.module.scss";
import { backendApi } from "../utils/backendApi";
import { productObject } from "../utils/fetchProductDataApi";
import { useGlobalContext } from "../Contexts/useGlobalContext";

type Product = {
  name: string;
  until: string;
  daysLeft: number;
  storage_id: string;
  count: number;
};

function formatExpirationDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export const ExpiredProductsManager = () => {
  const [expiredProducts, setExpiredProducts] = useState<Product[]>([]);

  const [isCreated, setIsCreated] = useState(false);

  const { currentUser, setTasks } = useGlobalContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await backendApi.fetchStorage();

      const currentDateUTC = new Date();

      const result: Product[] = [];

      for (let i = 0; i < data.length; i++) {
        const product = data[i];

        const expirationDate = new Date(product.expiration_date);
        const expirationMs = expirationDate.getTime();

        const currentMs = currentDateUTC.getTime();

        const diffMs = expirationMs - currentMs;

        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays <= 10) {
          result.push({
            name: product.name,
            until: formatExpirationDate(product.expiration_date),
            daysLeft: diffDays,
            storage_id: product.storage_id,
            count: product.count,
          });
        }
      }

      setExpiredProducts(result);
    };

    fetchProducts();
  }, []);

  const handle = async () => {
    if (!currentUser) return;

    for (let i = 0; i < expiredProducts.length; ++i) {
      try {
        const data = await backendApi.createTask({
          title: `Срочно продать ${productObject[expiredProducts[i].name]}`,
          assigned_to: currentUser.username,
          description: "",
          query: JSON.stringify({
            action: "sell",
            product: expiredProducts[i].name,
            count: expiredProducts[i].count,
            storage: expiredProducts[i].storage_id,
          }),
        });

        setTasks((prev) => {
          if (!prev) return null;

          return [
            ...prev,
            {
              id: data.id,
              status: data.status,
              text: data.title,
              worker: data.assigned_to,
            },
          ];
        });
      } catch (error) {
        console.log("error", error);
      }
    }

    setIsCreated(true);
  };

  return (
    <div className={cls.main}>
      <p className={cls.title}>Товары которые скоро просрочаться</p>
      <div className={cls.block}>
        {expiredProducts.map((product) => {
          return (
            <div
              className={`${cls.option} ${
                product.daysLeft <= 5 ? cls.option_red : cls.option_light
              }`}
            >
              <p className={cls.name}>{productObject[product.name]}</p>{" "}
              <p>до {product.until}</p>{" "}
              <p className={cls.days}>{product.daysLeft} дней</p>
            </div>
          );
        })}
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        {isCreated ? (
          <p>Задача создана</p>
        ) : (
          <ActiveButton
            style={{
              maxWidth: "180px",
            }}
            onClick={handle}
          >
            Создать задачу
          </ActiveButton>
        )}
      </div>
    </div>
  );
};

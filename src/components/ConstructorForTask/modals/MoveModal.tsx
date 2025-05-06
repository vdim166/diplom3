import { useEffect, useState } from "react";
import { ActiveButton } from "../../ActiveButton";
import { Modal } from "../../Modal";
import { TypeForModal } from "./SellModal";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";
import { List } from "../../List";

const StorageMove = ({
  pickedProduct,
  localData,
  setTo,
}: {
  pickedProduct: string;
  localData: {
    category: string;
    count: number;
    id: string;
    name: string;
    storage_id: string;
  }[];

  setTo: (to: string) => void;
}) => {
  const [pickedCandidate, setPickedCandidate] = useState<string | null>(null);

  const from = localData?.find((p) => p.name === pickedProduct)?.storage_id;
  const to = localData.map((p) => p.storage_id).filter((p) => p !== from);

  useEffect(() => {
    if (pickedCandidate) setTo(pickedCandidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedCandidate]);
  return (
    <div>
      <p
        style={{
          marginBottom: "20px",
        }}
      >
        {"Передвинуть с № " + from}
      </p>

      {pickedCandidate && <p>На </p>}

      <List
        allOptions={to}
        pickedUser={pickedCandidate}
        setIsPickedUser={setPickedCandidate}
      />
    </div>
  );
};

export const MoveModal = ({ closeModal, setAnswer }: TypeForModal) => {
  const [pickedProduct, setPickedProduct] = useState<string | null>(null);
  const [fetchedProducts, setFetchedProducts] = useState<string[] | null>(null);
  const [localData, setLocalData] = useState<
    {
      category: string;
      count: number;
      id: string;
      name: string;
      storage_id: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchStorage = async () => {
      const data = await backendApi.fetchStorage();

      setLocalData(data);
      setFetchedProducts(data.map((p) => p.name));
    };

    fetchStorage();
  }, []);

  const [to, setTo] = useState<string | null>(null);

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
          Что передвинуть
        </p>
        <List
          allOptions={fetchedProducts || []}
          pickedUser={pickedProduct}
          setIsPickedUser={setPickedProduct}
        />

        {pickedProduct && (
          <StorageMove
            pickedProduct={pickedProduct}
            localData={localData}
            setTo={(to) => setTo(to)}
          />
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
                closeModal();
                setAnswer({
                  what: pickedProduct,
                  action: `передвинуть на ${to}`,
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

import { useEffect, useState } from "react";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";
import { useGlobalContext } from "../../Contexts/useGlobalContext";
import { MODALS } from "../../ModalComponent/types";
import { List } from "../../List";
import { KeyValueType } from "../../ConstructorForTask/types/TypeForModal";
import { Input } from "../../Input";
import { ActiveButton } from "../../ActiveButton";

export const ChangeExpTimeModal = () => {
  const { modalData, setCurrentOpenModal, setModalData } = useGlobalContext();

  const [allStorages, setAllStorages] = useState<
    { storage_id: string; id: string }[]
  >([]);
  const [pickedStorage, setPickedStorage] = useState<KeyValueType | null>(null);

  const [newDate, setNewDate] = useState<string>("");

  useEffect(() => {
    const fetchStorage = async () => {
      if (!modalData.key) return;

      const { key } = modalData;
      const response = await backendApi.fetchStorage();

      const result = response.filter((predicate) => predicate.name === key);

      setAllStorages(result);
    };

    fetchStorage();
  }, []);

  const handleBack = () => {
    setCurrentOpenModal(MODALS.NOTHING);
    setModalData(null);
  };

  const handleSubmit = async () => {
    if (!modalData.key) return;
    if (!pickedStorage?.key) return;

    try {
      await backendApi.changeExpTime(
        modalData.key,
        pickedStorage.key,
        `${newDate}T00:00:00Z`
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      handleBack();
    }
  };

  return (
    <div className={cls.main}>
      <div className={cls.backButton} onClick={handleBack}>
        <p>Назад</p>
      </div>

      <p className={cls.title}>Выберите стеллаж</p>
      <List
        allOptions={allStorages.map(({ storage_id }) => ({
          value: storage_id.replace("storage_", "стеллаж "),
          key: storage_id,
        }))}
        pickedOption={pickedStorage}
        setIsPickedOption={setPickedStorage}
      />

      {pickedStorage && (
        <div>
          <p className={cls.title}>Введите дату</p>
          <Input
            className={cls.input}
            type="date"
            value={newDate}
            onChange={(e) => {
              console.log(e.target.value);

              setNewDate(e.target.value);
            }}
          />
        </div>
      )}

      <div className={cls.button}>
        <ActiveButton
          disabled={pickedStorage === null || newDate === ""}
          onClick={handleSubmit}
        >
          Изменить
        </ActiveButton>
      </div>
    </div>
  );
};

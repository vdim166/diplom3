import { backendApi } from "../../utils/backendApi";
import { getRandomColor } from "../../utils/getRandomColor";
import { Block } from "./Block";
import cls from "./styles.module.scss";
import { useEffect, useMemo, useState } from "react";

export type StorageType = { [key: string]: { name: string; count: number }[] };

type GenerateItemsProps = {
  from: number;
  to: number;
  offset?: number;
  colors: string[];
  currentStorage: StorageType;
  setOpenedStorage: (name: string | null) => void;
  setCurrentStorageName: (name: string | null) => void;
};

const GenerateItems = ({
  from,
  to,
  colors,
  currentStorage,
  setOpenedStorage,
  setCurrentStorageName,
}: GenerateItemsProps) => {
  const length = to - from;

  const offset = from;

  return (
    <>
      {[...Array(length).keys()].map((index) => {
        const id = index + offset;

        return (
          <Block
            style={{
              backgroundColor: colors[id],
            }}
            onClose={() => {
              setOpenedStorage(null);
            }}
            setOpenedStorage={() => setOpenedStorage(`${id + 1}`)}
            storage={currentStorage[`storage_${id + 1}`]}
            key={id}
            onHover={() => setCurrentStorageName(`${id + 1}`)}
            onLeave={() => setCurrentStorageName(null)}
          />
        );
      })}
    </>
  );
};

export const StoragePage = () => {
  const [currentStorage, setCurrentStorage] = useState<StorageType>({});

  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < 24; i++) {
      colors.push(getRandomColor());
    }
    return colors;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result: StorageType = {};

      const data = await backendApi.fetchStorage();

      data.forEach((item) => {
        if (!result[item.storage_id]) {
          result[item.storage_id] = [];
        }

        result[item.storage_id].push({ name: item.name, count: item.count });
      });

      setCurrentStorage(result);
    };
    fetchData();
  }, []);

  const [currentStorageName, setCurrentStorageName] = useState<string | null>(
    null
  );

  const [openedStorage, setOpenedStorage] = useState<string | null>(null);

  return (
    <div className={cls.main}>
      <div className={`${cls.name}`}>
        Имя склада:{" "}
        {openedStorage === null && (
          <span
            className={`${currentStorageName ? cls.glowGreen : cls.glowRed}`}
          >
            {currentStorageName ?? "Нет"}
          </span>
        )}
        {openedStorage !== null && (
          <span className={`${cls.glowGreen}`}>{openedStorage}</span>
        )}
      </div>
      <div className={cls.wrapper}>
        <div className={cls.line}>
          <GenerateItems
            from={0}
            to={6}
            colors={colors}
            currentStorage={currentStorage}
            setOpenedStorage={(name) => {
              setOpenedStorage(name);
            }}
            setCurrentStorageName={setCurrentStorageName}
          />
          <div className={cls.underline}></div>
        </div>
        <div
          className={cls.line}
          style={{
            marginLeft: "150px",
          }}
        >
          <GenerateItems
            from={6}
            to={12}
            colors={colors}
            currentStorage={currentStorage}
            setOpenedStorage={(name) => {
              setOpenedStorage(name);
            }}
            setCurrentStorageName={setCurrentStorageName}
          />
          <div className={cls.underline}></div>
        </div>
        <div className={cls.line}>
          <GenerateItems
            from={12}
            to={18}
            colors={colors}
            currentStorage={currentStorage}
            setOpenedStorage={(name) => {
              setOpenedStorage(name);
            }}
            setCurrentStorageName={setCurrentStorageName}
          />
          <div className={cls.underline}></div>
        </div>
        <div
          className={cls.line}
          style={{
            marginLeft: "150px",
          }}
        >
          <GenerateItems
            from={18}
            to={24}
            colors={colors}
            currentStorage={currentStorage}
            setOpenedStorage={(name) => {
              setOpenedStorage(name);
            }}
            setCurrentStorageName={setCurrentStorageName}
          />
          <div className={cls.underline}></div>
        </div>
        <div className={`${cls.column} ${cls.column_1}`}></div>
        <div className={`${cls.column} ${cls.column_2}`}></div>
        <div className={`${cls.column} ${cls.column_3}`}></div>
      </div>
    </div>
  );
};

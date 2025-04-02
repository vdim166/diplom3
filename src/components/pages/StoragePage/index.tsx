import { backendApi } from "../../utils/backendApi";
import { getRandomColor } from "../../utils/getRandomColor";
import { Block } from "./Block";
import cls from "./styles.module.scss";
import { useEffect, useMemo, useState } from "react";

export type StorageType = { [key: string]: { name: string; count: number }[] };

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

      const data: {
        category: string;
        count: number;
        id: string;
        name: string;
        storage_id: string;
      }[] = await backendApi.fetchStorage();

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
      <div style={{ display: "flex", gap: "15px" }}>
        <div
          className={cls.line1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Block
            setOpenedStorage={() => setOpenedStorage("1")}
            style={{ backgroundColor: colors[0] }}
            onHover={() => {
              setCurrentStorageName("1");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_1`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("2")}
            style={{ backgroundColor: colors[1] }}
            onHover={() => {
              setCurrentStorageName("2");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_2`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("3")}
            style={{ backgroundColor: colors[2] }}
            onHover={() => {
              setCurrentStorageName("3");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_3`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("4")}
            style={{ backgroundColor: colors[3] }}
            onHover={() => {
              setCurrentStorageName("4");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_4`]}
          ></Block>
        </div>
        <div
          className={cls.line1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "150px",
          }}
        >
          <Block
            setOpenedStorage={() => setOpenedStorage("5")}
            style={{ backgroundColor: colors[4] }}
            onHover={() => {
              setCurrentStorageName("5");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_5`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("6")}
            style={{ backgroundColor: colors[5] }}
            onHover={() => {
              setCurrentStorageName("6");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_6`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("7")}
            style={{ backgroundColor: colors[6] }}
            onHover={() => {
              setCurrentStorageName("7");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_7`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("8")}
            style={{ backgroundColor: colors[7] }}
            onHover={() => {
              setCurrentStorageName("8");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_8`]}
          ></Block>
        </div>
        <div
          className={cls.line1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Block
            setOpenedStorage={() => setOpenedStorage("9")}
            style={{ backgroundColor: colors[8] }}
            onHover={() => {
              setCurrentStorageName("9");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_9`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("10")}
            style={{ backgroundColor: colors[9] }}
            onHover={() => {
              setCurrentStorageName("10");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_10`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("11")}
            style={{ backgroundColor: colors[10] }}
            onHover={() => {
              setCurrentStorageName("11");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_11`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("12")}
            style={{ backgroundColor: colors[11] }}
            onHover={() => {
              setCurrentStorageName("12");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_12`]}
          ></Block>
        </div>
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <div
          className={cls.line1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Block
            setOpenedStorage={() => setOpenedStorage("13")}
            style={{ backgroundColor: colors[12] }}
            onHover={() => {
              setCurrentStorageName("13");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_13`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("14")}
            style={{ backgroundColor: colors[13] }}
            onHover={() => {
              setCurrentStorageName("14");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_14`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("15")}
            style={{ backgroundColor: colors[14] }}
            onHover={() => {
              setCurrentStorageName("15");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_15`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("16")}
            style={{ backgroundColor: colors[15] }}
            onHover={() => {
              setCurrentStorageName("16");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_16`]}
          ></Block>
        </div>
        <div
          className={cls.line1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "150px",
          }}
        >
          <Block
            setOpenedStorage={() => setOpenedStorage("17")}
            style={{ backgroundColor: colors[16] }}
            onHover={() => {
              setCurrentStorageName("17");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_17`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("18")}
            style={{ backgroundColor: colors[17] }}
            onHover={() => {
              setCurrentStorageName("18");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_18`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("19")}
            style={{ backgroundColor: colors[18] }}
            onHover={() => {
              setCurrentStorageName("19");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_19`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("20")}
            style={{ backgroundColor: colors[19] }}
            onHover={() => {
              setCurrentStorageName("20");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_20`]}
          ></Block>
        </div>
        <div
          className={cls.line1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Block
            setOpenedStorage={() => setOpenedStorage("21")}
            style={{ backgroundColor: colors[20] }}
            onHover={() => {
              setCurrentStorageName("21");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_21`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("22")}
            style={{ backgroundColor: colors[21] }}
            onHover={() => {
              setCurrentStorageName("22");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_22`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("23")}
            style={{ backgroundColor: colors[22] }}
            onHover={() => {
              setCurrentStorageName("23");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_23`]}
          ></Block>
          <Block
            setOpenedStorage={() => setOpenedStorage("24")}
            style={{ backgroundColor: colors[23] }}
            onHover={() => {
              setCurrentStorageName("24");
            }}
            onLeave={() => setCurrentStorageName(null)}
            onClose={() => setOpenedStorage(null)}
            storage={currentStorage[`storage_24`]}
          ></Block>
        </div>
      </div>
    </div>
  );
};

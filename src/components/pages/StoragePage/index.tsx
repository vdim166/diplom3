import { Block } from "./Block";
import cls from "./styles.module.scss";
import { useEffect, useMemo, useState } from "react";
// TODO: add name of the storage

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const StoragePage = () => {
  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < 24; i++) {
      colors.push(getRandomColor());
    }
    return colors;
  }, []);

  const [currentStorageName, setCurrentStorageName] = useState<string | null>(
    null
  );

  useEffect(() => {
    // add animation
    if (currentStorageName) {
    }
  }, [currentStorageName]);

  return (
    <div className={cls.main}>
      <div className={cls.name}>Имя склада: {currentStorageName ?? "Нет"}</div>
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
            style={{ backgroundColor: colors[0] }}
            onHover={() => {
              setCurrentStorageName("1");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[1] }}
            onHover={() => {
              setCurrentStorageName("2");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[2] }}
            onHover={() => {
              setCurrentStorageName("3");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[3] }}
            onHover={() => {
              setCurrentStorageName("4");
            }}
            onLeave={() => setCurrentStorageName(null)}
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
            style={{ backgroundColor: colors[4] }}
            onHover={() => {
              setCurrentStorageName("5");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[5] }}
            onHover={() => {
              setCurrentStorageName("6");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[6] }}
            onHover={() => {
              setCurrentStorageName("7");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[7] }}
            onHover={() => {
              setCurrentStorageName("8");
            }}
            onLeave={() => setCurrentStorageName(null)}
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
            style={{ backgroundColor: colors[8] }}
            onHover={() => {
              setCurrentStorageName("9");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[9] }}
            onHover={() => {
              setCurrentStorageName("10");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[10] }}
            onHover={() => {
              setCurrentStorageName("11");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[11] }}
            onHover={() => {
              setCurrentStorageName("12");
            }}
            onLeave={() => setCurrentStorageName(null)}
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
            style={{ backgroundColor: colors[12] }}
            onHover={() => {
              setCurrentStorageName("13");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[13] }}
            onHover={() => {
              setCurrentStorageName("14");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[14] }}
            onHover={() => {
              setCurrentStorageName("15");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[15] }}
            onHover={() => {
              setCurrentStorageName("16");
            }}
            onLeave={() => setCurrentStorageName(null)}
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
            style={{ backgroundColor: colors[16] }}
            onHover={() => {
              setCurrentStorageName("17");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[17] }}
            onHover={() => {
              setCurrentStorageName("18");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[18] }}
            onHover={() => {
              setCurrentStorageName("19");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[19] }}
            onHover={() => {
              setCurrentStorageName("20");
            }}
            onLeave={() => setCurrentStorageName(null)}
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
            style={{ backgroundColor: colors[20] }}
            onHover={() => {
              setCurrentStorageName("21");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[21] }}
            onHover={() => {
              setCurrentStorageName("22");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[22] }}
            onHover={() => {
              setCurrentStorageName("23");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
          <Block
            style={{ backgroundColor: colors[23] }}
            onHover={() => {
              setCurrentStorageName("24");
            }}
            onLeave={() => setCurrentStorageName(null)}
          ></Block>
        </div>
      </div>
    </div>
  );
};

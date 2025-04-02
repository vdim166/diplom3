import { CSSProperties, useEffect, useState } from "react";
import cls from "./styles.module.scss";
import { getRandomColor } from "../../../utils/getRandomColor";

const ColumnStatGraph = ({
  to = 100,
  name = "",
  nameStyle = {},
}: {
  to?: number;
  name?: string;
  nameStyle?: CSSProperties;
}) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const color = getRandomColor();

  return (
    <div
      className={cls.graph}
      style={{ height: `${height}%`, backgroundColor: color }}
    >
      <div className={cls.name} style={nameStyle}>
        <p>{name}</p>
      </div>
    </div>
  );
};

export const ColumnStat = ({ goBack }: { goBack: () => void }) => {
  return (
    <div className={cls.main}>
      <div className={cls.backButton} onClick={goBack}>
        <p>Назад</p>
      </div>
      <div className={cls.stats}>
        <ColumnStatGraph to={80} name="Прирост выручки" />
        <ColumnStatGraph
          to={40}
          name="Прирост эффективтости персонала"
          nameStyle={{ bottom: "-45px" }}
        />
        <ColumnStatGraph to={20} name="Прирост выполненых заказов" />
        <ColumnStatGraph
          to={50}
          name="Прирост чистой прибыли"
          nameStyle={{ bottom: "-45px" }}
        />
      </div>
    </div>
  );
};

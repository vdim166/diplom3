import { useEffect, useState } from "react";
import cls from "./styles.module.scss";

const ColumnStatGraph = ({ to = 100 }: { to?: number }) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(to);
  }, []);

  return <div className={cls.graph} style={{ height: `${height}%` }}></div>;
};

export const ColumnStat = () => {
  return (
    <div className={cls.main}>
      <div className={cls.stats}>
        <ColumnStatGraph to={80} />
        <ColumnStatGraph to={40} />
      </div>
    </div>
  );
};

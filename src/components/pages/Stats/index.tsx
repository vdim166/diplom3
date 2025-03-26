import { useState } from "react";
import { ChooseStatsPage } from "./ChooseStatsPage";
import cls from "./styles.module.scss";
import { stats } from "../../consts";
import { ColumnStat } from "./ColumnStat";

export const Stats = () => {
  const [currentStat, setCurrentStat] = useState<keyof typeof stats | null>(
    null
  );

  return (
    <div className={cls.main}>
      {currentStat === null && (
        <ChooseStatsPage set={(s) => setCurrentStat(s)} />
      )}

      {currentStat === stats.column && <ColumnStat />}
    </div>
  );
};

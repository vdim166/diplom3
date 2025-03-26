import { stats } from "../../../consts";
import cls from "./styles.module.scss";

export const ChooseStatsPage = ({
  set,
}: {
  set: (s: keyof typeof stats) => void;
}) => {
  return (
    <div className={cls.main}>
      <h1>Выберите</h1>

      <div className={cls.options}>
        <div className={cls.option} onClick={() => set(stats.column)}>
          Столбчатая
        </div>
      </div>
    </div>
  );
};

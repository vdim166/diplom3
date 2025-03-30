import React from "react";
import styles from "./styles.module.scss";

interface NumberAnimationProps {
  finalNumber: number;
  duration?: number;
  id: string;
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({
  finalNumber,
  duration = 3,
  id,
}) => {
  const numbers = [finalNumber, ...Array(9).keys()].map((num, index) => (
    <span key={num + id + index}>
      <p>{num}</p>
    </span>
  ));

  return (
    <div className={styles.numberContainer}>
      <div
        className={styles.numberRoll}
        style={
          { "--animation-duration": `${duration}s` } as React.CSSProperties
        }
      >
        {numbers}
      </div>
    </div>
  );
};

export default NumberAnimation;

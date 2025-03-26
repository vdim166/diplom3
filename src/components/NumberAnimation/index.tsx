import React from "react";
import styles from "./styles.module.scss";

interface NumberAnimationProps {
  finalNumber: number;
  duration?: number;
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({
  finalNumber,
  duration = 3,
}) => {
  const numbers = [finalNumber, ...Array(10).keys()].map((num) => (
    <span key={num}>
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

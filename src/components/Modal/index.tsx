import { ReactNode } from "react";
import cls from "./styles.module.scss";

type ModalProps = {
  children: ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className={cls.modalBg}>
      <div className={cls.modalContent}>{children}</div>
    </div>
  );
};

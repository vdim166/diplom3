import { AnswerType } from "../../pages/ForManager";

export type TypeForModal = {
  closeModal: () => void;
  setAnswer: (answer: AnswerType) => void;
};

export type KeyValueType = {
  key: string;
  value: string;
};

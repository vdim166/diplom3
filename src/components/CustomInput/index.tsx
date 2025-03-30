import cls from "./styles.module.scss";

type CustomInputProps = {
  text?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomInput = ({ text, value, onChange }: CustomInputProps) => {
  return (
    <div className={cls.main}>
      {text && <p>{text}</p>}
      <input className={cls.input} value={value} onChange={onChange} />
    </div>
  );
};

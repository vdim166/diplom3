import cls from "./styles.module.scss";

type CustomButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const CustomButton = ({
  text,
  onClick,
  disabled,
}: CustomButtonProps) => {
  return (
    <div className={cls.main}>
      <button className={cls.button} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

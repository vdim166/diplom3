import cls from "./styles.module.scss";

export const Input = ({
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return <input {...props} className={cls.main} />;
};

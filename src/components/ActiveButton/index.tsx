import cls from "./styles.module.scss";

export const ActiveButton = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement & { children: React.ReactNode }
>) => {
  return (
    <button className={cls.button} {...props}>
      {children}
    </button>
  );
};

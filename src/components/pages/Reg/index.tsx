import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../../CustomButton";
import { CustomInput } from "../../CustomInput";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";
import { useState } from "react";

export const Reg = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const n = useNavigate();

  const handleReg = async () => {
    if (password !== password2) {
      return;
    }

    setDisabled(true);
    try {
      const response = await backendApi.register(login, password);

      if (response.ok) {
        n("/auth/login");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className={cls.main}>
      <h1>Зарегестрироваться</h1>
      <div className={cls.form}>
        <CustomInput
          text="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <CustomInput
          text="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomInput
          text="Повторите пароль"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <Link className={cls.link} to="/auth/login">
          <div>
            <p>Войти</p>
          </div>
        </Link>

        <CustomButton
          text="Зарегистрировать"
          onClick={handleReg}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

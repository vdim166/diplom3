import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../../CustomButton";
import { CustomInput } from "../../CustomInput";
import cls from "./styles.module.scss";
import { backendApi } from "../../utils/backendApi";
import { useState } from "react";
import logo from "../../shared/images/istorage.png";

export const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [disable, setDisable] = useState<boolean>(false);

  const n = useNavigate();

  const handleLogin = async () => {
    setDisable(true);
    try {
      const response = await backendApi.getToken(login, password);

      if (response.ok) {
        const data: { access_token: string } = await response.json();

        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          n("/");
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setDisable(false);
    }
  };

  return (
    <div className={cls.main}>
      <div className={cls.logo}>
        <img src={logo} />
        <p>IStorage</p>
      </div>
      <h1>Войти в приложение</h1>

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

        <Link className={cls.link} to="/auth/registration">
          <div>
            <p>Зарегистрироваться</p>
          </div>
        </Link>

        <CustomButton text="Войти" onClick={handleLogin} disabled={disable} />
      </div>
    </div>
  );
};

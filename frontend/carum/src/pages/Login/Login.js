import Button from "../../components/Button";
import logoWithName from "../../assets/logoWithName.png";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "apis/user";

function Login() {
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();

  const loginSuccess = (res) => {
    sessionStorage.setItem("access-token", res.data["accessToken"]);
    sessionStorage.setItem("refresh-token", res.data["refreshToken"]);
    setLoginFailed(false);
    navigate("/");
  };

  const loginFail = (err) => {
    console.log(err);
    setLoginFailed(true);
    setValues({ ...values, password: "" });
  };

  const handleLogin = () => {
    if (values.id && values.password) {
      const payload = {
        id: values.id,
        password: values.password,
      };
      login(payload, loginSuccess, loginFail);
    } else {
      setLoginFailed(true);
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logoImg} src={logoWithName} alt="logo"></img>
      </header>
      <div className={styles.content}>
        <img className={styles.contentImg}></img>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="id">
            아이디
          </label>
          <input
            className={styles.inputBox}
            value={values.id}
            id="id"
            type="text"
            onChange={handleChange("id")}
            required
          />
          <label className={styles.inputLabel} htmlFor="password">
            비밀번호
          </label>
          <input
            className={styles.inputBox}
            type="password"
            value={values.password}
            id="password"
            onChange={handleChange("password")}
            required
            onKeyDown={handleEnter}
          />
        </div>
        {loginFailed ? (
          <p className={styles.loginFailedMessage}>
            아이디 / 비밀번호를 다시 입력해주세요.
          </p>
        ) : null}
        <div className={styles.buttonBox}>
          <Button
            text="회원가입"
            variant="XXLight"
            size="small"
            onClick={() => goToSignup()}
          />
          <Button
            text="로그인"
            variant="extraLight"
            size="small"
            onClick={() => handleLogin()}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

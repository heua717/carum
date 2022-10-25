import Button from "../../components/Button";
import logoWithName from "../../assets/logoWithName.png";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const login = () => {
    navigate("/main");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
          />
        </div>
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
            onClick={() => login()}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

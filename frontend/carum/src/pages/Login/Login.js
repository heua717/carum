import Button from "../../components/Button";
import logoWithName from "../../assets/logoWithName.png";
import styles from "./Login.module.css";
import { useState } from "react";

function Login() {
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

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
          <label className={styles.inputLabel} for="id">
            아이디
          </label>
          <input className={styles.inputBox} value={values.id} id="id" />
          <label className={styles.inputLabel} for="password">
            비밀번호
          </label>
          <input
            className={styles.inputBox}
            type="password"
            value={values.password}
            id="password"
          />
        </div>
        <div className={styles.buttonBox}>
          <Button text="로그인" variant="extraLight" size="small" />
          <Button text="회원가입" variant="XXLight" size="small" />
        </div>
      </div>
    </div>
  );
}

export default Login;

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../components/Button";
import styles from "./Signup.module.css"
import { useState } from "react";

function Signup() {
  const [values, setValues] = useState({
    id: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    isPhoneChecked: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value})
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>회원가입</span>
      </div>
      <TextField 
        className={styles.input} 
        required 
        label="아이디" 
        id="outlined-required" 
        value={values.id} 
        onChange={handleChange('id')} 
      />
      <TextField 
        className={styles.input} 
        required 
        label="닉네임" 
        id="outlined-required"
        value={values.nickname}
        onChange={handleChange('nickname')}
      />
      <input 
        type="date" 
        data-placeholder="생년월일 *" 
        className={styles.dateInput} 
        required
      />
      <TextField 
        className={styles.input} 
        type="password" 
        required 
        label="비밀번호" 
        id="outlined-adornment-password" 
        value={values.password} 
        onChange={handleChange('password')}
      />
      <TextField
        className={styles.input} 
        type="password" 
        required 
        label="비밀번호 확인" 
        id="outlined-adornment-password" 
        value={values.passwordConfirm} 
        onChange={handleChange('passwordConfirm')}
        error={ values.password && values.passwordConfirm && values.password !== values.passwordConfirm}
      />
      <div className={styles.phoneCheck}>
        <Checkbox color="secondary" disabled checked={values.isPhoneChecked} />
        <Button size={"medium"} variant={"XXLight"} text={"휴대폰 인증"} />
      </div>
      <Button size={"big"} variant={"primary"} text={"가입"} />
    </div>
  );
}

export default Signup;

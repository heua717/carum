import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../components/Button";
import styles from "./Signup.module.css";
import { useCallback, useEffect, useState } from "react";
import { checkValidId, checkValidNickname } from "apis/user";
import PhoneCheck from "./PhoneCheck";
import { signup } from "apis/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "stores/store";
import { setCurPage } from "stores/slices/page";

function Signup() {
  const [values, setValues] = useState({
    id: "",
    isIdInvalid: null,
    idHelperText: "",
    nickname: "",
    nicknameHelperText: "",
    isNicknameInvalid: null,
    birthDate: "",
    password: "",
    passwordConfirm: "",
    passwordConfirmHelperText: "비밀번호가 다릅니다.",
    isPhoneCheckModalOpened: false,
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [checkCodeString, setCheckCodeString] = useState(null);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const dispatch = useAppDispatch();

  const changePage = useCallback(() => {
    dispatch(setCurPage("signup"));
  }, [dispatch]);

  useEffect(() => {
    changePage();
  }, []);

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const checkValidIdSuccess = (res) => {
    console.log(res);
    if (res.status === 200) {
      setValues({
        ...values,
        isIdInvalid: false,
        idHelperText: "사용 가능한 아이디입니다.",
      });
    }
  };

  const checkValidIdFail = (err) => {
    setValues({
      ...values,
      isIdInvalid: true,
      idHelperText: "중복된 아이디입니다.",
    });
  };

  const handleIdCheck = () => {
    const idCheck = /^[a-zA-Z0-9]{1,20}$/g;

    if (values.id === "") {
      setValues({
        ...values,
        isIdInvalid: true,
        idHelperText: "아이디는 필수로 입력해야 합니다.",
      });
    } else if (values.id.length > 20) {
      setValues({
        ...values,
        isIdInvalid: true,
        idHelperText: "아이디는 최대 20자까지 가능합니다.",
      });
    } else if (!idCheck.test(values.id)) {
      setValues({
        ...values,
        isIdInvalid: true,
        idHelperText: "아이디에는 영문 및 숫자만 포함될 수 있습니다.",
      });
    } else {
      checkValidId(values.id, checkValidIdSuccess, checkValidIdFail);
    }
  };

  const checkValidNicknameSuccess = (res) => {
    if (res.status === 200) {
      setValues({
        ...values,
        isNicknameInvalid: false,
        nicknameHelperText: "사용 가능한 닉네임입니다.",
      });
    }
  };

  const checkValidNicknameFail = (err) => {
    setValues({
      ...values,
      isNicknameInvalid: true,
      nicknameHelperText: "중복된 닉네임입니다.",
    });
  };

  const handleNicknameCheck = () => {
    if (values.nickname === "") {
      setValues({
        ...values,
        isNicknameInvalid: true,
        nicknameHelperText: "닉네임은 필수로 입력해야 합니다.",
      });
    } else if (values.nickname.length > 30) {
      setValues({
        ...values,
        isNicknameInvalid: true,
        nicknameHelperText: "닉네임은 최대 30자까지 가능합니다.",
      });
    } else {
      checkValidNickname(
        values.nickname,
        checkValidNicknameSuccess,
        checkValidNicknameFail
      );
    }
  };

  const handlePasswordCheck = () => {
    const passwordCheck =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/g;
    if (values.password === "") {
      setPasswordIsInvalid(true);
      setPasswordHelperText("비밀번호는 필수로 입력해야 합니다.");
    } else if (!passwordCheck.test(values.password)) {
      setPasswordIsInvalid(true);
      setPasswordHelperText(
        "비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다."
      );
    } else if (values.password.length < 8 || values.password.length > 20) {
      setPasswordIsInvalid(true);
      setPasswordHelperText("비밀번호는 8~20자 사이로 입력해야 합니다.");
    } else {
      setPasswordIsInvalid(false);
      setPasswordHelperText("");
    }
  };

  const handlePhoneCheckModal = () => {
    if (!values.isPhoneChecked && !values.isPhoneCheckModalOpened) {
      setValues({ ...values, isPhoneCheckModalOpened: true });
    }
  };

  const closePhoneCheckModal = () => {
    setValues({ ...values, isPhoneCheckModalOpened: false });
  };

  // 회원가입
  const signupSuccess = (res) => {
    console.log(res);
    Swal.fire({
      showConfirmButton: false,
      title: "가입되었습니다!",
      icon: "success",
      timer: 800,
    });
  };

  const signupFail = (err) => {
    console.log(err);
  };

  const handleSignup = () => {
    if (
      !values.isNicknameInvalid &&
      !values.isIdInvalid &&
      values.password &&
      values.password === values.passwordConfirm &&
      isPhoneChecked
    ) {
      const payload = {
        nickname: values.nickname,
        userId: values.id,
        password: values.password,
        date: values.birthDate,
        phone: phoneNumber,
        code: checkCodeString,
      };
      signup(payload, signupSuccess, signupFail);
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>회원가입</span>
      </div>
      <TextField
        className={styles.input}
        required
        label="아이디"
        id="outlined-required-id"
        value={values.id}
        onChange={handleChange("id")}
        onBlur={handleIdCheck}
        helperText={values.idHelperText}
        error={values.isIdInvalid}
      />
      <TextField
        className={styles.input}
        required
        label="닉네임"
        id="outlined-required-nickname"
        value={values.nickname}
        onChange={handleChange("nickname")}
        helperText={values.nicknameHelperText}
        onBlur={handleNicknameCheck}
        error={values.isNicknameInvalid}
      />
      <input
        type="date"
        data-placeholder="생년월일 *"
        className={styles.dateInput}
        required
        value={values.birthDate}
        onChange={(event) =>
          setValues({ ...values, birthDate: event.target.value })
        }
      />
      <TextField
        className={styles.input}
        type="password"
        required
        label="비밀번호"
        id="outlined-adornment-password"
        value={values.password}
        onChange={handleChange("password")}
        error={passwordIsInvalid}
        helperText={passwordHelperText}
        onBlur={handlePasswordCheck}
      />
      <TextField
        className={styles.input}
        type="password"
        required
        label="비밀번호 확인"
        id="outlined-adornment-password-confirm"
        value={values.passwordConfirm}
        onChange={handleChange("passwordConfirm")}
        error={Boolean(
          values.password &&
            values.passwordConfirm &&
            values.password !== values.passwordConfirm
        )}
        helperText={
          Boolean(
            values.password &&
              values.passwordConfirm &&
              values.password !== values.passwordConfirm
          )
            ? values.passwordConfirmHelperText
            : null
        }
      />
      <div className={styles.phoneCheck}>
        <Checkbox
          color={isPhoneChecked ? "success" : "default"}
          disabled
          checked={isPhoneChecked}
        />
        <Button
          size={"medium"}
          variant={"XXLight"}
          text={"휴대폰 인증"}
          onClick={handlePhoneCheckModal}
          disabled={isPhoneChecked}
        />
      </div>
      <Button
        onClick={handleSignup}
        size={"big"}
        variant={"primary"}
        text={"가입"}
      />
      <Button
        size={"big"}
        variant={"extraLight"}
        text={"로그인으로"}
        onClick={() => navigate("/")}
      />
      <PhoneCheck
        phoneNo={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        open={values.isPhoneCheckModalOpened}
        handleClose={closePhoneCheckModal}
        setIsPhoneChecked={setIsPhoneChecked}
        setCheckCodeString={setCheckCodeString}
      />
    </div>
  );
}

export default Signup;

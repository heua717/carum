import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { phoneCertificate } from "apis/user";
import { TextField } from "@mui/material";
import styles from "./PhoneCheck.module.css";

function PhoneCheck({
  open,
  handleClose,
  phoneNo,
  setPhoneNumber,
  setIsPhoneChecked,
}) {
  const [checkCode, setCheckCode] = useState(null);
  const [checkTime, setCheckTime] = useState(180);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const phoneCertificateSuccess = (res) => {
    setCheckCode(res.data.code);
  };

  const phoneCertificateFail = (err) => {
    console.log(err);
  };

  // 타이머
  useEffect(() => {
    if (checkCode && parseInt(checkTime) === 180) {
      setCheckTime(parseInt(checkTime) - 1);
    }
  }, [checkCode]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(checkTime) < 180 && parseInt(checkTime) > 0) {
        setCheckTime(parseInt(checkTime) - 1);
      } else if (parseInt(checkTime) === 0) {
        setCheckCode(null);
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [checkTime]);

  // 폰 인증 확인
  const phoneCheck = () => {
    if (checkCode && checkCode === codeInput) {
      setIsPhoneChecked(true);
      setCheckTime(180);
      setCheckCode(null);
      handleClose();
    } else {
      setCodeError(true);
    }
  };

  return (
    <Dialog open={open}>
      <div className={styles.dialog}>
        <DialogTitle>문자(SMS)로 인증</DialogTitle>
        <p className={styles.helpText}>
          문자를 받지 못했다면 재인증을 눌러주세요.
        </p>
        <input
          onChange={handleChange}
          type="tel"
          placeholder="'-'없이 숫자만 입력"
          value={phoneNo}
          className={styles.phoneNumberInput}
        />
        <Button
          onClick={() => {
            if (!!checkCode) {
              setCheckTime(179);
            }
            phoneCertificate(
              phoneNo,
              phoneCertificateSuccess,
              phoneCertificateFail
            );
          }}
          variant="contained"
          color="secondary"
        >
          {!!checkCode ? "재인증" : "인증 번호 받기"}
        </Button>
        {checkCode ? (
          <div className={styles.codeChecking}>
            <div>
              <div className={styles.codeCheckBox}>
                <TextField
                  label="인증번호"
                  placeholder="숫자 6자리 입력"
                  size="small"
                  value={codeInput}
                  onChange={(event) => setCodeInput(event.target.value)}
                  error={codeError}
                  helperText={codeError ? "인증 번호가 다릅니다" : null}
                />
                <p>{`${parseInt(checkTime / 60)} : ${
                  checkTime % 60 < 9 ? `0` : ""
                }${checkTime % 60}`}</p>
              </div>
            </div>
            <Button
              onClick={phoneCheck}
              fullWidth={true}
              variant="contained"
              disabled={!checkCode}
            >
              확인
            </Button>
          </div>
        ) : null}
      </div>
    </Dialog>
  );
}

export default PhoneCheck;

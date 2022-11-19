import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { phoneCertificate } from "apis/user";
import { TextField } from "@mui/material";
import styles from "./PhoneCheck.module.css";
import { Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function PhoneCheck({
  open,
  handleClose,
  phoneNo,
  setPhoneNumber,
  setIsPhoneChecked,
  setCheckCodeString,
}) {
  const [checkCode, setCheckCode] = useState(null);
  const [checkTime, setCheckTime] = useState(180);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = useState(null);
  const [isPrivacyPolicyShowing, setIsPrivacyPolicyShowing] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const phoneCertificateSuccess = (res) => {
    setCheckCode(res.data.code);
    setPhoneNumberError(false);
  };

  const phoneCertificateFail = (err) => {
    setPhoneNumberError(true);
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
        setCheckTime(180);
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [checkTime]);

  // 폰 인증 확인
  const phoneCheck = () => {
    if (checkCode && checkCode === codeInput && isPrivacyPolicyAgreed) {
      setIsPhoneChecked(true);
      setCheckTime(180);
      setCheckCode(null);
      setCheckCodeString(String(checkCode));
      handleClose();
    } else {
      if (checkCode !== codeInput) {
        setCodeError(true);
      } else if (!isPrivacyPolicyAgreed) {
        setIsPrivacyPolicyAgreed(false);
      }
    }
  };

  // 휴대폰 인증 안 하고 모달 닫을 때
  const closeModal = () => {
    setCheckCode(null);
    setCheckTime(180);
    setCodeInput("");
    setCodeError(false);
    setIsPrivacyPolicyAgreed(null);
    setIsPrivacyPolicyShowing(false);
    setPhoneNumberError(false);
    setPhoneNumber("");
    handleClose();
  };

  return (
    <Dialog open={open}>
      <div className={styles.dialog}>
        <CloseIcon onClick={closeModal} sx={{ alignSelf: "flex-end" }} />
        <h2>문자(SMS)로 인증</h2>
        <div className={styles.privacyPolicyCheckBox}>
          <Checkbox
            onChange={(e) => setIsPrivacyPolicyAgreed(e.target.checked)}
          />
          <p
            onClick={() => setIsPrivacyPolicyShowing(!isPrivacyPolicyShowing)}
            className={styles.privacyPolicyText}
          >
            개인정보 수집 및 이용 동의(필수)
          </p>
        </div>
        {isPrivacyPolicyAgreed !== null && !isPrivacyPolicyAgreed ? (
          <p className={styles.errorText}>
            개인정보 수집 및 이용 동의에 체크해주세요.
          </p>
        ) : null}
        {isPrivacyPolicyShowing ? (
          <div className={styles.privacyPolicyBox}>
            <p className={styles.privacyPolicyText}>
              회원 가입을 위해서 아래와 같이 개인 정보를 수집 및 이용합니다.
            </p>
            <br />
            <p className={styles.privacyPolicyText}>
              1. 개인정보 수집 목적: 회원 관리
            </p>
            <p className={styles.privacyPolicyText}>
              2. 개인정보 수집 항목: 생년월일, 전화번호
            </p>
            <p className={styles.privacyPolicyText}>
              3. 보유 및 이용기간: 회원 탈퇴시까지
            </p>
            <br />
            <p className={styles.privacyPolicyText}>
              * 개인정보 수집 및 이용에 동의하지 않을 권리가 있으며, 동의를
              거부할 경우에는 회원가입이 불가합니다.
            </p>
          </div>
        ) : null}
        {checkCode ? (
          <p className={styles.helpText}>
            문자를 받지 못했다면 재인증을 눌러주세요.
          </p>
        ) : null}
        {phoneNumberError ? (
          <p className={styles.errorText}>휴대폰 번호를 다시 입력해주세요.</p>
        ) : null}
        <input
          onChange={handleChange}
          type="tel"
          placeholder="'-'없이 숫자만 입력"
          value={phoneNo}
          className={`${styles.phoneNumberInput} ${
            phoneNumberError ? styles.errorInputBox : null
          }`}
        />
        <Button
          onClick={() => {
            if (!isPrivacyPolicyAgreed) {
              setIsPrivacyPolicyAgreed(false);
            } else {
              if (!!checkCode) {
                setCheckTime(179);
              }

              phoneCertificate(
                phoneNo,
                phoneCertificateSuccess,
                phoneCertificateFail
              );
            }
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
                <input
                  placeholder="숫자 6자리 입력"
                  value={codeInput}
                  onChange={(event) => setCodeInput(event.target.value)}
                  className={`${styles.codeCheckInput} ${
                    codeError ? styles.errorInputBox : null
                  }`}
                />
                <p>{`${parseInt(checkTime / 60)} : ${
                  checkTime % 60 < 10 ? `0` : ""
                }${checkTime % 60}`}</p>
              </div>
            </div>
            {codeError ? (
              <p className={styles.errorText}>인증번호가 다릅니다.</p>
            ) : null}
            <Button
              onClick={phoneCheck}
              fullWidth={true}
              variant="contained"
              disabled={!checkCode}
              sx={{ margin: "8px 0" }}
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

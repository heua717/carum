import styles from "./Profile.module.css";
import TopNav from "../../components/TopNav";
import Button from "../../components/Button";
import { TextField } from "@mui/material";
import { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";

function Profile() {
  const [values, setValues] = useState({
    userInfo: "",
    isEditing: false,
    newNickname: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const editNickname = () => {
    setValues({ ...values, isEditing: false });
  };

  return (
    <div>
      <TopNav text="내 정보" />
      <div className={styles.container}>
        <span className={styles.id}>아이디</span>
        <p className={styles.settingTag}>닉네임</p>
        {values.isEditing ? (
          <div className={styles.nicknameEditbox}>
            <TextField size="small" className={styles.inputBox} />
            <div className={styles.editButton}>
              <Button
                text="닉네임 수정"
                variant="primary"
                size="small"
                onClick={() => editNickname()}
              />
            </div>
          </div>
        ) : (
          <div className={styles.nicknameSettingBox}>
            <span className={styles.nickname}>닉네임</span>
            <EditIcon
              onClick={() => setValues({ ...values, isEditing: true })}
            />
          </div>
        )}
        <div>
          <p className={styles.settingTag}>새 비밀번호</p>
          <TextField size="small" className={styles.inputBox} />
        </div>
        <div>
          <p className={styles.settingTag}>새 비밀번호 확인</p>
          <TextField size="small" className={styles.inputBox} />
        </div>
        <div className={styles.editButton}>
          <Button text="비밀번호 수정" variant="primary" size="small" />
        </div>
      </div>
    </div>
  );
}

export default Profile;

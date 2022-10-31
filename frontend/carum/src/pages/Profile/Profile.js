import styles from "./Profile.module.css";
import TopNav from "../../components/TopNav";
import Button from "../../components/Button";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Button as MUIButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import {
  logout,
  deleteAccount,
  fetchProfile,
  checkValidNickname,
} from "apis/user";

function Profile() {
  const [values, setValues] = useState({
    userInfo: null,
    isEditing: false,
    newNickname: "",
    newPassword: "",
    newPasswordConfirm: "",
    isDeleting: false,
  });

  const navigate = useNavigate();

  const editNickname = () => {
    setValues({ ...values, isEditing: false });
  };

  // 회원 정보 조회

  const fetchProfileSuccess = (res) => {
    console.log(res);
    const userInfo = {
      nickname: res.data.nickName,
      id: res.data.userId,
      birth: res.data.birth,
      phone: res.data.phone,
      money: res.data.money,
      mainRoom: res.data.mainRoom,
    };
    setValues({ ...values, userInfo });
  };

  const fetchProfileFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    fetchProfile(fetchProfileSuccess, fetchProfileFail);
  }, []);

  // 닉네임 수정
  const editNicknameSuccess = (res) => {
    console.log(res);
    setValues({ ...values });
  };

  const editNicknameFail = () => {};

  const handleEditNickname = () => {};

  // 로그아웃
  const logoutSuccess = (res) => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    navigate("/");
  };

  const logoutFail = (err) => {
    console.log(err);
  };

  const handleLogout = () => {
    logout(logoutSuccess, logoutFail);
  };

  // 회원 탈퇴
  const deleteAccountSuccess = (res) => {
    console.log(res);
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    navigate("/");
  };

  const deleteAccountFail = (err) => {
    console.log(err);
  };
  const handleDeleteAccount = () => {
    deleteAccount(deleteAccountSuccess, deleteAccountFail);
  };

  // 회원 탈퇴 dialog 열고 닫기
  const deleteDialogOpen = () => {
    setValues({ ...values, isDeleting: true });
  };

  const deleteDialogClose = () => {
    setValues({ ...values, isDeleting: false });
  };

  return (
    <div>
      <TopNav text="내 정보" />
      <div className={styles.container}>
        <p className={styles.id}>{values.userInfo.id}</p>
        <p className={styles.settingTag}>닉네임</p>
        {values.isEditing ? (
          <div className={styles.nicknameEditbox}>
            <TextField
              size="small"
              className={styles.inputBox}
              value={values.userInfo.nickname}
            />
            <div className={styles.editButton}>
              <div></div>
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
            <span className={styles.nickname}>{values.userInfo.nickname}</span>
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
          <div></div>
          <Button text="비밀번호 수정" variant="primary" size="small" />
        </div>
        <div className={styles.buttonBox}>
          <MUIButton
            onClick={deleteDialogOpen}
            variant="contained"
            color="error"
          >
            회원탈퇴
          </MUIButton>
          <MUIButton onClick={handleLogout} variant="contained" color="info">
            로그아웃
          </MUIButton>
        </div>
      </div>
      <Dialog open={values.isDeleting}>
        <div className={styles.deleteDialog}>
          <DialogTitle>Carum에서 탈퇴하시겠습니까?</DialogTitle>
          <div className={styles.dialogBtnBox}>
            <MUIButton
              variant="contained"
              onClick={handleDeleteAccount}
              color="error"
            >
              예
            </MUIButton>
            <MUIButton variant="contained" onClick={deleteDialogClose}>
              아니요
            </MUIButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Profile;

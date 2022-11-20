import api from "./api";

const checkValidId = (id, success, fail) => {
  api
    .get(`/user/userid`, {
      params: {
        userId: id,
      },
    })
    .then(success)
    .catch(fail);
};

const checkValidNickname = (nickname, success, fail) => {
  api
    .get(`/user/nickname`, {
      params: {
        nickName: nickname,
      },
    })
    .then(success)
    .catch(fail);
};

const phoneCertificate = (phoneNo, success, fail) => {
  api
    .post(`/sms`, {
      phoneNo: phoneNo,
    })
    .then(success)
    .catch(fail);
};

const signup = (
  { nickName, userId, password, birth, phone, code },
  success,
  fail
) => {
  api
    .post(`/user`, {
      nickName,
      userId,
      password,
      birth,
      phone,
      code,
    })
    .then(success)
    .catch(fail);
};

const login = (payload, success, fail) => {
  api
    .post("user/login", {
      userId: payload.id,
      password: payload.password,
    })
    .then(success)
    .catch(fail);
};

const logout = (success, fail) => {
  api.post("/user/logout").then(success).catch(fail);
};

const deleteAccount = (success, fail) => {
  api.delete("/user").then(success).catch(fail);
};

const fetchProfile = (success, fail) => {
  api.get("/user").then(success).catch(fail);
};

const editNickname = (newNickname, success, fail) => {
  api
    .patch("/user", {
      nickName: newNickname,
    })
    .then(success)
    .catch(fail);
};

const changePassword = ({ oldPassword, newPassword }, success, fail) => {
  api
    .patch("/user/password", {
      oldPassword,
      newPassword,
    })
    .then(success)
    .catch(fail);
};

export {
  checkValidId,
  checkValidNickname,
  phoneCertificate,
  signup,
  login,
  logout,
  deleteAccount,
  fetchProfile,
  editNickname,
  changePassword,
};

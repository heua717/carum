import api from "./api";

const checkValidId = (id, success, fail) => {
  api
    .get(`/user/userid`, {
      userid: id,
    })
    .then(success)
    .catch(fail);
};

const checkValidNickname = (nickname, success, fail) => {
  api
    .get(`/user/nickname`, {
      nickname: nickname,
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

const signup = (payload, success, fail) => {
  api
    .post(`/user`, {
      nickName: payload.nickname,
      userId: payload.userId,
      password: payload.password,
      birth: payload.date,
      phone: payload.phoneNumber,
    })
    .then(success)
    .catch(fail);
};

export { checkValidId, checkValidNickname, phoneCertificate, signup };

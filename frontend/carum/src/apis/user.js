import api from './api'

const checkValidId = (id, success, fail) => {
  api.get(`/user/userid`, {
    userid: id
  })
  .then(success)
  .catch(fail)
}

const checkValidNickname = (nickname, success, fail) => {
  api.get(`/user/nickname`, {
    nickname: nickname
  })
  .then(success)
  .catch(fail)
}

export {
  checkValidId,
  checkValidNickname
}
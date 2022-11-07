import api from "./api";

const fetchRoomList = (tags, success, fail) => {
  api
    .get("/room", {
      params: {
        tags,
      },
    })
    .then(success)
    .catch(fail);
};

const editRoomInfo = ({ roomId, name, emotionTags }, success, fail) => {
  api
    .patch(`/room/${roomId}`, {
      name,
      emotionTags,
    })
    .then(success)
    .catch(fail);
};

const changeMainRoom = (roomId, success, fail) => {
  api
    .put(`/room/main`, {
      roomId,
    })
    .then(success)
    .catch(fail);
};

export { fetchRoomList, editRoomInfo, changeMainRoom };

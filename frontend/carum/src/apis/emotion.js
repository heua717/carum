import api from "./api";

const fetchUserEmotion = (success, fail) => {
  api.get("/emotion").then(success).catch(fail);
};

export { fetchUserEmotion };

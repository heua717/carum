import api from "./api";

const writeDiary = ({ content, emotionTag, background }, success, fail) => {
  api
    .post("/diary", {
      content,
      emotionTag,
      background,
    })
    .then(success)
    .catch(fail);
};

const fetchCalendar = ({ year, month, day }, success, fail) => {
  api
    .get("/diary", {
      params: {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
      },
    })
    .then(success)
    .catch(fail);
};

const fetchDiary = (diaryId, success, fail) => {
  api.get(`/diary/${diaryId}`).then(success).catch(fail);
};

export { writeDiary, fetchCalendar, fetchDiary };

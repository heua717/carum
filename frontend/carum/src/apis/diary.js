import api from "./api";

const writeDiary = ({ content, emotions, background }, success, fail) => {
  api
    .post("/diary", {
      content,
      emotions,
      background,
    })
    .then(success)
    .catch(fail);
};

const fetchCalendar = ({ year, month, day }, success, fail) => {
  api
    .get("/diary/month", {
      params: {
        year,
        month,
        day,
      },
    })
    .then(success)
    .catch(fail);
};

const fetchDiary = (diaryId, success, fail) => {
  api.get(`/diary/${diaryId}`).then(success).catch(fail);
};

export { writeDiary, fetchCalendar, fetchDiary };

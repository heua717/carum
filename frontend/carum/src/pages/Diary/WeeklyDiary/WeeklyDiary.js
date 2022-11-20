import styles from "./WeeklyDiary.module.css";
import DayComponent from "./DayComponent";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { changeWeeklyDate } from "utils/utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCalendar } from "apis/diary";
import { errorAlert } from "utils/utils";

function WeeklyDiary({ weeklyStartDate, setActiveStartDate, activeStartDate }) {
  const [diaryList, setDiaryList] = useState([]);

  const fetchCalendarSuccess = (res) => {
    console.log(res);
    console.log("주간");
    setDiaryList(res.data.diaryList);
  };

  const fetchCalendarFail = (err) => {
    console.log(err);
    errorAlert("주간 다이어리를 읽을 수 없습니다");
    navigate("/");
  };

  const prev = () => {
    setActiveStartDate(new Date(changeWeeklyDate(weeklyStartDate, "dec", 7)));
  };

  const next = () => {
    if (new Date(changeWeeklyDate(weeklyStartDate, "inc", 6)) < new Date()) {
      setActiveStartDate(new Date(changeWeeklyDate(weeklyStartDate, "inc", 7)));
    }
  };

  const navigate = useNavigate();

  const readDiary = (id) => {
    navigate(`/diary/${id}`);
  };

  useEffect(() => {
    const payload = {
      year: parseInt(moment(activeStartDate).format("YYYY")),
      month: parseInt(moment(activeStartDate).format("M")),
      day: parseInt(weeklyStartDate.split("-")[2]),
    };

    fetchCalendar(payload, fetchCalendarSuccess, fetchCalendarFail);
  }, [weeklyStartDate]);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <KeyboardArrowLeftIcon onClick={() => prev()} />
        <p>
          {weeklyStartDate} ~ {changeWeeklyDate(weeklyStartDate, "inc", 6)}
        </p>
        <KeyboardArrowRightIcon
          sx={{
            color:
              new Date(changeWeeklyDate(weeklyStartDate, "inc", 6)) < new Date()
                ? "black"
                : "#BFBFBF",
          }}
          onClick={() => next()}
        />
      </div>
      {diaryList?.length !== 0 ? (
        diaryList?.map((e) => (
          <DayComponent
            emotion={e.emotionTag}
            date={e.createDate}
            id={e.id}
            key={e.id}
            onClick={() => {
              readDiary(e.id);
            }}
          />
        ))
      ) : (
        <p className={styles.noDataText}>일기가 없습니다.</p>
      )}
    </div>
  );
}

export default WeeklyDiary;

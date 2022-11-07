import styles from "./WeeklyDiary.module.css";
import DayComponent from "./DayComponent";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { changeWeeklyDate } from "utils/utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function WeeklyDiary({ diaryList, weeklyStartDate, setActiveStartDate }) {
  const prev = () => {
    setActiveStartDate(new Date(changeWeeklyDate(weeklyStartDate, "dec", 7)));
  };

  const next = () => {
    if (
      changeWeeklyDate(weeklyStartDate, "inc", 6) <
      moment(new Date()).format("YYYY-M-D")
    ) {
      setActiveStartDate(new Date(changeWeeklyDate(weeklyStartDate, "inc", 7)));
    }
  };

  const navigate = useNavigate();

  const readDiary = (id) => {
    navigate(`/main/diary/${id}`);
  };

  return (
    <div>
      <div className={styles.nav}>
        <KeyboardArrowLeftIcon onClick={() => prev()} />
        <p>
          {weeklyStartDate} ~ {changeWeeklyDate(weeklyStartDate, "inc", 6)}
        </p>
        <KeyboardArrowRightIcon onClick={() => next()} />
      </div>
      {diaryList.length !== 0 ? (
        diaryList.map((e) => (
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
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
}

export default WeeklyDiary;

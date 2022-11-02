import styles from "./WeeklyDiary.module.css";
import DayComponent from "./DayComponent";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { changeWeeklyDate } from "utils/utils";
import moment from "moment";

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

  return (
    <div>
      <div className={styles.nav}>
        <KeyboardArrowLeftIcon onClick={() => prev()} />
        <p>
          {weeklyStartDate} ~ {changeWeeklyDate(weeklyStartDate, "inc", 6)}
        </p>
        <KeyboardArrowRightIcon onClick={() => next()} />
      </div>
      {diaryList.map((e) => (
        <DayComponent emotion={e.emotion} date={e.createAt} />
      ))}
    </div>
  );
}

export default WeeklyDiary;

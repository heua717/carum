import styles from "./WeeklyDiary.module.css";
import DayComponent from "./DayComponent";

function WeeklyDiary({ diaryList }) {
  return (
    <div>
      {diaryList.map((e) => (
        <DayComponent emotion={e.emotion} date={e.createAt} />
      ))}
    </div>
  );
}

export default WeeklyDiary;

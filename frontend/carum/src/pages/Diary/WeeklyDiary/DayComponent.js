import styles from "./DayComponent.module.css";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import moment from "moment";
import { WEEK_DAY } from "utils/utils";

function DayComponent({ emotion, date, id, onClick }) {
  return (
    <div onClick={onClick} className={styles.barContainer}>
      <p className={styles.dateText}>
        {moment(date).format("YYYY-MM-DD")} {WEEK_DAY[new Date(date).getDay()]}
      </p>
      <div className={styles.emotionBox}>
        {emotion.map((e) => (
          <img
            src={
              e === "SAD"
                ? sadImg
                : e === "ANGRY"
                ? angryImg
                : e === "PEACE"
                ? peaceImg
                : e === "WORRY"
                ? worryImg
                : e === "HAPPY"
                ? happyImg
                : e === "SURPRISE"
                ? surpriseImg
                : null
            }
            alt="emotion"
            className={styles.emotionImage}
            key={e}
          />
        ))}
      </div>
    </div>
  );
}

export default DayComponent;

import styles from "./DayComponent.module.css";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import moment from "moment";

function DayComponent({ emotion, date, id, onClick }) {
  return (
    <div onClick={onClick} className={styles.barContainer}>
      <p className={styles.dateText}>{moment(date).format("YYYY-MM-DD")}</p>
      <div className={styles.emotionBox}>
        {emotion.map((e) => (
          <img
            src={
              e === "sad"
                ? sadImg
                : e === "angry"
                ? angryImg
                : e === "peace"
                ? peaceImg
                : e === "worry"
                ? worryImg
                : e === "happy"
                ? happyImg
                : e === "surprise"
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

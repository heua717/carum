import styles from "./DayComponent.module.css";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";

function DayComponent({ emotion, date }) {
  return (
    <div className={styles.barContainer}>
      <p className={styles.dateText}>{date}</p>
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
          />
        ))}
      </div>
    </div>
  );
}

export default DayComponent;

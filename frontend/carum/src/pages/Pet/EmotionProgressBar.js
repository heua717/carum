import styles from "./EmotionProgressBar.module.css";
import sadImg from "../../assets/sad.svg";
import angryImg from "../../assets/angry.svg";
import worryImg from "../../assets/worry.svg";
import happyImg from "../../assets/happy.svg";
import surpriseImg from "../../assets/surprise.svg";
import peaceImg from "../../assets/peace.svg";

function EmotionProgressBar({ emotion, count, maxCount }) {
  return (
    <div className={styles.container}>
      <img
        src={
          emotion === "angry"
            ? angryImg
            : emotion === "sad"
            ? sadImg
            : emotion === "worry"
            ? worryImg
            : emotion === "happy"
            ? happyImg
            : emotion === "peace"
            ? peaceImg
            : surpriseImg
        }
        alt="emotion"
        className={styles.emotionImg}
      />
      <div
        style={{
          backgroundColor: "#E18DAE",
          height: "8px",
          width: `${220 * (count / (maxCount + 1))}px`,
          borderRadius: "4px",
          margin: "0 8px",
        }}
      ></div>
      <span className={styles.count}>{count}</span>
    </div>
  );
}

export default EmotionProgressBar;

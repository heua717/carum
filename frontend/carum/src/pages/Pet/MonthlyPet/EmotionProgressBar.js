import styles from "./EmotionProgressBar.module.css";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";

function EmotionProgressBar({ emotion, count, maxCount }) {
  // 감정별 그래프 색
  const emotionColor = (emotion) => {
    if (emotion === "angry") {
      return "C23C3C";
    } else if (emotion === "sad") {
      return "395796";
    } else if (emotion === "peace") {
      return "5EB88A";
    } else if (emotion === "worry") {
      return "6649AF";
    } else if (emotion === "happy") {
      return "E8CA51";
    } else if (emotion === "surprise") {
      return "E7E7E7";
    }
  };

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
          backgroundColor: `#${emotionColor(emotion)}`,
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

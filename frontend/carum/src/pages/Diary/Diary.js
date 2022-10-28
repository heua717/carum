import styles from "./Diary.module.css";
import TopNav from "../../components/TopNav";
import Button from "../../components/Button";

function Diary() {
  return (
    <div>
      <TopNav text="내 일기" />
      <div className={styles.contentContainer}>
        <div className={styles.emotionBox}></div>
        <div className={styles.contentBox}>
          <p>날짜</p>
          <p>요일</p>
          <p>내용</p>
        </div>
        <div className={styles.buttonBox}>
          <Button text="일기 수정" variant="light" size="small" />
          <Button text="일기 비우기" variant="light" size="small" />
        </div>
      </div>
    </div>
  );
}

export default Diary;

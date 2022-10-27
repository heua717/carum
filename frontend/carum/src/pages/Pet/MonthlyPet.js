import styles from "./MonthlyPet.module.css";
import TopNav from "../../components/TopNav";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useState } from "react";
import EmotionProgressBar from "./EmotionProgressBar";
import sadImg from "../../assets/sad.svg";
import angryImg from "../../assets/angry.svg";
import worryImg from "../../assets/worry.svg";
import happyImg from "../../assets/happy.svg";
import surpriseImg from "../../assets/surprise.svg";
import peaceImg from "../../assets/peace.svg";

function MonthlyPet() {
  const [values, setValues] = useState({
    year: 2022,
    month: 1,
    petInfo: "",
  });

  const setDate = (state) => {
    if (state === "forward") {
      if (values.month === 12) {
        setValues({ ...values, year: values.year + 1, month: 1 });
      } else {
        setValues({ ...values, month: values.month + 1 });
      }
    } else {
      if (values.month === 1) {
        setValues({ ...values, year: values.year - 1, month: 12 });
      } else {
        setValues({ ...values, month: values.month - 1 });
      }
    }
  };

  return (
    <div>
      <TopNav text="펫 조회" />
      <div className={styles.contentContainer}>
        <div className={styles.navigationBar}>
          <ArrowBackIosIcon onClick={() => setDate("back")} />
          <div className={styles.navDate}>
            <p className={styles.year}>{values.year}</p>
            <p className={styles.month}>{values.month}</p>
          </div>
          <ArrowForwardIosIcon onClick={() => setDate("forward")} />
        </div>
        <div className={styles.pet}></div>
        <div
          className={styles.statisticsBox}
          style={{
            backgroundColor: "#FFDFEC",
          }}
        >
          <img className={styles.bestEmotionImage} src={angryImg} />
          <EmotionProgressBar count={9} maxCount={9} />
          <EmotionProgressBar count={7} maxCount={9} />
          <EmotionProgressBar count={4} maxCount={9} />
          <EmotionProgressBar count={4} maxCount={9} />
          <EmotionProgressBar count={3} maxCount={9} />
          <EmotionProgressBar count={1} maxCount={9} />
        </div>
      </div>
    </div>
  );
}

export default MonthlyPet;

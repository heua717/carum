import styles from "./MonthlyPet.module.css";
import TopNav from "components/TopNav";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useState, useEffect } from "react";
import EmotionProgressBar from "./EmotionProgressBar";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import { useParams } from "react-router-dom";
import { fetchMonthlyPet } from "apis/pet";

function MonthlyPet() {
  const { year, month } = useParams();
  const [yearState, setYearState] = useState(year);
  const [monthState, setMonthState] = useState(month);

  // 월별 펫 상태 조회
  const fetchMonthlyPetSuccess = (res) => {
    console.log(res.data);
  };

  const fetchMonthlyPetFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    const payload = {
      year,
      month,
    };
    fetchMonthlyPet(payload, fetchMonthlyPetSuccess, fetchMonthlyPetFail);
  });

  const handleChangeDate = (state) => {
    if (state === "plus") {
    } else if (state === "minus") {
    }
  };

  return (
    <div>
      <TopNav text="펫 조회" />
      <div className={styles.contentContainer}>
        <div className={styles.navigationBar}>
          <ArrowBackIosIcon />
          <div className={styles.navDate}>
            <p className={styles.year}>{yearState}</p>
            <p className={styles.month}>{monthState}</p>
          </div>
          <ArrowForwardIosIcon />
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

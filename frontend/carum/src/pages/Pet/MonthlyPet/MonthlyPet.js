import styles from "./MonthlyPet.module.css";
import TopNav from "components/TopNav";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState, useEffect } from "react";
import EmotionProgressBar from "./EmotionProgressBar";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMonthlyPet } from "apis/pet";
import { preventRefresh, errorAlert } from "utils/utils";
import cryImage from "assets/cry.png";

function MonthlyPet() {
  const { year, month } = useParams();
  const [yearState, setYearState] = useState(year);
  const [monthState, setMonthState] = useState(month);
  const [emotions, setEmotions] = useState(null);

  const navigate = useNavigate();

  const validDate = Boolean(
    yearState < new Date().getFullYear() ||
      (parseInt(yearState) === new Date().getFullYear() &&
        monthState < new Date().getMonth())
  );

  // 월별 펫 상태 조회
  const fetchMonthlyPetSuccess = (res) => {
    console.log(res.data);
    const emotionList = [
      { name: "angry", count: res.data.emotionMap.ANGRY },
      { name: "peace", count: res.data.emotionMap.PEACE },
      { name: "happy", count: res.data.emotionMap.HAPPY },
      { name: "sad", count: res.data.emotionMap.SAD },
      { name: "surprise", count: res.data.emotionMap.SURPRISE },
      { name: "worry", count: res.data.emotionMap.WORRY },
    ];

    emotionList.sort((a, b) => {
      return b.count - a.count;
    });

    setEmotions(emotionList);
  };

  const fetchMonthlyPetFail = (err) => {
    console.log(err);
    setEmotions(null);
    errorAlert("펫을 데려오지 못했어요 ㅠㅠ");
    navigate(-1);
  };

  useEffect(() => {
    const payload = {
      year: yearState,
      month: monthState,
    };
    fetchMonthlyPet(payload, fetchMonthlyPetSuccess, fetchMonthlyPetFail);
  }, [monthState]);

  const handleChangeDate = (state) => {
    let tmpMonth = monthState;
    let tmpYear = yearState;

    if (state === "plus") {
      if (validDate) {
        tmpMonth += 1;
        if (tmpMonth > 12) {
          tmpYear += 1;
          tmpMonth -= 12;
        }
        setMonthState(tmpMonth);
        setYearState(tmpYear);
      }
    } else if (state === "minus") {
      tmpMonth -= 1;
      if (tmpMonth < 1) {
        tmpYear -= 1;
        tmpMonth += 12;
      }
      setYearState(tmpYear);
      setMonthState(tmpMonth);
    }
  };

  // 새로고침 방지
  useEffect(() => {
    window.addEventListener("beforeunload", preventRefresh);
  }, []);

  // 가장 높은 감정 이미지 반환 함수
  const bestEmotion = (emotion) => {
    if (emotion === "angry") {
      return angryImg;
    } else if (emotion === "sad") {
      return sadImg;
    } else if (emotion === "peace") {
      return peaceImg;
    } else if (emotion === "worry") {
      return worryImg;
    } else if (emotion === "happy") {
      return happyImg;
    } else if (emotion === "surprise") {
      return surpriseImg;
    }
  };

  return (
    <div>
      <TopNav text="펫 조회" />
      <div className={styles.navigationBar}>
        <KeyboardArrowLeftIcon onClick={() => handleChangeDate("minus")} />
        <div className={styles.navDate}>
          <p className={styles.year}>{yearState}</p>
          <p className={styles.month}>{monthState}</p>
        </div>
        <KeyboardArrowRightIcon
          onClick={() => handleChangeDate("plus")}
          sx={{
            color: validDate ? "black" : "#BFBFBF",
          }}
        />
      </div>
      {emotions ? (
        <div className={styles.contentContainer}>
          <div className={styles.pet}></div>
          <div className={styles.statisticsBox}>
            <img
              className={styles.bestEmotionImage}
              src={bestEmotion(emotions?.[0].name)}
              alt="emotion"
            />
            {emotions?.map((e) => (
              <EmotionProgressBar
                count={e.count}
                maxCount={emotions?.[0].count}
                emotion={e.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.noData}>
          <img alt="cry" src={cryImage} className={styles.cryImage} />
          <p className={styles.noDataText}>펫이 없어요 ㅠㅠ</p>
        </div>
      )}
    </div>
  );
}

export default MonthlyPet;

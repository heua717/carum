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
import {
  preventRefresh,
  errorAlert,
  goToMain,
  createImageUrl,
} from "utils/utils";
import cryImage from "assets/cry.png";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;

function MonthlyPet() {
  const { year, month } = useParams();
  const [yearState, setYearState] = useState(year);
  const [monthState, setMonthState] = useState(month);
  const [emotions, setEmotions] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [petInformation, setPetInformation] = useState(null);

  const navigate = useNavigate();

  const validDate = Boolean(
    yearState < new Date().getFullYear() ||
      (parseInt(yearState) === new Date().getFullYear() &&
        monthState < new Date().getMonth())
  );

  // 월별 펫 상태 조회
  const fetchMonthlyPetSuccess = (res) => {
    const emotionList = [
      { name: "angry", value: res.data.emotionMap.ANGRY, color: "#C23C3C" },
      { name: "peace", value: res.data.emotionMap.PEACE, color: "#5EB88A" },
      { name: "happy", value: res.data.emotionMap.HAPPY, color: "#E8CA51" },
      { name: "sad", value: res.data.emotionMap.SAD, color: "#395796" },
      {
        name: "surprise",
        value: res.data.emotionMap.SURPRISE,
        color: "#D8D8D8",
      },
      { name: "worry", value: res.data.emotionMap.WORRY, color: "#6649AF" },
    ];

    emotionList.sort((a, b) => {
      return b.value - a.value;
    });

    const pet = {
      type: res.data.type,
      face: res.data.face,
    };

    setPetInformation(pet);
    setEmotions(emotionList);
  };

  const fetchMonthlyPetFail = (err) => {
    setEmotions(null);
    errorAlert("펫을 데려오지 못했어요 ㅠㅠ");
    navigate(-1);
  };

  useEffect(() => {
    const payload = {
      year: parseInt(yearState),
      month: parseInt(monthState),
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

    goToMain();
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

  const handleChartChange = () => {
    if (chartType === "bar") {
      setChartType("pie");
    } else {
      setChartType("bar");
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
          <div className={styles.pet}>
            <img
              src={`${createImageUrl(
                petInformation?.type,
                petInformation?.face
              )}`}
              alt="pet"
              className={styles.petImage}
            />
          </div>
          <div className={styles.statisticsBox}>
            <img
              className={styles.bestEmotionImage}
              src={bestEmotion(emotions?.[0].name)}
              alt="emotion"
            />
            <div className={styles.chartBox} onClick={handleChartChange}>
              {chartType === "bar" ? (
                emotions?.map((e, idx) => (
                  <EmotionProgressBar
                    count={e.value}
                    maxCount={emotions?.[0].value}
                    emotion={e.name}
                    key={`${e.name}-${idx}`}
                  />
                ))
              ) : (
                <div className={styles.pieChartContainer}>
                  <PieChart width={300} height={260}>
                    <Pie
                      data={emotions}
                      cx={150}
                      cy={120}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emotions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className={styles.emotionMarks}>
                    {emotions?.map((emotion, index) => {
                      return (
                        <EmotionMark
                          name={emotion.name}
                          key={`emotion-${index}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
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

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {percent !== 0 ? `${(percent * 100).toFixed(0)}%` : ""}
    </text>
  );
};

function EmotionMark({ name }) {
  const translateName = (name) => {
    if (name === "angry") {
      return "분노";
    } else if (name === "sad") {
      return "슬픔";
    } else if (name === "happy") {
      return "행복";
    } else if (name === "peace") {
      return "평화";
    } else if (name === "worry") {
      return "걱정";
    } else if (name === "surprise") {
      return "놀람";
    }
  };

  return (
    <div className={styles.emotionMark}>
      <div
        className={`${styles.emotionDot} ${
          name === "angry"
            ? styles.angryDot
            : name === "happy"
            ? styles.happyDot
            : name === "sad"
            ? styles.sadDot
            : name === "surprise"
            ? styles.surpriseDot
            : name === "peace"
            ? styles.peaceDot
            : name === "worry"
            ? styles.worryDot
            : null
        }`}
      ></div>
      <p className={styles.emotionName}>{translateName(name)}</p>
    </div>
  );
}

export default MonthlyPet;

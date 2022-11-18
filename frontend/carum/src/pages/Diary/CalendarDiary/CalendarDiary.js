import "./Calendar.css";
import Calendar from "react-calendar";
import { useEffect, useState, useRef, useCallback } from "react";
import moment from "moment";
import styles from "./CalendarDiary.module.css";
import TopNav from "../../../components/TopNav";
import Button from "../../../components/Button";
import sadImg from "../../../assets/sad.svg";
import angryImg from "../../../assets/angry.svg";
import worryImg from "../../../assets/worry.svg";
import happyImg from "../../../assets/happy.svg";
import surpriseImg from "../../../assets/surprise.svg";
import peaceImg from "../../../assets/peace.svg";
import WeeklyDiary from "../WeeklyDiary/WeeklyDiary";
import { useNavigate } from "react-router-dom";
import { fetchCalendar } from "apis/diary";
import {
  calWeeklyStartDate,
  useInterval,
  preventRefresh,
  errorAlert,
  goToMain,
  createImageUrl,
} from "utils/utils";
import Swal from "sweetalert2";

function CalendarDiary() {
  const [value, setValue] = useState(new Date());
  const [isMonthly, setIsMonthly] = useState(true);
  const [changingEmotionIdx, setChangingEmotionIdx] = useState(0);
  const [diary, setDiary] = useState([]);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [weeklyStartDate, setWeeklyStartDate] = useState("");
  const [emotionCount, setEmotionCount] = useState([0, 0, 0, 0, 0, 0]);

  // router navigate
  const navigate = useNavigate();

  // 달력 조회
  const fetchCalendarSuccess = (res) => {
    console.log(res);
    setDiary(res.data.diaryList);
    console.log("월간");

    if (isMonthly) {
      const emotionName = [
        "ANGRY",
        "SAD",
        "HAPPY",
        "WORRY",
        "PEACE",
        "SURPRISE",
      ];
      const emotionCnt = [0, 0, 0, 0, 0, 0];

      res.data.diaryList.forEach((diary) => {
        diary.emotionTag.forEach((emotion) => {
          emotionCnt[emotionName.indexOf(emotion)] += 1;
        });
      });

      setEmotionCount(emotionCnt);
    }
  };

  const fetchCalendarFail = (err) => {
    console.log(err);
    errorAlert("달력을 불러올 수 없어요");
    navigate("/");
  };

  // 조회
  useEffect(() => {
    // 주간 시작 날짜 계산
    setWeeklyStartDate(calWeeklyStartDate(activeStartDate));

    // 월간
    if (isMonthly) {
      const payload = {
        year: parseInt(moment(activeStartDate).format("YYYY")),
        month: parseInt(moment(activeStartDate).format("M")),
        day: 0,
      };

      fetchCalendar(payload, fetchCalendarSuccess, fetchCalendarFail);
    }
  }, [activeStartDate, isMonthly]);

  // 달력 일 클릭 시
  const onChange = (e) => {
    const idx = diary.findIndex((el) => {
      return (
        moment(e).format("YYYY-MM-DD") ===
        moment(el.createDate).format("YYYY-MM-DD")
      );
    });

    if (idx !== -1) {
      navigate(`/diary/${diary[idx].id}`);
    }
    setValue(e);
    console.log(e);
  };

  // 달력 월 클릭 시
  const onClickMonth = (e) => {
    setActiveStartDate(e);
  };

  // 달력 navigation 화살표 버튼 클릭 시
  const onActiveStartDateChange = ({ action, activeStartDate }) => {
    if (
      action === "prev" ||
      action === "prev2" ||
      action === "next" ||
      action === "next2"
    ) {
      setActiveStartDate(activeStartDate);
    }
  };

  const emotionIdx = 0;

  // 감정이 두개일 때 1.5초마다 바꾸며 보는 데 사용하는 함수
  useInterval(() => {
    if (changingEmotionIdx === 0) {
      setChangingEmotionIdx(1);
    } else {
      setChangingEmotionIdx(0);
    }
  }, 1500);

  const handleToggleButton = () => {
    if (isMonthly) {
      setWeeklyStartDate(calWeeklyStartDate(activeStartDate));
    }
    setIsMonthly(!isMonthly);
  };

  // 새로고침 방지
  useEffect(() => {
    window.addEventListener("beforeunload", preventRefresh);

    goToMain();
  }, []);

  return (
    <div>
      <TopNav
        text="내 일기"
        buttonComponent={
          <Button
            text={isMonthly ? "주간" : "월간"}
            size="extraSmall"
            variant="primary"
            onClick={handleToggleButton}
          />
        }
      />
      <div className={styles.contentContainer}>
        {isMonthly ? (
          <div>
            <Calendar
              onChange={onChange}
              activeStartDate={activeStartDate}
              value={value}
              // 달력에 기분 이모티콘 넣기
              formatDay={(locale, date) => {
                const idx = diary.findIndex((el) => {
                  return (
                    moment(date).format("YYYY-MM-DD") ===
                    moment(el.createDate).format("YYYY-MM-DD")
                  );
                });

                if (idx !== -1) {
                  let emotionName = diary[idx]?.emotionTag[emotionIdx];

                  // 감정이 두개면 1.5초마다 번갈아서 보여줌
                  if (diary[idx].emotionTag.length === 2) {
                    emotionName = diary[idx]?.emotionTag[changingEmotionIdx];
                  }

                  return (
                    <img
                      src={
                        emotionName === "ANGRY"
                          ? angryImg
                          : emotionName === "SAD"
                          ? sadImg
                          : emotionName === "HAPPY"
                          ? happyImg
                          : emotionName === "PEACE"
                          ? peaceImg
                          : emotionName === "WORRY"
                          ? worryImg
                          : emotionName === "SURPRISE"
                          ? surpriseImg
                          : null
                      }
                      className={styles.calendarEmotion}
                      alt="emotion"
                    />
                  );
                } else {
                  return moment(date).format("D");
                }
              }}
              calendarType="US"
              maxDate={new Date()}
              onClickMonth={onClickMonth}
              onActiveStartDateChange={onActiveStartDateChange}
            />
            {/* 월별 감정 수치 */}
            <div className={styles.thisMonthEmotionBox}>
              <span className={styles.boxText}>이달의 감정들</span>
              <div className={styles.emotionBox}>
                <div className={styles.emotionImageBox}>
                  <img
                    src={angryImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>{emotionCount[0]}</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={sadImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>{emotionCount[1]}</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={happyImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>{emotionCount[2]}</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={worryImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>{emotionCount[3]}</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={peaceImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>{emotionCount[4]}</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={surpriseImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>{emotionCount[5]}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <WeeklyDiary
            diaryList={diary}
            weeklyStartDate={weeklyStartDate}
            setActiveStartDate={setActiveStartDate}
            activeStartDate={activeStartDate}
          />
        )}
      </div>
    </div>
  );
}

export default CalendarDiary;

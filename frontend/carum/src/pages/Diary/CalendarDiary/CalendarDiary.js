import "./Calendar.css";
import Calendar from "react-calendar";
import { useEffect, useState, useRef } from "react";
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

function CalendarDiary() {
  const [value, setValue] = useState(new Date());
  const [isMonthly, setIsMonthly] = useState(true);
  const [tmpValue, setTmpValue] = useState(new Date());
  const [changingEmotionIdx, setChangingEmotionIdx] = useState(0);
  const [diary, setDiary] = useState([]);

  const navigate = useNavigate();

  // 달력 조회
  const fetchCalendarSuccess = (res) => {
    console.log(res.data);
  };

  const fetchCalendarFail = (err) => {
    console.log(err);
  };

  // 월간 조회
  useEffect(() => {
    const payload = {};
    // fetchCalendar(payload, fetchCalendarSuccess, fetchCalendarFail);
  }, []);

  // 주간 조회
  useEffect(() => {}, []);

  // 달력 일 클릭 시
  const onChange = (e) => {
    setValue(e);
    console.log(e);
  };

  // 달력 월 클릭 시
  const onClickMonth = (e) => {
    console.log(e);
    setTmpValue(e);
  };

  // 달력 navigation 화살표 버튼 클릭 시
  const onActiveStartDateChange = ({ action, activeStartDate }) => {
    if (
      action === "prev" ||
      action === "prev2" ||
      action === "next" ||
      action === "next2"
    ) {
    }
  };

  const emotionIdx = 0;

  // 감정이 두개일 때 1.5초마다 바꾸며 보는 데 사용하는 함수
  function useInterval(callback, delay) {
    const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

    useEffect(() => {
      savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
      }
      if (delay !== null) {
        // 만약 delay가 null이 아니라면
        let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
        return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
      }
    }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
  }

  useInterval(() => {
    if (changingEmotionIdx === 0) {
      setChangingEmotionIdx(1);
    } else {
      setChangingEmotionIdx(0);
    }
  }, 1500);

  const handleToggleButton = () => {
    if (!isMonthly) {
    }
    setIsMonthly(!isMonthly);
  };

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
              value={value}
              // 달력에 기분 이모티콘 넣기
              formatDay={(locale, date) => {
                const idx = diary.findIndex((el) => {
                  return (
                    moment(date).format("YYYY-MM-DD") === String(el.createAt)
                  );
                });

                if (idx !== -1) {
                  let emotionName = diary[idx]?.emotion[emotionIdx];

                  // 감정이 두개면 1.5초마다 번갈아서 보여줌
                  if (diary[idx].emotion.length === 2) {
                    emotionName = diary[idx]?.emotion[changingEmotionIdx];
                  }

                  return (
                    <img
                      src={
                        emotionName === "angry"
                          ? angryImg
                          : emotionName === "sad"
                          ? sadImg
                          : emotionName === "happy"
                          ? happyImg
                          : emotionName === "peace"
                          ? peaceImg
                          : emotionName === "worry"
                          ? worryImg
                          : emotionName === "surprise"
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
                  <p className={styles.emotionCount}>0</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={sadImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>0</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={happyImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>0</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={worryImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>0</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={peaceImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>0</p>
                </div>
                <div className={styles.emotionImageBox}>
                  <img
                    src={surpriseImg}
                    className={styles.emotionImage}
                    alt="emotion"
                  />
                  <p className={styles.emotionCount}>0</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <WeeklyDiary diaryList={diary} />
        )}
      </div>
    </div>
  );
}

export default CalendarDiary;

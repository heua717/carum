import "./Calendar.css";
import Calendar from 'react-calendar';
import { useState } from "react";
import moment from "moment"
import styles from './CalendarDiary.module.css'
import TopNav from "../../../components/TopNav";
import Button from '../../../components/Button'
import sadImg from "../../../assets/sad.svg";
import angryImg from "../../../assets/angry.svg";
import worryImg from "../../../assets/worry.svg";
import happyImg from "../../../assets/happy.svg";
import surpriseImg from "../../../assets/surprise.svg";
import peaceImg from "../../../assets/peace.svg";

function CalendarDiary() {
  const [value, onChange] = useState(new Date())
  const [isMonthly, setIsMonthly] = useState(true)

  return (
    <div className={styles.container}>
      <TopNav 
        text="내 일기" 
        buttonComponent={
          <Button text={isMonthly ? "주간" : '월간'} size="extraSmall" variant="primary" onClick={() => setIsMonthly(!isMonthly)} />
        } 
      />
      { isMonthly ?
        <div>
          <Calendar 
            onChange={onChange} 
            value={value}
            formatDay={(locale, date) => moment(date).format("D")} // 달력에 일 숫자만 보이도록 설정
            calendarType="US"
            maxDate={new Date()}
          />
          <div className={styles.thisMonthEmotionBox}>
            <span className={styles.boxText}>이달의 감정들</span>
            <div className={styles.emotionBox}>
              <div className={styles.emotionImageBox}>
                <img src={angryImg} className={styles.emotionImage} />
              </div>
              <div className={styles.emotionImageBox}>
                <img src={sadImg} className={styles.emotionImage} />
              </div>
              <div className={styles.emotionImageBox}>
                <img src={happyImg} className={styles.emotionImage} />
              </div>
              <div className={styles.emotionImageBox}>
                <img src={worryImg} className={styles.emotionImage} />
              </div>
              <div className={styles.emotionImageBox}>
                <img src={peaceImg} className={styles.emotionImage} />
              </div>
              <div className={styles.emotionImageBox}>
                <img src={surpriseImg} className={styles.emotionImage} />
              </div>
            </div>
          </div>
        </div> :
        null
      }
    </div>
  );
}

export default CalendarDiary;

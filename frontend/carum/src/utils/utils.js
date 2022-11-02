import { useEffect, useRef } from "react";
import moment from "moment";

// 정해진 시간마다 실행되는 함수
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

// 달 별 날짜
const MONTH_DAY = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 한 주 시작날짜 계산 함수
function calWeeklyStartDate(targetDay) {
  const DAY = targetDay.getDay();
  targetDay = moment(targetDay).format("YYYY-MM-DD").split("-");

  let year = parseInt(targetDay[0]);
  let month = parseInt(targetDay[1]);
  let day = parseInt(targetDay[2]);

  day -= DAY;

  if (day < 1) {
    month -= 1;

    if (month < 1) {
      year -= 1;
      month = 12;
    }

    day += MONTH_DAY[month];

    // 윤년 계산
    if (
      month === 2 &&
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    ) {
      day += 1;
    }
  }

  return `${year}-${month}-${day}`;
}

function changeWeeklyDate(targetDay, state, num) {
  targetDay = moment(new Date(targetDay)).format("YYYY-MM-DD").split("-");

  let year = parseInt(targetDay[0]);
  let month = parseInt(targetDay[1]);
  let day = parseInt(targetDay[2]);

  if (state === "inc") {
    day += num;
    if (day > MONTH_DAY[month]) {
      day -= MONTH_DAY[month];
      month += 1;
    }

    if (month > 12) {
      year += 1;
      month -= 12;
    }
  } else if (state === "dec") {
    day -= num;

    if (day < 1) {
      month -= 1;

      if (month < 1) {
        year -= 1;
        month = 12;
      }

      day += MONTH_DAY[month];

      // 윤년 계산
      if (
        month === 2 &&
        ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
      ) {
        day += 1;
      }
    }
  }

  return `${year}-${month}-${day}`;
}

export { useInterval, calWeeklyStartDate, changeWeeklyDate };

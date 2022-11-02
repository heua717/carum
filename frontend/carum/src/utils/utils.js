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

const furnitureCategory = [
  { name: "바닥, 배경, 벽", type: "BACKGROUND" },
  { name: "침대, 이불", type: "BED" },
  { name: "매트리스", type: "MATTRESS" },
  { name: "소파", type: "SOFA" },
  { name: "테이블", type: "TABLE" },
  { name: "장", type: "DRAWER" },
  { name: "선반", type: "SHELF" },
  { name: "행거,옷장", type: "CLOSET" },
  { name: "의자", type: "CHAIR" },
  { name: "거울", type: "MIRROR" },
  { name: "전자기기", type: "ELECTRIC" },
  { name: "음식", type: "FOOD" },
  { name: "식물", type: "PLANT" },
  { name: "운동", type: "GYM_PROP" },
  { name: "외부", type: "OUTSIDE_PROP" },
  { name: "부엌", type: "KITCHEN_PROP" },
  { name: "침실", type: "BEDROOM_PROP" },
  { name: "화장실", type: "BATHROOM_PROP" },
  { name: "빨래", type: "LAUNDRY_PROP" },
  { name: "놀이", type: "PLAY_PROP" },
  { name: "장식", type: "DECO_PROP" },
  { name: "생활", type: "LIFE_PROP" },
  { name: "기타", type: "ETC" },
];

export { useInterval, calWeeklyStartDate, changeWeeklyDate, furnitureCategory };

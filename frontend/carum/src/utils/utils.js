import { useEffect, useRef } from "react";
import moment from "moment";
import Swal from "sweetalert2";

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
  { name: "벽 소품", type: "WALL" },
  { name: "바닥 소품", type: "FLOOR" },
  { name: "침실 소품", type: "BED" },
  { name: "부엌 소품", type: "KITCHEN" },
  { name: "세탁실, 화장실 소품", type: "LAUNDRY_BATH" },
  { name: "야외 소품", type: "OUTSIDE" },
  { name: "생활 소품", type: "LIFE" },
  { name: "음악 소품", type: "MUSIC" },
  { name: "의자, 테이블, 소파", type: "CHAIR_TABLE" },
  { name: "스탠드", type: "STAND" },
  { name: "전자기기", type: "ELECTRIC" },
  { name: "바구니, 박스", type: "BOX" },
  { name: "동물, 식물", type: "ANIMAL_PLANT" },
  { name: "음식", type: "FOOD" },
  { name: "장난감", type: "TOY" },
  { name: "의상", type: "CLOTH" },
];

const calEmotion = (pos, nag, neu) => {
  nag *= 0.9;
  const num = Math.atan(nag / pos);
  let rlt = "";

  if (neu > 65) {
    if (num < Math.PI / 12) {
      rlt = "PEACE";
    } else if (num > (5 / 12) * Math.PI) {
      rlt = "STUN";
    } else {
      rlt = "NORMAL";
    }
  } else {
    if (num < Math.PI / 6) {
      rlt = "HAPPY";
    } else if (num > Math.PI / 3) {
      rlt = "SAD";
    } else {
      rlt = "CONFUSE";
    }
  }

  return rlt;
};

const petTalk = (emotion, nickname) => {
  const emotionSentence = {
    HAPPY: [
      "내일도 오늘만 같았으면 좋겠네요.",
      `${nickname}님이 기분이 좋으시니 저도 기분이 너무 좋아요!`,
      "헐 대박!",
    ],
    PEACE: ["즐거워 보이니 다행이에요.", "오늘 많이 편안해 보이시네요."],
    SAD: [
      "많이 힘든 하루셨군요. 내일은 분명 좋은 일이 생길 거예요.",
      `저는 언제나 ${nickname}님의 편이랍니다.`,
      "비가 갠 뒤에 무지개가 피는 것처럼 좋은 일이 있을 거예요.",
      "많이 속상하셨겠어요. ㅠㅠ",
      "으앙ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
    ],
    STUN: [
      "어질어질한 하루를 보내셨군요.",
      "쉽지 않은 하루였네요.",
      "힘든 하루를 보내셨네요. 오늘은 푹 쉬세요.",
      "으으으…",
    ],
    NORMAL: [
      "나쁘지 않은 하루였길 바라요.",
      "무난한 하루를 보내셨군요.",
      "아~ 그러셨구나",
    ],
    CONFUSE: [
      "다사다난한 하루였군요. 마무리는 잘 해봐요!",
      "마음을 터놓을 수 있는 상대와 얘기해보는 건 어때요?",
      "어떤 일이 있었는지 다 말해보세요.",
    ],
  };

  const length = emotionSentence[emotion].length;
  const randomIdx = Math.floor(Math.random() * length);
  return emotionSentence[emotion][randomIdx];
};

// 새로고침 막는 함수
const preventRefresh = (e) => {
  e.preventDefault();
  e.returnValue = "";
};

// 메인으로 보내는 함수
const goToMain = () => {
  if (window.performance.getEntriesByType("navigation")[0].type === "reload") {
    window.location.replace("http://localhost:3000/");
  }
};

// 에러날 시 알림 띄우기
const errorAlert = (text) => {
  Swal.fire({
    title: text,
    icon: "error",
    showConfirmButton: false,
    timer: 800,
  });
};

const WEEK_DAY = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

export {
  useInterval,
  calWeeklyStartDate,
  changeWeeklyDate,
  furnitureCategory,
  calEmotion,
  petTalk,
  preventRefresh,
  errorAlert,
  WEEK_DAY,
  goToMain,
};

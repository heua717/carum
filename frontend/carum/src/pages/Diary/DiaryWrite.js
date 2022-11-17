import styles from "./DiaryWrite.module.css";
import TopNav from "../../components/TopNav";
import { Editor } from "@toast-ui/react-editor";
import "./Editor.css";
import Button from "../../components/Button";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import sadImg from "../../assets/sad.svg";
import angryImg from "../../assets/angry.svg";
import worryImg from "../../assets/worry.svg";
import happyImg from "../../assets/happy.svg";
import surpriseImg from "../../assets/surprise.svg";
import peaceImg from "../../assets/peace.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { writeDiary, editDiary } from "apis/diary";
import { fetchUserEmotion } from "apis/emotion";
import Swal from "sweetalert2";
import axios from "axios";
import {
  useInterval,
  calEmotion,
  petTalk,
  preventRefresh,
  errorAlert,
  goToMain,
} from "utils/utils";
import { useAppSelector } from "stores/store";
import whaleImage from "assets/whale.png";

const EMOTION_VALUE = {
  SAD: ["괴로운", "간절한", "우울한", "후회스런", "속상한", "안타까운"],
  WORRY: ["떨리는", "막막한", "의심하는", "불안한", "겁먹은", "걱정스런"],
  HAPPY: ["흐뭇한", "신나는", "즐거운", "행복한", "들뜬", "정다운"],
  SURPRISE: ["이상한", "신기한", "당황한", "감동한", "어이없는", "혼란스런"],
  PEACE: ["산뜻한", "시원한", "익숙한", "만족스런", "따뜻한", "든든한"],
  ANGRY: ["답답한", "싫어하는", "짜증난", "미워하는", "불쾌한", "언짢은"],
};

const EMOTION_IMAGE = [
  {
    emotion: "ANGRY",
    image: angryImg,
  },
  {
    emotion: "PEACE",
    image: peaceImg,
  },
  {
    emotion: "SAD",
    image: sadImg,
  },
  {
    emotion: "HAPPY",
    image: happyImg,
  },
  {
    emotion: "WORRY",
    image: worryImg,
  },
  {
    emotion: "SURPRISE",
    image: surpriseImg,
  },
];

const TIME = 20;
const COOL_TIME = 10;

function DiaryWrite({
  state,
  diary,
  diaryId,
  setCurState,
  setDiary,
  enterCloseUp,
  exitCloseUp,
  petConversation,
  sendDiaryWriteSignal,
}) {
  const [values, setValues] = useState({
    isSelecting: true,
    selectedEmotion: "ANGRY",
    selectedEmotionList: diary ? diary.emotionTag : [],
  });
  const [tmpContent, setTmpContent] = useState(
    diary ? diary.content.replace(/<[^>]*>?/g, "") : ""
  );

  const [totalTime, setTotalTime] = useState(TIME);
  const [timer, setTimer] = useState(1000);
  const [petTimer, setPetTimer] = useState(null);
  const [coolTime, setCoolTime] = useState(COOL_TIME);
  const [canTalk, setCanTalk] = useState(true);

  // user redux
  const { userInfo } = useAppSelector((state) => state.user);
  const unityEnterCloseUp = () => {
    enterCloseUp();
  };
  const unityExitCloseUp = () => {
    exitCloseUp();
  };
  const unityPetConversation = (json) => {
    petConversation(json);
  };
  useEffect(() => {
    unityEnterCloseUp();
    return () => {
      unityExitCloseUp();
    };
  }, []);

  // 감정 이모티콘 클릭 시
  const clickEmotion = (emotion) => {
    if (values.isSelecting) {
      const idx = values.selectedEmotionList.indexOf(emotion);
      const newEmotionList = values.selectedEmotionList;

      if (values.selectedEmotionList.length === 2) {
        if (idx !== -1) {
          newEmotionList.splice(idx, 1);
          // setValues({ ...values, selectedEmotionList: newEmotionList });
          // values.selectedEmotionList.splice(idx, 1);
        }
      } else {
        if (idx === -1) {
          newEmotionList.push(emotion);
          // setValues({ ...values, selectedEmotionList: newEmotionList });
          // values.selectedEmotionList.push(emotion);
        } else {
          newEmotionList.splice(idx, 1);
          // setValues({ ...values, selectedEmotionList: newEmotionList });
          // values.selectedEmotionList.splice(idx, 1);
        }
      }
      setValues({ ...values, selectedEmotionList: newEmotionList });
    }
    setValues({ ...values, selectedEmotion: emotion });
  };

  // 감정이 체크 되었는지 파악
  const isChecked = (emotion) => {
    const idx = values.selectedEmotionList.indexOf(emotion);

    if (idx !== -1) {
      return true;
    }

    return false;
  };

  // 감정 선택, 설명 상태 변경
  const handleChange = (event) => {
    setValues({ ...values, isSelecting: event.target.checked });
  };

  // 2주간 유저 감정 분석
  const fetchUserEmotionSuccess = (res) => {
    console.log(res);
    if (res.data.result === "NORMAL") {
      Swal.fire({
        title: "일기를 작성했어요!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (res.data.result === "SAD") {
      Swal.fire({
        imageUrl: whaleImage,
        html: `요즘 자주 슬퍼하시는 것 같아 마음이 아파요 ㅠㅠ 
        <br> 한 번 마음 상태를 진단해 보시는 건 어떨까요? <br>`,
        confirmButtonText: "자가진단 하러 가기",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open("https://nct.go.kr/distMental/rating/rating02_2.do");
        }
      });
    } else if (res.data.result === "WORRY") {
      Swal.fire({
        imageUrl: whaleImage,
        html: `불안함을 많이 느끼고 계시네요...
        <br> 마음을 진단하고 도움을 받아보는 건 어떠세요? <br>`,
        confirmButtonText: "자가진단 하러 가기",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open("https://nct.go.kr/distMental/rating/rating02_3.do");
        }
      });
    }
  };

  const fetchUserEmotionFail = (err) => {
    console.log(err);
  };

  // 다이어리 저장
  const writeDiarySuccess = (res) => {
    console.log(res);
    fetchUserEmotion(fetchUserEmotionSuccess, fetchUserEmotionFail);
    sendDiaryWriteSignal();
    navigate("/calendar");
  };

  const writeDiaryFail = (err) => {
    console.log(err);
  };

  // 다이어리 수정
  const editDiarySuccess = (res) => {
    console.log(res);
    sendDiaryWriteSignal();
    setDiary(null);
    setCurState("read");
    Swal.fire({
      title: "일기가 수정됐습니다!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  const editDiaryFail = (err) => {
    console.log(err);
    errorAlert("일기를 수정하지 못했어요 ㅠㅠ");
    setCurState("read");
  };

  const handleWriteDiary = () => {
    // 감정 하나도 선택하지 않았을 때
    if (values.selectedEmotionList.length === 0) {
      Swal.fire({
        text: "감정을 최소 한 개 골라주세요!",
        icon: "error",
        showConfirmButton: false,
        timer: 800,
      });
    } else {
      const payload = {
        diaryId: diaryId ? diaryId : null,
        content: editorRef.current?.getInstance().getHTML(),
        emotionTag: values.selectedEmotionList,
        background: diary ? diary.background : "indigo",
      };

      if (state === "edit") {
        editDiary(payload, editDiarySuccess, editDiaryFail);
      } else {
        writeDiary(payload, writeDiarySuccess, writeDiaryFail);
      }
    }
  };

  const navigate = useNavigate();
  const editorRef = useRef();

  // 이미지 업로드 로직
  const onUploadImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append("image", blob);

    const response = await axios.post(
      "https://k7a101.p.ssafy.io/api/image",
      formData,
      {
        headers: {
          "access-token": localStorage.getItem("access-token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const url = response.data.fileUrl;
    callback(url, "alt text");
    return false;
  };

  // CLOVA API
  const sendSentiment = async (content) => {
    setTimer(null);
    axios
      .post(
        "https://carum.herokuapp.com/https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze",
        { content },
        {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_CLOVA_API_ID,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_CLOVA_API_KEY,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(
          calEmotion(
            res.data.document.confidence.positive,
            res.data.document.confidence.negative,
            res.data.document.confidence.neutral
          )
        );
        console.log(
          petTalk(
            calEmotion(
              res.data.document.confidence.positive,
              res.data.document.confidence.negative,
              res.data.document.confidence.neutral
            ),
            userInfo.nickname
          )
        );
        console.log(userInfo.nickname);
        const calc = calEmotion(
          res.data.document.confidence.positive,
          res.data.document.confidence.negative,
          res.data.document.confidence.neutral
        );
        const text = petTalk(calc, userInfo.nickname);
        const conversation = {
          text: text,
          emotion: calc,
        };
        unityPetConversation(conversation);
        setTotalTime(TIME);
        setTimer(1000);
      })
      .catch((err) => {
        console.log(err);
        setTotalTime(TIME);
        setTimer(1000);
      });
  };

  // 자동 타이머
  useInterval(() => {
    if (totalTime > 0) {
      setTotalTime(totalTime - 1);
    } else {
      const data = editorRef.current
        .getInstance()
        .getHTML()
        .replace(/<[^>]*>?/g, "");

      console.log("data: ", data);
      console.log("tmpContent: ", tmpContent);

      if (data.trim().length >= 30 && data.trim() !== tmpContent.trim()) {
        sendSentiment(data);
        setTmpContent(data);
        console.log("감정분석 함");
      } else {
        console.log("감정분석 안 함");
        setTotalTime(TIME);
      }
    }
    console.log(totalTime);
  }, timer);

  useInterval(() => {
    if (coolTime > 0) {
      setCoolTime(coolTime - 1);
      console.log("cooltime", coolTime);
    } else {
      setPetTimer(null);
      setCanTalk(true);
      setCoolTime(COOL_TIME);
    }
  }, petTimer);

  // 펫 터치시 쿨타임 시작, 자동 타이머 시간 초기화
  const touchPet = () => {
    if (canTalk) {
      const data = editorRef.current
        .getInstance()
        .getHTML()
        .replace(/<[^>]*>?/g, "");

      console.log("data: ", data);
      console.log("tmpContent: ", tmpContent);

      if (data.trim().length >= 30 && data.trim() !== tmpContent.trim()) {
        console.log("감정분석 함");
        sendSentiment(data);
        setCanTalk(false);
        setTmpContent(data);
        setPetTimer(1000);
      } else {
        console.log("감정 분석 안 함");
      }
    }
  };

  // 새로고침 방지
  useEffect(() => {
    window.addEventListener("beforeunload", preventRefresh);

    goToMain();
  }, []);

  return (
    <div>
      <TopNav
        text="다이어리 작성"
        timer={timer}
        setTimer={setTimer}
        petTimer={petTimer}
        setPetTimer={setPetTimer}
      />
      <div className={styles.contentContainer}>
        <div className={styles.editor}>
          <Editor
            ref={editorRef}
            initialValue={diary ? diary.content : " "}
            initialEditType="wysiwyg"
            previewStyle="vertical"
            height="260px"
            hideModeSwitch="true"
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["table", "image"],
            ]}
            plugins={[colorSyntax]}
            useCommandShortcut={false}
            hooks={{
              addImageBlobHook: onUploadImage,
            }}
          />
        </div>
        <div className={styles.emotionCheckBox}>
          <div className={styles.emotionCheckHeader}>
            <span>오늘의 감정</span>
            <div className={styles.checkSwitch}>
              <span>설명</span>
              <AntSwitch onChange={handleChange} defaultChecked />
              <span>선택</span>
            </div>
          </div>
          <div className={styles.emotions}>
            {EMOTION_IMAGE.map((emotionObj) => (
              <img
                onClick={() => clickEmotion(emotionObj.emotion)}
                className={`${styles.emotionImg} ${
                  isChecked(emotionObj.emotion) ? styles.checked : null
                }`}
                alt={emotionObj.emotion}
                src={emotionObj.image}
              />
            ))}
          </div>
          <div
            className={`${styles.emotionExplainBox} 
            ${
              values.selectedEmotion === "ANGRY"
                ? styles.angryBg
                : values.selectedEmotion === "SAD"
                ? styles.sadBg
                : values.selectedEmotion === "HAPPY"
                ? styles.happyBg
                : values.selectedEmotion === "WORRY"
                ? styles.worryBg
                : values.selectedEmotion === "PEACE"
                ? styles.peaceBg
                : styles.surpriseBg
            }`}
          >
            <div className={styles.emotionExplainRow}>
              <span>#{EMOTION_VALUE[values.selectedEmotion]?.[0]}</span>
              <span>#{EMOTION_VALUE[values.selectedEmotion]?.[1]}</span>
              <span>#{EMOTION_VALUE[values.selectedEmotion]?.[2]}</span>
            </div>
            <div className={styles.emotionExplainRow}>
              <span>#{EMOTION_VALUE[values.selectedEmotion]?.[3]}</span>
              <span>#{EMOTION_VALUE[values.selectedEmotion]?.[4]}</span>
              <span>#{EMOTION_VALUE[values.selectedEmotion]?.[5]}</span>
            </div>
          </div>
        </div>
        <button onClick={touchPet}>펫 클릭</button>
        <Button
          onClick={handleWriteDiary}
          size="big"
          variant="primary"
          text="일기 저장하기"
        />
      </div>
    </div>
  );
}

// 스위치 버튼
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#5D51A7",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default DiaryWrite;

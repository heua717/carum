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
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { writeDiary, editDiary } from "apis/diary";
import Swal from "sweetalert2";
import axios from "axios";
import { useInterval } from "utils/utils";
import react, {useEffect} from "react";

const EMOTION_VALUE = {
  sad: ["괴로운", "간절한", "우울한", "후회스런", "속상한", "안타까운"],
  worry: ["떨리는", "막막한", "의심하는", "불안한", "겁먹은", "걱정스런"],
  happy: ["흐뭇한", "신나는", "즐거운", "행복한", "들뜬", "정다운"],
  surprise: ["이상한", "신기한", "당황한", "감동한", "어이없는", "혼란스런"],
  peace: ["산뜻한", "시원한", "익숙한", "만족스런", "따뜻한", "든든한"],
  angry: ["답답한", "싫어하는", "짜증난", "미워하는", "불쾌한", "언짢은"],
};

function DiaryWrite({ state, diary, diaryId, setCurState, setDiary, enterCloseUp, exitCloseUp }) {
  const [values, setValues] = useState({
    isSelecting: false,
    selectedEmotion: "angry",
    selectedEmotionList: diary ? diary.emotionTag : [],
  });
  const [tmpContent, setTmpContent] = useState("");

  const unityEnterCloseUp = () => {
    enterCloseUp();
  }
  const unityExitCloseUp = () => {
    exitCloseUp();
  }
  useEffect(()=> {
    unityEnterCloseUp();
    return () => {
      unityExitCloseUp();
    }
  },[])

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

  // 다이어리 저장
  const writeDiarySuccess = (res) => {
    console.log(res);
    navigate("/main/calendar");
  };

  const writeDiaryFail = (err) => {
    console.log(err);
  };

  // 다이어리 수정
  const editDiarySuccess = (res) => {
    console.log(res);
    setDiary(null);
    setCurState("read");
  };

  const editDiaryFail = (err) => {
    console.log(err);
  };

  const handleWriteDiary = () => {
    // 감정 하나도 선택하지 않았을 때
    if (values.selectedEmotionList.length === 0) {
      Swal.fire({
        position: "bottom-end",
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
        background: "purple",
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

  // cors error 방지 https://cors-anywhere.herokuapp.com/
  // CLOVA API
  const sendSentiment = async (content) => {
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze",
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useInterval(() => {
  //   const data = editorRef.current
  //     .getInstance()
  //     .getHTML()
  //     .replace(/<[^>]*>?/g, "");

  //   console.log(data);
  //   console.log(tmpContent);

  //   if (data.trim() && data.trim() !== tmpContent.trim()) {
  //     console.log("데이터 보낸다");
  //     sendSentiment(data);
  //     setTmpContent(data);
  //   } else {
  //     console.log("데이터 안보낸다 바뀐 거 없다");
  //   }
  // }, 15000);

  return (
    <div>
      <TopNav text="다이어리 작성" />
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
              <AntSwitch onChange={handleChange} />
              <span>선택</span>
            </div>
          </div>
          <div className={styles.emotions}>
            <img
              onClick={() => clickEmotion("angry")}
              className={`${styles.emotionImg} ${
                isChecked("angry") ? styles.checked : null
              }`}
              src={angryImg}
              alt="emotion"
            />
            <img
              onClick={() => clickEmotion("sad")}
              className={`${styles.emotionImg} ${
                isChecked("sad") ? styles.checked : null
              }`}
              src={sadImg}
              alt="emotion"
            />
            <img
              onClick={() => clickEmotion("happy")}
              className={`${styles.emotionImg} ${
                isChecked("happy") ? styles.checked : null
              }`}
              src={happyImg}
              alt="emotion"
            />
            <img
              onClick={() => clickEmotion("worry")}
              className={`${styles.emotionImg} ${
                isChecked("worry") ? styles.checked : null
              }`}
              src={worryImg}
              alt="emotion"
            />
            <img
              onClick={() => clickEmotion("peace")}
              className={`${styles.emotionImg} ${
                isChecked("peace") ? styles.checked : null
              }`}
              src={peaceImg}
              alt="emotion"
            />
            <img
              onClick={() => clickEmotion("surprise")}
              className={`${styles.emotionImg} ${
                isChecked("surprise") ? styles.checked : null
              }`}
              src={surpriseImg}
              alt="emotion"
            />
          </div>
          <div
            className={`${styles.emotionExplainBox} 
            ${
              values.selectedEmotion === "angry"
                ? styles.angryBg
                : values.selectedEmotion === "sad"
                ? styles.sadBg
                : values.selectedEmotion === "happy"
                ? styles.happyBg
                : values.selectedEmotion === "worry"
                ? styles.worryBg
                : values.selectedEmotion === "peace"
                ? styles.peaceBg
                : styles.surpriseBg
            }`}
          >
            <div className={styles.emotionExplainRow}>
              <span>#{EMOTION_VALUE[values.selectedEmotion][0]}</span>
              <span>#{EMOTION_VALUE[values.selectedEmotion][1]}</span>
              <span>#{EMOTION_VALUE[values.selectedEmotion][2]}</span>
            </div>
            <div className={styles.emotionExplainRow}>
              <span>#{EMOTION_VALUE[values.selectedEmotion][3]}</span>
              <span>#{EMOTION_VALUE[values.selectedEmotion][4]}</span>
              <span>#{EMOTION_VALUE[values.selectedEmotion][5]}</span>
            </div>
          </div>
        </div>
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

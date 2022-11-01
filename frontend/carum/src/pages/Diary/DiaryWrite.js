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

function DiaryWrite() {
  const [values, setValues] = useState({
    isSelecting: false,
    selectedEmotion: "angry",
    selectedEmotionList: [],
  });

  // 감정 이모티콘 클릭 시
  const clickEmotion = (emotion) => {
    if (values.isSelecting) {
      const idx = values.selectedEmotionList.indexOf(emotion);
      if (values.selectedEmotionList.length === 2) {
        if (idx !== -1) {
          values.selectedEmotionList.splice(idx, 1);
        }
      } else {
        if (idx === -1) {
          values.selectedEmotionList.push(emotion);
        } else {
          values.selectedEmotionList.splice(idx, 1);
        }
      }
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

  const saveDiary = () => {
    navigate("/main/diary");
    console.log(editorRef.current?.getInstance().getHTML());
  };

  const navigate = useNavigate();
  const editorRef = useRef();

  // 이미지 업로드 로직
  const uploadImage = async (blob) => {
    const formData = new FormData();
    formData.append("multipartFiles", blob);
  };

  const onUploadImage = async (blob, callback) => {
    // const url = await uploadImage(blob);
    // callback(url, "alt text");
    // return false;
    console.log(blob);
  };

  return (
    <div>
      <TopNav text="다이어리 작성" />
      <div className={styles.contentContainer}>
        <div className={styles.editor}>
          <Editor
            ref={editorRef}
            initialValue=" "
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
              <span>{values.selectedEmotionList}</span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.emotionExplainRow}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => saveDiary()}
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

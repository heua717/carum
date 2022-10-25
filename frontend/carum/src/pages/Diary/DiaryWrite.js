import styles from "./DiaryWrite.module.css";
import TopNav from "../../components/TopNav";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Button from "../../components/Button";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import sadImg from "../../assets/sad.svg";
import angryImg from "../../assets/angry.svg";
import worryImg from "../../assets/worry.svg";
import happyImg from "../../assets/happy.svg";
import surpriseImg from "../../assets/surprise.svg";
import peaceImg from "../../assets/peace.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 스위치 버튼
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 36,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(20px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "#5D51A7",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function DiaryWrite() {
  const [values, setValues] = useState({
    isEmotionExplained: false,
  });

  const clickEmotion = (emotion) => {
    setValues({ ...values, isEmotionExplained: true });
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <TopNav text="다이어리 작성" />
      <div className={styles.editor}>
        <Editor
          initialEditType="wysiwyg"
          previewStyle="vertical"
          height="200px"
          hideModeSwitch="true"
          toolbarItems={[["heading", "bold", "italic", "strike"]]}
          plugins={[colorSyntax]}
        />
      </div>
      <div className={styles.emotionCheckBox}>
        <div className={styles.emotionCheckHeader}>
          <span>오늘의 감정</span>
          <div className={styles.checkSwitch}>
            <span>설명</span>
            <AntSwitch />
            <span>선택</span>
          </div>
        </div>
        <div className={styles.emotions}>
          <img
            onClick={() => clickEmotion("angry")}
            className={styles.emotionImg}
            src={angryImg}
          />
          <img
            onClick={() => clickEmotion("sad")}
            className={styles.emotionImg}
            src={sadImg}
          />
          <img
            onClick={() => clickEmotion("happy")}
            className={styles.emotionImg}
            src={happyImg}
          />
          <img
            onClick={() => clickEmotion("worry")}
            className={styles.emotionImg}
            src={worryImg}
          />
          <img
            onClick={() => clickEmotion("peace")}
            className={styles.emotionImg}
            src={peaceImg}
          />
          <img
            onClick={() => clickEmotion("surprise")}
            className={styles.emotionImg}
            src={surpriseImg}
          />
        </div>
        <div className={styles.emotionExplainBox}>
          <div className={styles.emotionExplainRow}>
            <span></span>
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
        onClick={() => navigate("/main/diary")}
        size="big"
        variant="primary"
        text="일기 저장하기"
      />
    </div>
  );
}

export default DiaryWrite;

import TextField from "@mui/material/TextField";
import Button from "../../components/Button";
import styles from "./RoomSetting.module.css";
import { useEffect, useState } from "react";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { editRoomInfo } from "apis/room";

function RoomSetting({ roomList, curDoorIndex, closeModal }) {
  const [newEmotionTag, setNewEmotionTag] = useState([
    ...roomList[curDoorIndex].emotionTag,
  ]);
  const [newRoomName, setNewRoomName] = useState(roomList[curDoorIndex].name);

  const isEmotionChecked = (emotion) => {
    const idx = newEmotionTag.indexOf(emotion);

    if (idx !== -1) {
      return true;
    }

    return false;
  };

  //console.log(values.emotion);
  const handleNameChange = (event) => {
    setNewRoomName(event.target.value);
  };

  // 감정 이모티콘 클릭시
  const emotionClick = (emotion) => {
    const idx = newEmotionTag.indexOf(emotion);
    const emotionList = [...newEmotionTag];

    // 감정 선택이 안 됐을 때는 선택
    if (idx === -1) {
      emotionList.push(emotion);
      setNewEmotionTag([...emotionList]);
    } else {
      emotionList.splice(idx, 1);
      setNewEmotionTag([...emotionList]);
    }
  };

  const editRoomInfoSuccess = (res) => {
    console.log(res);
    closeModal();
  };

  const editRoomInfoFail = (err) => {
    console.log(err);
  };

  const handleEditRoomInfo = () => {
    const payload = {
      roomId: roomList[curDoorIndex].id,
      name: newRoomName,
      emotionTags: newEmotionTag,
    };
    editRoomInfo(payload, editRoomInfoSuccess, editRoomInfoFail);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>방 이름</span>
      </div>
      <TextField
        className={styles.input}
        required
        label="방 이름"
        id="outlined-required"
        value={newRoomName}
        onChange={handleNameChange}
      />

      <div className={styles.header}>
        <span>감정</span>
      </div>
      <div className={styles.emotionTag}>
        <Grid container spacing={{ xs: 2 }} columns={{ xs: 2 }}>
          <Grid xs={2}>
            <img
              className={`${styles.emotionImg} ${
                isEmotionChecked("ANGRY") ? null : styles.unchecked
              }`}
              src={angryImg}
              alt="emotion"
              onClick={() => {
                emotionClick("ANGRY");
              }}
            ></img>
            <img
              className={`${styles.emotionImg} ${
                isEmotionChecked("SAD") ? null : styles.unchecked
              }`}
              src={sadImg}
              alt="emotion"
              onClick={() => {
                emotionClick("SAD");
              }}
            ></img>
            <img
              className={`${styles.emotionImg} ${
                isEmotionChecked("HAPPY") ? null : styles.unchecked
              }`}
              src={happyImg}
              alt="emotion"
              onClick={() => {
                emotionClick("HAPPY");
              }}
            ></img>
            <img
              className={`${styles.emotionImg} ${
                isEmotionChecked("WORRY") ? null : styles.unchecked
              }`}
              src={worryImg}
              alt="emotion"
              onClick={() => {
                emotionClick("WORRY");
              }}
            ></img>
            <img
              className={`${styles.emotionImg} ${
                isEmotionChecked("PEACE") ? null : styles.unchecked
              }`}
              src={peaceImg}
              alt="emotion"
              onClick={() => {
                emotionClick("PEACE");
              }}
            ></img>
            <img
              className={`${styles.emotionImg} ${
                isEmotionChecked("SURPRISED") ? null : styles.unchecked
              }`}
              src={surpriseImg}
              alt="emotion"
              onClick={() => {
                emotionClick("SURPRISED");
              }}
            ></img>
          </Grid>
        </Grid>
      </div>
      <Button
        onClick={() => handleEditRoomInfo()}
        size={"big"}
        variant={"primary"}
        text={"수정"}
      />
    </div>
  );
}

export default RoomSetting;

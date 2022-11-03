import Carousel from "react-material-ui-carousel";
import styles from "./RoomCarousel.module.css";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import doorImg from "assets/door.png";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import { useNavigate } from "react-router-dom";
import Modal from "components/modal/Modal";
import RoomSetting from "./RoomSetting";

function RoomCarousel(props) {
  //console.log(props.mainRoomId);
  const [selectedRoom, setSelectedRoom] = useState(0);

  return (
    <div className={styles.carousel}>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible={true}
        indicators={false}
        autoPlay={false}
        fullHeightHover={false}
        sx={{ minHeight: "48vh" }}
        onChange={(e) => props.setCurDoorIndex(e)}
      >
        {props.roomInfo.rooms.map((item, i) => (
          <Item
            key={i}
            item={item}
            setSelectedRoom={setSelectedRoom}
            mainRoomId={props.roomInfo.mainRoomId}
            setRoomInfo={props.setRoomInfo}
            roomInfo={props.roomInfo}
          />
        ))}
      </Carousel>
      <Modal open={props.modalOpen} close={props.closeModal} header="방 설정">
        <RoomSetting
          curDoorIndex={props.curDoorIndex}
          roomList={props.roomInfo.rooms}
          closeModal={props.closeModal}
        />
      </Modal>
    </div>
  );
}

// 캐로셀 안 내용
function Item(props) {
  const navigate = useNavigate();
  const changeRoom = (roomId) => {
    //roomId에 따라 유니티 방 바꿔주기 실행하가
    console.log(roomId);
    //끝나면 main으로 돌아가라
    navigate(`/main`);
  };

  const mainRoomChange = () => {
    props.setRoomInfo({ ...props.roomInfo, mainRoomId: props.item.roomId });
  };

  return (
    <div>
      <div>
        {props.item.id === props.mainRoomId ? (
          <i
            class={`bx bxs-star ${styles.starImage}`}
            onClick={mainRoomChange}
          ></i>
        ) : (
          <i
            class={`bx bx-star ${styles.starImage}`}
            onClick={mainRoomChange}
          ></i>
        )}
      </div>
      <img
        className={styles.doorImage}
        src={doorImg}
        alt={props.item.roomName}
        onClick={() => changeRoom(props.item.roomId)}
      />
      <div className={styles.roomInfo}>
        <div>
          <Emotion emotionTag={props.item.emotionTag} />
        </div>
        <div className={styles.roomDiv}>
          <div></div>
          <div className={styles.roomName}>{props.item.name}</div>
        </div>
      </div>
    </div>
  );
}

function Emotion(props) {
  const emotionLink = props.emotionTag.map(function (item) {
    if (item === "SAD") return sadImg;
    else if (item === "WORRY") return worryImg;
    else if (item === "ANGRY") return angryImg;
    else if (item === "HAPPY") return happyImg;
    else if (item === "SURPRISED") return surpriseImg;
    else if (item === "PEACE") return peaceImg;
  });
  return (
    <div>
      {emotionLink.map((item, i) => (
        <img key={i} src={item} alt="emotion" className={styles.emotionImage} />
      ))}
    </div>
  );
}

export default RoomCarousel;

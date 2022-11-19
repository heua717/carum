import Carousel from "react-material-ui-carousel";
import styles from "./RoomCarousel.module.css";
import { useState, useEffect, useCallback } from "react";
import doorImg from "assets/door.svg";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import { useNavigate } from "react-router-dom";
import Modal from "components/modal/Modal";
import RoomSetting from "./RoomSetting";
import { changeMainRoom } from "apis/room";
import { setNowRoomId } from "stores/slices/room";
import { useAppDispatch, useAppSelector } from "stores/store";
import Swal from "sweetalert2";
import { errorAlert } from "utils/utils";

function RoomCarousel(props) {
  return (
    <div>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible={true}
        indicators={false}
        autoPlay={false}
        fullHeightHover={false}
        onChange={(e) => props.setCurDoorIndex(e)}
        className={styles.carousel}
      >
        {props.roomInfo?.rooms?.map((item, i) => (
          <Item
            key={i}
            item={item}
            mainRoomId={props.roomInfo?.mainRoomId}
            setRoomInfo={props.setRoomInfo}
            roomInfo={props.roomInfo}
            sendChangeRoomSignal={props.sendChangeRoomSignal}
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

  // redux
  const { nowRoomId } = useAppSelector((state) => state.roomInfo);
  const dispatch = useAppDispatch();

  const changeRoom = useCallback(
    (id) => {
      dispatch(setNowRoomId(id));
    },
    [dispatch, nowRoomId]
  );

  // 방 이동
  const handleChangeRoom = (roomId) => {
    //roomId에 따라 유니티 방 바꿔주기 실행하가
    if (roomId !== nowRoomId) {
      changeRoom(roomId);
      localStorage.setItem("nowRoomId", roomId);
      props.sendChangeRoomSignal({ roomId: roomId });
      //끝나면 main으로 돌아가라
      navigate(`/`);
    }
  };

  const changeMainRoomSuccess = (res) => {
    Swal.fire({
      icon: "success",
      title: "메인 방이 변경됐어요!",
      showConfirmButton: false,
      timer: 900,
    });
  };

  // 메인 방 변경
  const changeMainRoomFail = (err) => {
    errorAlert("메인 방을 변경하지 못했어요.");
  };

  const handleChangeMainRoom = () => {
    changeMainRoom(props.item.id, changeMainRoomSuccess, changeMainRoomFail);
    props.setRoomInfo({ ...props.roomInfo, mainRoomId: props.item?.id });
  };

  return (
    <div>
      <div>
        {props.item?.id === props.mainRoomId ? (
          <i className={`bx bxs-star ${styles.starImage}`}></i>
        ) : (
          <i
            className={`bx bx-star ${styles.starImage}`}
            onClick={handleChangeMainRoom}
          ></i>
        )}
      </div>
      <div className={styles.doorImageContainer}>
        {props.item?.id === nowRoomId ? (
          <div className={styles.using}>
            <p className={styles.usingText}>이용중</p>
          </div>
        ) : null}
        <img
          className={styles.doorImage}
          src={doorImg}
          alt={props.item?.roomName}
          onClick={() => handleChangeRoom(props.item.id)}
        />
      </div>
      <div className={styles.roomInfo}>
        <Emotion emotionTag={props.item?.emotionTag} />
        <div className={styles.roomName}>{props.item?.name}</div>
      </div>
    </div>
  );
}

function Emotion(props) {
  const emotionLink = props.emotionTag?.map(function (item) {
    if (item === "SAD") return sadImg;
    else if (item === "WORRY") return worryImg;
    else if (item === "ANGRY") return angryImg;
    else if (item === "HAPPY") return happyImg;
    else if (item === "SURPRISED") return surpriseImg;
    else if (item === "PEACE") return peaceImg;
  });
  return (
    <div>
      {emotionLink?.map((item, i) => (
        <img key={i} src={item} alt="emotion" className={styles.emotionImage} />
      ))}
    </div>
  );
}

export default RoomCarousel;

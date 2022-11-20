import styles from "./Room.module.css";
import TopNav from "components/TopNav";
import RoomCarousel from "./RoomCarousel";
import { useCallback, useEffect, useState } from "react";
import { fetchRoomList } from "apis/room";
import { setNowRoomId } from "stores/slices/room";
import { useAppDispatch, useAppSelector } from "stores/store";
import Button from "components/Button";
import { preventRefresh, errorAlert, goToMain } from "utils/utils";
import { useNavigate } from "react-router-dom";

function Room({ sendChangeRoomSignal }) {
  const [roomInfo, setRoomInfo] = useState({
    mainRoomId: null,
    rooms: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [curDoorIndex, setCurDoorIndex] = useState(0);

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

  // 방 정보 호출
  const fetchRoomListSuccess = (res) => {
    // 현재 방 id가 없으면 메인룸을 현재 방으로 지정
    if (!nowRoomId) {
      changeRoom(res.data.mainRoomId);
    }

    // 현재 있는 방을 리스트 앞으로 가져오기
    const sortedRoomList = [];
    const nowRoomIdx = res.data.roomList.findIndex((room) => {
      return room.id === nowRoomId;
    });

    for (let i = nowRoomIdx; i < res.data.roomList.length; i += 1) {
      sortedRoomList.push(res.data.roomList[i]);
    }

    for (let i = 0; i < nowRoomIdx; i += 1) {
      sortedRoomList.push(res.data.roomList[i]);
    }

    setRoomInfo({
      ...roomInfo,
      mainRoomId: res.data.mainRoomId,
      rooms: sortedRoomList,
    });
  };

  const fetchRoomListFail = (err) => {
    errorAlert("방 정보를 불러오지 못했어요");
    navigate("/");
  };

  useEffect(() => {
    fetchRoomList([], fetchRoomListSuccess, fetchRoomListFail);
  }, [roomInfo.mainRoomId]);

  // 정보 수정 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // 정보 수정 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    fetchRoomList([], fetchRoomListSuccess, fetchRoomListFail);
  };

  // 새로고침 방지
  useEffect(() => {
    window.addEventListener("beforeunload", preventRefresh);

    goToMain();
  }, []);

  return (
    <div className={styles.container}>
      <TopNav
        text="방 이동"
        buttonComponent={
          <Button
            variant="primary"
            text="방 정보"
            onClick={() => openModal()}
          />
        }
      />
      <RoomCarousel
        roomInfo={roomInfo}
        setRoomInfo={setRoomInfo}
        setCurDoorIndex={setCurDoorIndex}
        curDoorIndex={curDoorIndex}
        modalOpen={modalOpen}
        closeModal={closeModal}
        sendChangeRoomSignal={sendChangeRoomSignal}
      />
    </div>
  );
}

export default Room;

import styles from "./Room.module.css";
import TopNav from "components/TopNav";
import RoomCarousel from "./RoomCarousel";
import { useCallback, useEffect, useState } from "react";
import { fetchRoomList } from "apis/room";
import { setNowRoomId } from "stores/slices/room";
import { useAppDispatch, useAppSelector } from "stores/store";
import { useDispatch } from "react-redux";
import Button from "components/Button";

function Room() {
  const [roomInfo, setRoomInfo] = useState({
    mainRoomId: 0,
    rooms: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [curDoorIndex, setCurDoorIndex] = useState(0);

  // redux
  const nowRoomId = useAppSelector((state) => state.nowRoomId);
  const dispatch = useDispatch();

  const changeRoom = useCallback(
    (id) => {
      dispatch(setNowRoomId(id));
    },
    [dispatch, nowRoomId]
  );

  const fetchRoomListSuccess = (res) => {
    console.log(res.data);
    setRoomInfo({
      ...roomInfo,
      mainRoomId: res.data.mainRoomId,
      rooms: res.data.roomList,
    });
    changeRoom(res.data.mainRoomId);
  };

  const fetchRoomListFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    fetchRoomList([], fetchRoomListSuccess, fetchRoomListFail);
  }, []);

  // 정보 수정 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // 정보 수정 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
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
      />
    </div>
  );
}

export default Room;

import styles from "./Main.module.css";
import { useLocation, Routes, Route } from "react-router-dom";
import Diary from "../Diary/Diary";
import DiaryWrite from "../Diary/DiaryWrite";
import Room from "../Room/Room";
import Shop from "../Shop/Shop";
import MonthlyPet from "pages/Pet/MonthlyPet/MonthlyPet";
import YearlyPet from "pages/Pet/YearlyPet/YearlyPet";
import Profile from "../Profile/Profile";
import CalendarDiary from "../Diary/CalendarDiary/CalendarDiary";
import Menu from "./Menu";
import { useEffect, useState, useCallback } from "react";
import { fetchProfile } from "apis/user";
import { setNowRoomId } from "stores/slices/room";
import { useAppDispatch, useAppSelector } from "stores/store";
import { setUserInfo } from "stores/slices/user";
import React, { useRef } from "react";
import { Dialog } from "@mui/material";
import { chooseMonthlyPet } from "apis/pet";
import dinoImage from "assets/dino.png";
import whaleImage from "assets/whale.png";
import NotFound from "components/NotFound";
import { preventRefresh, goToMain } from "utils/utils";
import { setCurPage } from "stores/slices/page";

function Main({
  enterCloseUp,
  exitCloseUp,
  petConversation,
  petCreate,
  sendDiaryWriteSignal,
  sendChangeRoomSignal,
  childRef,
  handleUnityStart,
  handleUnityLogout,
}) {
  const location = useLocation();
  // const childRef = useRef(null);

  // const enterCloseUp = () => {
  //   childRef.current.enterCloseUp();
  // };
  // const exitCloseUp = () => {
  //   childRef.current.exitCloseUp();
  // };
  // const petConversation = (json) => {
  //   childRef.current.petConversation(json);
  // };

  // const petCreate = (json) => {
  //   childRef.current.petCreate(json);
  // };

  // const sendDiaryWriteSignal = () => {
  //   childRef.current.sendDiaryWriteSignal();
  // };

  // const sendChangeRoomSignal = (json) => {
  //   childRef.current.sendChangeRoomSignal(json);
  // };

  const [user, setUser] = useState(null);
  const [petChooseModalOpen, setPetChooseModalOpen] = useState(false);

  const { nowRoomId } = useAppSelector((state) => state.roomInfo);
  const { userInfo } = useAppDispatch((state) => state);
  const dispatch = useAppDispatch();

  const changeRoom = useCallback(
    (id) => {
      dispatch(setNowRoomId(id));
      localStorage.setItem("nowRoomId", id);
    },
    [dispatch]
  );

  const changePage = useCallback(() => {
    dispatch(setCurPage("main"));
  }, [dispatch]);

  const handleUserInfo = useCallback(
    (userInfo) => {
      dispatch(setUserInfo(userInfo));

      const petInfo = {
        petType: userInfo.petType,
        dailyColor: userInfo.dailyColor,
        dailyFace: userInfo.dailyFace,
      };

      localStorage.setItem("petInfo", JSON.stringify(petInfo));
    },
    [dispatch]
  );

  const fetchProfileSuccess = (res) => {
    console.log(res);
    const tmpUserInfo = {
      nickname: res.data.nickName,
      id: res.data.userId,
      birth: res.data.birth,
      phone: res.data.phone,
      money: res.data.money,
      mainRoom: res.data.mainRoom,
      todayDiary: res.data.todayDiary,
      petType: res.data.petType,
      dailyColor: res.data.dailyColor,
      dailyFace: res.data.dailyFace,
    };
    if (!nowRoomId) {
      changeRoom(res.data.mainRoom.id);
    }

    setUser(tmpUserInfo);
    handleUserInfo(tmpUserInfo);

    const token = {
      accessToken: sessionStorage.getItem("access-token"),
      refreshToken: sessionStorage.getItem("refresh-token"),
    };
    const param = {
      mainRoomId: nowRoomId ? nowRoomId : res.data.mainRoom.id,
      token,
      petType: tmpUserInfo.petType ? tmpUserInfo.petType : "NONE",
      dailyFace: tmpUserInfo.dailyFace,
      dailyColor: tmpUserInfo.dailyColor,
    };

    handleUnityStart(param);

    if (!res.data.petType) {
      setPetChooseModalOpen(true);
    }
  };

  const fetchProfileFail = (err) => {
    console.log(err);
  };

  // 다이어리 작성 후 일기 작성 감지
  useEffect(() => {
    if (location.pathname === "/") {
      fetchProfile(fetchProfileSuccess, fetchProfileFail);
    }
  }, [location.pathname]);

  // 펫 고르기
  const chooseMonthlyPetSuccess = (res, petType) => {
    console.log(res);
    setPetChooseModalOpen(false);

    const petInfoParams = {
      petType: petType,
      dailyFace: "NORMAL",
      dailyColor: 0,
    };

    petCreate(petInfoParams);
  };

  const chooseMonthlyPetFail = (err) => {
    console.log(err);
  };

  const handleChoosePet = (type) => {
    chooseMonthlyPet(type, chooseMonthlyPetSuccess, chooseMonthlyPetFail);
  };

  // 새로고침 방지
  useEffect(() => {
    window.addEventListener("beforeunload", preventRefresh);
    changePage();
    goToMain();
  }, []);

  return (
    <div className={styles.container}>
      <div className={location.pathname === "/" ? styles.contentBox : null}>
        <Routes>
          <Route
            path="write"
            element={
              <DiaryWrite
                enterCloseUp={enterCloseUp}
                exitCloseUp={exitCloseUp}
                petConversation={petConversation}
                sendDiaryWriteSignal={sendDiaryWriteSignal}
              />
            }
          />
          <Route path="diary/:id" element={<Diary unityRef={childRef} />} />
          <Route path="calendar" element={<CalendarDiary />} />
          <Route
            path="room"
            element={<Room sendChangeRoomSignal={sendChangeRoomSignal} />}
          />
          <Route path="shop" element={<Shop />} />
          <Route
            path="profile"
            element={<Profile handleUnityLogout={handleUnityLogout} />}
          />
          <Route path="yearly-pet/:year" element={<YearlyPet />} />
          <Route path="monthly-pet/:year/:month" element={<MonthlyPet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {location.pathname === "/" ? <Menu user={user} /> : null}
      </div>
      <Dialog open={petChooseModalOpen}>
        <div className={styles.petChooseModal}>
          <h3>이번 달 함께 할 펫을 골라주세요!</h3>
          <div
            className={styles.petImageContainer}
            onClick={() => handleChoosePet("DINO")}
          >
            <img src={dinoImage} />
          </div>
          <div
            className={styles.petImageContainer}
            onClick={() => handleChoosePet("WHALE")}
          >
            <img src={whaleImage} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Main;

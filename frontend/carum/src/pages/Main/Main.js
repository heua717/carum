import Header from "../../components/Header/Header";
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
import UnityCarum from "../../components/unity/UnityCarum";
import { setNowRoomId } from "stores/slices/room";
import { useAppDispatch } from "stores/store";
import { setUserInfo } from "stores/slices/user";
import React, { useRef } from "react";
import { Dialog } from "@mui/material";
import { chooseMonthlyPet } from "apis/pet";
import dinoImage from "assets/dino.png";
import whaleImage from "assets/whale.png";
import NotFound from "components/NotFound";

function Main() {
  const location = useLocation();
  const childRef = useRef(null);

  const enterCloseUp = () => {
    childRef.current.enterCloseUp();
  };
  const exitCloseUp = () => {
    childRef.current.exitCloseUp();
  };
  const petConversation = (json) => {
    childRef.current.petConversation(json);
  }

  const [user, setUser] = useState(null);
  const [petChooseModalOpen, setPetChooseModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const changeRoom = useCallback(
    (id) => {
      dispatch(setNowRoomId(id));
    },
    [dispatch]
  );

  const handleUserInfo = useCallback(
    (userInfo) => {
      dispatch(setUserInfo(userInfo));
    },
    [dispatch]
  );

  const fetchProfileSuccess = (res) => {
    console.log(res);
    const userInfo = {
      nickname: res.data.nickName,
      id: res.data.userId,
      birth: res.data.birth,
      phone: res.data.phone,
      money: res.data.money,
      mainRoom: res.data.mainRoom,
      todayDiary: res.data.todayDiary,
    };
    changeRoom(res.data.mainRoom.id);
    setUser(userInfo);
    handleUserInfo(userInfo);

    if (!res.data.petType) {
      setPetChooseModalOpen(true);
    }
  };

  const fetchProfileFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      fetchProfile(fetchProfileSuccess, fetchProfileFail);
    }
  }, [location.pathname]);

  // 펫 고르기
  const chooseMonthlyPetSuccess = (res) => {
    console.log(res);
    setPetChooseModalOpen(false);
  };

  const chooseMonthlyPetFail = (err) => {
    console.log(err);
  };

  const handleChoosePet = (type) => {
    chooseMonthlyPet(type, chooseMonthlyPetSuccess, chooseMonthlyPetFail);
  };

  return (
    <div className={styles.container}>
      <div className={styles.unity}>
        <UnityCarum ref={childRef} />
      </div>
      <div className={location.pathname === "/" ? styles.contentBox : null}>
        <Routes>
          <Route
            path="write"
            element={
              <DiaryWrite
                enterCloseUp={enterCloseUp}
                exitCloseUp={exitCloseUp}
                petConversation={petConversation}
              />
            }
          />
          <Route path="diary/:id" element={<Diary unityRef={childRef} />} />
          <Route path="calendar" element={<CalendarDiary />} />
          <Route path="room" element={<Room />} />
          <Route path="shop" element={<Shop />} />
          <Route path="profile" element={<Profile />} />
          <Route path="yearly-pet/:year" element={<YearlyPet />} />
          <Route path="monthly-pet/:year/:month" element={<MonthlyPet />} />
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

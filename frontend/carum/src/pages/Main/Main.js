import Header from "../../components/Header";
import styles from "./Main.module.css";
import { useLocation, Routes, Route } from "react-router-dom";
import Diary from "../Diary/Diary";
import DiaryWrite from "../Diary/DiaryWrite";
import Room from "../Room/Room";
import Shop from "../Shop/Shop";
import MonthlyPet from "../Profile/Pet/MonthlyPet";
import YearlyPet from "../Profile/Pet/YearlyPet";
import Profile from "../Profile/Profile";
import Calendar from "../Diary/Calendar";
import WeeklyDiary from "../Diary/WeeklyDiary";
import Menu from "./Menu";

function Main() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.unity}></div>
      <Header />
      <div className={styles.contentBox}>
        <Routes>
          <Route path="write" element={<DiaryWrite />} />
          <Route path="diary" element={<Diary />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="weeklyDiary" element={<WeeklyDiary />} />
          <Route path="room" element={<Room />} />
          <Route path="shop" element={<Shop />} />
          <Route path="profile" element={<Profile />} />
          <Route path="yearlyPet" element={<YearlyPet />} />
          <Route path="monthlyPet" element={<MonthlyPet />} />
        </Routes>
        {location.pathname === "/main" ? <Menu /> : null}
      </div>
    </div>
  );
}

export default Main;

import Header from "../../components/Header";
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

function Main() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.unity}></div>
      <Header />
      <div className={location.pathname === "/main" ? styles.contentBox : null}>
        <Routes>
          <Route path=":state" element={<DiaryWrite />} />
          <Route path="diary/:id" element={<Diary />} />
          <Route path="calendar" element={<CalendarDiary />} />
          <Route path="room" element={<Room />} />
          <Route path="shop" element={<Shop />} />
          <Route path="profile" element={<Profile />} />
          <Route path="yearly-pet" element={<YearlyPet />} />
          <Route path="monthly-pet" element={<MonthlyPet />} />
        </Routes>
        {location.pathname === "/main" ? <Menu /> : null}
      </div>
    </div>
  );
}

export default Main;

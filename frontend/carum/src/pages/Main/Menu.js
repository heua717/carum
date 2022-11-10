import styles from "./Menu.module.css";
import MenuBtn from "./MenuButton";
import PetsIcon from "@mui/icons-material/Pets";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Menu({ user }) {
  const navigate = useNavigate();

  const openPage = (page) => {
    if (page === "write" && user.todayDiary) {
      Swal.fire({
        icon: "warning",
        title: "이미 일기를 작성했습니다",
        showConfirmButton: false,
        timer: 800,
      });
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <div>
      <div className={styles.menuBox}>
        <div className={styles.menuRow}>
          <MenuBtn
            onClick={() => openPage("write")}
            icon={
              <i
                className={`bx bxs-book ${styles.large} ${styles.diaryIcon}`}
              ></i>
            }
            menuText="다이어리"
          />
          <MenuBtn
            onClick={() => openPage("calendar")}
            icon={
              <i
                className={`bx bx-calendar ${styles.large} ${styles.calendarIcon}`}
              ></i>
            }
            menuText="내일기"
          />
          <MenuBtn
            onClick={() => openPage(`yearly-pet/${new Date().getFullYear()}`)}
            icon={<PetsIcon sx={{ color: "#3b2a71", fontSize: "48px" }} />}
            menuText="펫조회"
          />
        </div>
        <div className={styles.menuRow}>
          <MenuBtn
            onClick={() => openPage("room")}
            icon={
              <MeetingRoomIcon sx={{ color: "#3b2a71", fontSize: "48px" }} />
            }
            menuText="방 이동"
          />
          <MenuBtn
            onClick={() => openPage("shop")}
            icon={<StoreIcon sx={{ color: "#3b2a71", fontSize: "48px" }} />}
            menuText="상점"
          />
          <MenuBtn
            onClick={() => openPage("profile")}
            icon={<PersonIcon sx={{ color: "#3b2a71", fontSize: "48px" }} />}
            menuText="내정보"
          />
        </div>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.diaryInfoRow}>
          <p className={styles.nicknameText}>{user?.nickname}님 안녕하세요!</p>
          {user?.todayDiary ? (
            <div className={styles.diaryCheckedBox}>
              <p className={styles.diaryCheckedText}>일기 작성 완료</p>
            </div>
          ) : (
            <div>
              <p className={styles.diaryInfoText}>
                오늘은 아직 일기를 작성하지 않았습니다.
              </p>
              <p className={styles.diaryInfoText}>
                일기를 쓰고 포인트를 받으세요!
              </p>
            </div>
          )}
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoText}>내 포인트</p>
          <p className={styles.infoText}>{user?.money} Point</p>
        </div>
      </div>
    </div>
  );
}

export default Menu;

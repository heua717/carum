import styles from "./Menu.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import MenuBtn from "./MenuButton";
import PetsIcon from "@material-ui/icons/Pets";
import StoreIcon from "@material-ui/icons/Store";
import PersonIcon from "@material-ui/icons/Person";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const openPage = (page) => {
    navigate(`/main/${page}`);
  };

  return (
    <div>
      <div className={styles.menuBox}>
        <div className={styles.menuRow}>
          <MenuBtn
            onClick={() => openPage("write")}
            icon={<i className={`bx bxs-book ${styles.large}`}></i>}
            menuText="다이어리"
          />
          <MenuBtn
            onClick={() => openPage("calendar")}
            icon={<i className={`bx bx-calendar ${styles.large}`}></i>}
            menuText="내일기"
          />
          <MenuBtn
            onClick={() => openPage("yearly-pet")}
            icon={<PetsIcon fontSize="large" />}
            menuText="펫조회"
          />
        </div>
        <div className={styles.menuRow}>
          <MenuBtn
            onClick={() => openPage("room")}
            icon={<MeetingRoomIcon fontSize="large" />}
            menuText="방 이동"
          />
          <MenuBtn
            onClick={() => openPage("shop")}
            icon={<StoreIcon fontSize="large" />}
            menuText="상점"
          />
          <MenuBtn
            onClick={() => openPage("profile")}
            icon={<PersonIcon fontSize="large" />}
            menuText="내정보"
          />
        </div>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.infoRow}>
          <p className={styles.infoText}>총 포인트</p>
          <p className={styles.infoText}>10000</p>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.pointCheckBox}>
            <Checkbox disabled checked />
            <p>일기 작성</p>
          </div>
          <div className={styles.pointCheckBox}>
            <Checkbox disabled checked />
            <p>펫 놀아주기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;

import styles from "./TopNav.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

function TopNav({
  text,
  buttonComponent,
  timer,
  petTimer,
  setTimer,
  setPetTimer,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const goTo = () => {
    if (location.pathname === "/main/diary") {
      navigate("/main/calendar");
    } else if (location.pathname === "/main/calendar") {
      navigate("/main");
    } else {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }

      if (petTimer) {
        clearInterval(petTimer);
        setPetTimer(null);
      }
      navigate(-1);
    }
  };

  return (
    <div className={styles.topNav}>
      <div className={styles.goBack}>
        <button className={styles.backBtn} onClick={() => goTo()}>
          <ArrowBackIcon />
        </button>
        <p>{text}</p>
      </div>
      <div className={styles.buttonBox}>
        {buttonComponent ? buttonComponent : null}
      </div>
    </div>
  );
}

export default TopNav;

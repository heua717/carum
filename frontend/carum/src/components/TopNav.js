import styles from "./TopNav.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

function TopNav({ text, buttonComponent }) {
  const navigate = useNavigate();
  const location = useLocation()

  return (
    <div className={styles.topNav}>
      <div className={styles.goBack}>
        <button className={styles.backBtn} onClick={() => ( location.pathname !== '/main/diary' ? navigate(-1) : navigate('/main/calendar'))}>
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

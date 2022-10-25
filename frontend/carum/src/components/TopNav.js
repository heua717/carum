import styles from "./TopNav.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useNavigate } from "react-router-dom";

function TopNav({ text, buttonComponent }) {
  const navigate = useNavigate();

  return (
    <div className={styles.topNav}>
      <div className={styles.goBack}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
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

import { useNavigate } from "react-router-dom";
import styles from "./MonthlyPetButton.module.css";

function MonthlyPetButton({ month, pet }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      onClick={() => navigate("/main/monthly-pet")}
    >
      {pet ? (
        <div className={styles.pet}></div>
      ) : (
        <p className={styles.pet}>데이터가 없습니다</p>
      )}
      <p className={styles.text}>{month}월</p>
    </div>
  );
}

export default MonthlyPetButton;

import { useNavigate } from "react-router-dom";
import styles from "./MonthlyPetButton.module.css";

function MonthlyPetButton({ year, month, pet }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (pet) {
      navigate(`/monthly-pet/${year}/${month}`);
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
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

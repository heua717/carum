import { useNavigate } from "react-router-dom";
import styles from "./MonthlyPetButton.module.css";
import eggImage from "assets/egg.png";
import friedEggImage from "assets/friedEgg.png";
import cryImage from "assets/cry.png";
import moment from "moment";

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
      ) : moment(new Date()).format("YYYY-MM") <=
        `${year}-${month > 9 ? month : "0" + month}` ? (
        <img src={eggImage} alt="egg" className={styles.eggImage} />
      ) : (
        <div className={styles.noDataBox}>
          <img className={styles.cryImage} src={cryImage} />
          <p className={styles.pet}>펫이 없어요</p>
        </div>
        // <img
        //   src={friedEggImage}
        //   alt="friedEgg"
        //   className={styles.friedEggImage}
        // />
      )}
      <p className={styles.text}>{month}월</p>
    </div>
  );
}

export default MonthlyPetButton;

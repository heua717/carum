import styles from "./YearlyPet.module.css";
import TopNav from "../../components/TopNav";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MonthlyPetButton from "./MonthlyPetButton";
import { useState } from "react";

function YearlyPet() {
  const [year, setYear] = useState(2022);

  return (
    <div className={styles.container}>
      <TopNav text="펫 조회" />
      <div className={styles.contentContainer}>
        <div className={styles.navigationBar}>
          <ArrowBackIosIcon onClick={() => setYear(year - 1)} />
          <p>{year}</p>
          <ArrowForwardIosIcon onClick={() => setYear(year + 1)} />
        </div>
        <div>
          <div className={styles.row}>
            <MonthlyPetButton month={1} />
            <MonthlyPetButton month={2} />
            <MonthlyPetButton month={3} />
          </div>
          <div className={styles.row}>
            <MonthlyPetButton month={4} />
            <MonthlyPetButton month={5} />
            <MonthlyPetButton month={6} />
          </div>
          <div className={styles.row}>
            <MonthlyPetButton month={7} />
            <MonthlyPetButton month={8} />
            <MonthlyPetButton month={9} />
          </div>
          <div className={styles.row}>
            <MonthlyPetButton month={10} />
            <MonthlyPetButton month={11} />
            <MonthlyPetButton month={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearlyPet;

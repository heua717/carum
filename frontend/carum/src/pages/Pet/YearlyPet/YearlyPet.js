import styles from "./YearlyPet.module.css";
import TopNav from "components/TopNav";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import MonthlyPetButton from "./MonthlyPetButton";
import { useState } from "react";

function YearlyPet() {
  const [year, setYear] = useState(2022);

  return (
    <div>
      <TopNav text="펫 조회" />
      <div className={styles.contentContainer}>
        <div className={styles.navigationBar}>
          <KeyboardArrowLeftIcon onClick={() => setYear(year - 1)} />
          <p>{year}</p>
          <KeyboardArrowRightIcon onClick={() => setYear(year + 1)} />
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

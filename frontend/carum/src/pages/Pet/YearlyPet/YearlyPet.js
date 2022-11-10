import styles from "./YearlyPet.module.css";
import TopNav from "components/TopNav";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import MonthlyPetButton from "./MonthlyPetButton";
import { useEffect, useState } from "react";
import { fetchYearlyPet } from "apis/pet";
import { useParams } from "react-router-dom";
import { preventRefresh } from "utils/utils";

function YearlyPet() {
  const { year } = useParams();
  const [yearState, setYearState] = useState(year);
  const [petList, setPetList] = useState(null);

  // 년별 펫 데이터 불러오기
  const fetchYearlyPetSuccess = (res) => {
    console.log(res.data);
    setPetList(res.data.petList);
  };

  const fetchYearlyPetFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    fetchYearlyPet(yearState, fetchYearlyPetSuccess, fetchYearlyPetFail);
  }, [yearState]);

  const handleChangeYear = (content) => {
    if (content <= new Date().getFullYear()) {
      setYearState(content);
    }
  };

  // 새로고침 방지
  useEffect(() => {
    window.addEventListener("beforeunload", preventRefresh);
  }, []);

  return (
    <div>
      <TopNav text="펫 조회" />
      <div className={styles.contentContainer}>
        <div className={styles.navigationBar}>
          <KeyboardArrowLeftIcon
            onClick={() => handleChangeYear(yearState - 1)}
          />
          <p>{yearState}</p>
          <KeyboardArrowRightIcon
            onClick={() => handleChangeYear(yearState + 1)}
          />
        </div>
        <div>
          <div className={styles.row}>
            <MonthlyPetButton month={1} year={yearState} pet={petList?.[0]} />
            <MonthlyPetButton month={2} year={yearState} pet={petList?.[1]} />
            <MonthlyPetButton month={3} year={yearState} pet={petList?.[2]} />
          </div>
          <div className={styles.row}>
            <MonthlyPetButton month={4} year={yearState} pet={petList?.[3]} />
            <MonthlyPetButton month={5} year={yearState} pet={petList?.[4]} />
            <MonthlyPetButton month={6} year={yearState} pet={petList?.[5]} />
          </div>
          <div className={styles.row}>
            <MonthlyPetButton month={7} year={yearState} pet={petList?.[6]} />
            <MonthlyPetButton month={8} year={yearState} pet={petList?.[7]} />
            <MonthlyPetButton month={9} year={yearState} pet={petList?.[8]} />
          </div>
          <div className={styles.row}>
            <MonthlyPetButton month={10} year={yearState} pet={petList?.[9]} />
            <MonthlyPetButton month={11} year={yearState} pet={petList?.[10]} />
            <MonthlyPetButton month={12} year={yearState} pet={petList?.[11]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearlyPet;

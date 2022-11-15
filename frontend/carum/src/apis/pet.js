import api from "./api";

const fetchYearlyPet = (year, success, fail) => {
  api
    .get("/pet", {
      params: {
        year,
      },
    })
    .then(success)
    .catch(fail);
};

const fetchMonthlyPet = ({ year, month }, success, fail) => {
  api
    .get("/pet", {
      params: {
        year,
        month,
      },
    })
    .then(success)
    .catch(fail);
};

const chooseMonthlyPet = (type, success, fail) => {
  api
    .put("/pet", {
      type,
    })
    .then(success)
    .catch(fail);
};

export { fetchYearlyPet, fetchMonthlyPet, chooseMonthlyPet };

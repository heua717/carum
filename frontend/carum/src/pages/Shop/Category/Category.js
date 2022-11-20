import { useEffect } from "react";
import { furnitureCategory } from "utils/utils";
import styles from "./Category.module.css";

function Category({ setPlace, setCategoryIndex }) {
  const chooseCategory = (idx) => {
    setCategoryIndex(idx);
    setPlace("shop");
  };

  useEffect(() => {
    setCategoryIndex(null);
  }, []);

  return (
    <div className={styles.contentContainer}>
      {furnitureCategory.map((el, idx) => {
        return (
          <div
            className={styles.category}
            key={idx}
            onClick={() => chooseCategory(idx)}
          >
            <p>{el.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Category;

import styles from "./FurnitureComponent.module.css";

function FurnitureComponent({ furniture, name, have, place, point }) {
  return (
    <div className={styles.container}>
      <div className={styles.furniture}></div>
      <p className={styles.name}>{"dkdkdkdkdk"}</p>
      {have ? null : (
        <div className={styles.priceTag}>
          <span className={styles.priceTagText}>{point}포인트로 구매</span>
        </div>
      )}
    </div>
  );
}

export default FurnitureComponent;

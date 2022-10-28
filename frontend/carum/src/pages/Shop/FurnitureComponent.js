import styles from "./FurnitureComponent.module.css";

function FurnitureComponent({ furniture, name, have, place, point, onClick }) {
  return (
    <div onClick={onClick} className={styles.container}>
      <div className={styles.furniture}></div>
      <p className={styles.name}>{name}</p>
      {place === "shop" ? (
        have ? null : (
          <div className={styles.priceTag}>
            <p className={styles.priceTagText}>{point} point</p>
          </div>
        )
      ) : null}
    </div>
  );
}

export default FurnitureComponent;

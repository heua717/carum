import styles from "./FurnitureComponent.module.css";

function FurnitureComponent({ furniture, name, have, place, point, onClick }) {
  return (
    <div onClick={onClick} className={styles.container}>
      <img className={styles.furnitureImage} src={`${furniture}`} />
      <p>{name}</p>
      {place === "shop" ? (
        have ? (
          <div className={styles.alreadyHave}>
            <p>보유중</p>
          </div>
        ) : null
      ) : null}
    </div>
  );
}

export default FurnitureComponent;

import styles from "./FurnitureComponent.module.css";

function FurnitureComponent({ furniture, name, have, place, point, onClick }) {
  return (
    <div onClick={onClick} className={styles.container}>
      <div className={styles.furniture}>{name}</div>
      {place === "shop" ? have ? null : <div></div> : null}
    </div>
  );
}

export default FurnitureComponent;

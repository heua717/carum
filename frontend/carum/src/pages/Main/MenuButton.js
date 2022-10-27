import styles from "./MenuButton.module.css";

function MenuBtn({ icon, menuText, onClick }) {
  return (
    <div className={styles.menuBtnBox}>
      <button className={styles.menuBtn} onClick={onClick}>
        {icon}
      </button>
      <span className={styles.menuText}>{menuText}</span>
    </div>
  );
}

export default MenuBtn;

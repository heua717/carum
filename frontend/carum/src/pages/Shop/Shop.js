import styles from "./Shop.module.css";
import TopNav from "components/TopNav";
import { useState } from "react";
import Button from "components/Button";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@mui/material/Pagination";
import FurnitureComponent from "./FurnitureComponent";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

function Shop() {
  const [place, setPlace] = useState("myRoom");

  return (
    <div>
      <TopNav
        text="내 가구"
        buttonComponent={
          <Button
            variant="primary"
            size="extraSmall"
            text={place === "myRoom" ? "상점" : "내 가구"}
          />
        }
      />
      <div className={styles.searchBox}>
        <MenuIcon />
        <input />
        <SearchIcon />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.furnitureRow}>
          <FurnitureComponent />
          <FurnitureComponent />
        </div>
        <div className={styles.furnitureRow}>
          <FurnitureComponent />
          <FurnitureComponent />
        </div>
        <Pagination size="small" count={10} className={styles.pagination} />
        <div className={styles.pointBox}>
          <MonetizationOnIcon />
          <span>10,000 포인트</span>
        </div>
      </div>
    </div>
  );
}

export default Shop;

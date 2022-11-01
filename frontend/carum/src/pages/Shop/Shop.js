import styles from "./Shop.module.css";
import TopNav from "components/TopNav";
import { useState } from "react";
import Button from "components/Button";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@mui/material/Pagination";
import FurnitureComponent from "./FurnitureComponent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Shop() {
  const [place, setPlace] = useState("shop");
  const [isOpened, setIsOpened] = useState(false);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentFurnitureIndex, setCurrentFurnitureIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpened = Boolean(anchorEl);
  const [searchText, setSearchText] = useState("");
  const [furnitureList, setFurnitureList] = useState([
    {
      funitureId: 2,
      name: "엄청 편안한 의자",
      price: 6,
      have: false,
    },
    {
      funitureId: 1,
      name: "플레이스테이션",
      price: 7,
      have: true,
    },
    {
      funitureId: 1,
      name: "미끄럼틀",
      price: 100,
      have: true,
    },
    {
      funitureId: 1,
      name: "겁나 푹신한 쿠션",
      price: 9,
      have: false,
    },
  ]);

  // 가구점, 내 가구 이동
  const movePlace = () => {
    if (place === "myRoom") {
      setPlace("shop");
    } else {
      setPlace("myRoom");
    }
  };

  // 가구 dialog 열기
  const handleOpen = (idx) => {
    if (place === "shop" && !furnitureList[idx].have) {
      setIsOpened(true);
      setCurrentFurnitureIndex(idx);
    }
  };

  // 가구 dialog 닫기
  const handleClose = () => {
    setIsOpened(false);
  };

  const handleMenuClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (menu) => {
    setAnchorEl(null);
    setCategory(menu);
  };

  return (
    <div>
      <TopNav
        text="가구점"
        buttonComponent={
          <Button
            variant="primary"
            size="extraSmall"
            text={place === "myRoom" ? "상점" : "내가구"}
            onClick={() => movePlace()}
          />
        }
      />
      <div className={styles.searchBox}>
        <MenuIcon onClick={handleMenuClick} id="menu-bth" />
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpened}
          onClose={handleMenuClose}
          MenuListProps={{ "aria-labelledby": "menu-btn" }}
        >
          <MenuItem onClick={() => handleMenuClose("의자")}>의자</MenuItem>
        </Menu>
        <input
          className={styles.inputBox}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchIcon />
      </div>
      <div className={styles.contentBox}>
        <p className={styles.categoryName}>{category}</p>
        <div className={styles.furnitureRow}>
          <FurnitureComponent
            name={furnitureList[0].name}
            have={furnitureList[0].have}
            place={place}
            point={furnitureList[0].price}
            onClick={() => handleOpen(0)}
          />
          <FurnitureComponent
            name={furnitureList[1].name}
            have={furnitureList[1].have}
            place={place}
            point={furnitureList[1].price}
            onClick={() => handleOpen(1)}
          />
        </div>
        <div className={styles.furnitureRow}>
          <FurnitureComponent
            name={furnitureList[2].name}
            have={furnitureList[2].have}
            place={place}
            point={furnitureList[2].price}
            onClick={() => handleOpen(2)}
          />
          <FurnitureComponent
            name={furnitureList[3].name}
            have={furnitureList[3].have}
            place={place}
            point={furnitureList[3].price}
            onClick={() => handleOpen(3)}
          />
        </div>
        <Pagination
          size="small"
          count={totalPage}
          className={styles.pagination}
        />
      </div>
      {/* 가구 dialog */}
      <Dialog className={styles.dialog} open={isOpened} onClose={handleClose}>
        <div className={styles.dialog}>
          <CloseIcon onClick={handleClose} className={styles.closeBtn} />
          <DialogTitle>{furnitureList[currentFurnitureIndex].name}</DialogTitle>
          <div className={styles.furniture}>가구</div>
          <p className={styles.detailPriceTag}>
            {furnitureList[currentFurnitureIndex].price}
          </p>
          <div className={styles.myPointBox}>
            <p className={styles.myPointText}>내 포인트</p>
            <p className={styles.myPointText}> point</p>
          </div>
          <Button text="구매" variant="light" size="small" />
        </div>
      </Dialog>
    </div>
  );
}

export default Shop;

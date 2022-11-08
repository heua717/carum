import styles from "./Shop.module.css";
import { useCallback, useEffect, useState } from "react";
import Button from "components/Button";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@mui/material/Pagination";
import FurnitureComponent from "./FurnitureComponent";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "components/modal/Modal";
import { furnitureCategory } from "utils/utils";
import { fetchShopItem, purchaseFurniture, fetchMyItem } from "apis/furniture";
import Inventory from "./Inventory/Inventory";
import Category from "./Category/Category";
import { useNavigate } from "react-router-dom";
import { setShopFurnitureList, setInventoryList } from "stores/slices/shop";
import { useAppDispatch, useAppSelector } from "stores/store";
import Swal from "sweetalert2";

function Shop() {
  const [place, setPlace] = useState("category");
  const [isOpened, setIsOpened] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [money, setMoney] = useState(0);
  const [currentFurnitureIndex, setCurrentFurnitureIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpened = Boolean(anchorEl);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // redux
  const { shopFurnitureList } = useAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  const setFurnitureList = useCallback(
    (furnitureList) => {
      dispatch(setShopFurnitureList(furnitureList));
    },
    [dispatch, shopFurnitureList]
  );

  // 가구 불러오기
  const fetchShopItemSuccess = (res) => {
    console.log(res.data);
    setFurnitureList(res.data.furnitureList);
    setMoney(res.data.money);

    let tmpTotalPage = parseInt(res.data.furnitureCount / 9);
    if (res.data.furnitureCount % 9) {
      tmpTotalPage += 1;
    }
    setTotalPage(tmpTotalPage);
  };

  const fetchShopItemFail = (err) => {
    console.log(err);
  };

  //페이지 이동 시, 카테고리 변경 시 가구 검색
  useEffect(() => {
    if (categoryIndex !== null) {
      const payload = {
        keyword: searchText ? searchText : null,
        type: furnitureCategory[categoryIndex].type,
        page: page - 1,
        size: 9,
      };

      fetchShopItem(payload, fetchShopItemSuccess, fetchShopItemFail);
    }
  }, [page]);

  useEffect(() => {
    setSearchText("");
    setPage(1);
    if (categoryIndex !== null) {
      const payload = {
        keyword: null,
        type: furnitureCategory[categoryIndex].type,
        page: 0,
        size: 9,
      };

      fetchShopItem(payload, fetchShopItemSuccess, fetchShopItemFail);
    }
  }, [categoryIndex]);

  const handleFurnitureSearch = () => {
    if (searchText) {
      const payload = {
        keyword: searchText,
        type: null,
        page: 0,
        size: 9,
      };
      fetchShopItem(payload, fetchShopItemSuccess, fetchShopItemFail);
    }
  };

  // 가구점, 내 가구 이동
  const movePlace = () => {
    if (place === "inventory") {
      console.log(categoryIndex);
      if (categoryIndex) {
        setPlace("shop");
      } else {
        setPlace("category");
      }
    } else {
      setPlace("inventory");
    }
  };

  // 가구 dialog 열기
  const handleOpen = (idx) => {
    if (place === "shop" && !shopFurnitureList[idx].have) {
      setIsOpened(true);
      setCurrentFurnitureIndex(idx);
    }
  };

  // 가구 dialog 닫기
  const handleClose = () => {
    setIsOpened(false);
  };

  // 카테고리 메뉴 열고 닫기
  const handleMenuClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (index) => {
    setAnchorEl(null);
    setCategoryIndex(index);
    setPage(1);
  };

  // 페이지 이동
  const handlePageChange = (e, p) => {
    setPage(p);
  };

  // 가구 구매
  const purchaseFurnitureSuccess = (res) => {
    console.log(res);
  };

  const purchaseFurnitureFail = (err) => {
    console.log(err);
    if (err.status === 412) {
      Swal.fire({
        showConfirmButton: false,
        icon: "error",
        title: "돈이 부족합니다",
        timer: 800,
      });
    }
  };

  const handlePurchaseFurniture = (furnitureId) => {
    purchaseFurniture(
      furnitureId,
      purchaseFurnitureSuccess,
      purchaseFurnitureFail
    );
  };

  // 뒤로 가기 버튼 클릭 시
  const goBack = () => {
    if (place === "category") {
      navigate(-1);
    } else if (place === "shop") {
      setPlace("category");
    } else {
      if (categoryIndex) {
        setPlace("shop");
      } else {
        setPlace("category");
      }
    }
  };

  return (
    <div>
      <div className={styles.topNav}>
        <div className={styles.goBack}>
          <button className={styles.backBtn} onClick={goBack}>
            <ArrowBackIcon />
          </button>
          <p>가구점</p>
        </div>
        <div className={styles.buttonBox}>
          <Button
            variant="primary"
            size="extraSmall"
            text={place === "inventory" ? "상점" : "내가구"}
            onClick={() => movePlace()}
          />
        </div>
      </div>
      {place === "shop" ? (
        <div>
          <div className={styles.searchBox}>
            {/* <MenuIcon onClick={handleMenuClick} id="menu-bth" />
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpened}
              onClose={handleMenuClose}
              MenuListProps={{ "aria-labelledby": "menu-btn" }}
              sx={{ maxHeight: "200px" }}
            >
              {furnitureCategory.map((el, idx) => {
                return (
                  <MenuItem onClick={() => handleMenuClose(idx)} key={idx}>
                    {el.name}
                  </MenuItem>
                );
              })}
            </Menu> */}
            <input
              className={styles.inputBox}
              value={searchText}
              placeholder="전체 검색"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <SearchIcon onClick={handleFurnitureSearch} />
          </div>
          <div className={styles.contentBox}>
            <p className={styles.categoryName}>
              {furnitureCategory?.[categoryIndex]?.name}
            </p>
            <div className={styles.furnitures}>
              {shopFurnitureList?.map((el, idx) => {
                return (
                  <FurnitureComponent
                    name={el.name}
                    have={el.have}
                    place={place}
                    point={el.price}
                    onClick={() => handleOpen(idx)}
                    key={idx}
                  />
                );
              })}
            </div>
            {shopFurnitureList?.length > 0 ? (
              <Pagination
                size="small"
                count={totalPage}
                className={styles.pagination}
                onChange={handlePageChange}
                defaultPage={1}
                page={page}
              />
            ) : (
              <p>가구가 없습니다.</p>
            )}
          </div>
          {/* 가구 dialog */}
          <Modal
            open={isOpened}
            header={shopFurnitureList?.[currentFurnitureIndex]?.name}
            close={() => handleClose()}
          >
            <div className={styles.dialog}>
              <div className={styles.furniture}>가구</div>
              <p className={styles.detailPriceTag}>
                {shopFurnitureList?.[currentFurnitureIndex]?.price}
              </p>
              <div className={styles.myPointBox}>
                <p className={styles.myPointText}>내 포인트</p>
                <p className={styles.myPointText}>{money} point</p>
              </div>
              <Button
                text="구매"
                variant="light"
                size="small"
                onClick={() =>
                  handlePurchaseFurniture(
                    shopFurnitureList?.[currentFurnitureIndex]?.id
                  )
                }
              />
            </div>
          </Modal>
        </div>
      ) : place === "category" ? (
        <Category setPlace={setPlace} setCategoryIndex={setCategoryIndex} />
      ) : (
        <Inventory furnitureList={shopFurnitureList} place={place} />
      )}
    </div>
  );
}

export default Shop;

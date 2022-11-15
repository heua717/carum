import { useCallback, useEffect, useState } from "react";
import styles from "./Inventory.module.css";
import FurnitureComponent from "../FurnitureComponent";
import Pagination from "@mui/material/Pagination";
import { useAppDispatch, useAppSelector } from "stores/store";
import { setInventoryList } from "stores/slices/shop";
import { fetchMyItem } from "apis/furniture";
import { errorAlert } from "utils/utils";

function Inventory({ place, setPlace }) {
  // redux
  const { inventoryList } = useAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  const setInventory = useCallback(
    (inventoryList) => {
      dispatch(setInventoryList(inventoryList));
    },
    [dispatch, inventoryList]
  );

  const [newPage, setNewPage] = useState(1);
  const [newTotalPage, setNewTotalPage] = useState(1);

  const fetchMyItemSuccess = (res) => {
    console.log(res.data);
    setInventory(res.data.furnitureList);
    setNewTotalPage(
      res.data.furnitureList.length % 9
        ? parseInt(res.data.furnitureList.length / 9) + 1
        : parseInt(res.data.furnitureList.length / 9)
    );
  };

  const fetchMyItemFail = (err) => {
    console.log(err);
    errorAlert("가구를 불러오지 못했어요.");
    setPlace("category");
  };

  useEffect(() => {
    fetchMyItem(fetchMyItemSuccess, fetchMyItemFail);
  }, []);

  const handleInventoryPage = (e, p) => {
    setNewPage(p);
  };

  return (
    <div>
      {inventoryList?.length > 0 ? (
        <div className={styles.contentBox}>
          <div className={styles.furnitures}>
            {inventoryList
              .slice((newPage - 1) * 9, newPage * 9)
              .map((el, idx) => {
                return (
                  <FurnitureComponent key={idx} name={el.name} place={place} />
                );
              })}
          </div>
          <div className={styles.paginationBox}>
            <Pagination
              size="small"
              count={newTotalPage}
              className={styles.pagination}
              onChange={handleInventoryPage}
              defaultPage={1}
              page={newPage}
            />
          </div>
        </div>
      ) : (
        <p className={styles.inventoryNoDataText}>가구가 없습니다.</p>
      )}
    </div>
  );
}

export default Inventory;

const { default: api } = require("./api");

const fetchShopItem = ({ keyword, type, size, page }, success, fail) => {
  api
    .get("/shop", {
      params: {
        keyword,
        type,
        size,
        page,
      },
    })
    .then(success)
    .catch(fail);
};

const fetchMyItem = (success, fail) => {
  api.get("/inventory").then(success).catch(fail);
};

const purchaseFurniture = (furnitureId, success, fail) => {
  api
    .post("/shop", {
      furnitureId,
    })
    .then(success)
    .catch(fail);
};

export { fetchShopItem, purchaseFurniture, fetchMyItem };

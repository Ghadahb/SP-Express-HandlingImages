const express = require("express");
const upload = require("../../middleware/multer");
// const { productCreate } = require("../controllers");

const {
  shopListFetch,
  fetchShop,
  shopCreate,
  productCreate,
} = require("./shops.controllers");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "Shop Not Found!" });
  }
});

router.get("/", shopListFetch);

router.post("/", upload.single("image"), shopCreate);

router.post("/:shopId/products", upload.single("image"), productCreate);



module.exports = router;
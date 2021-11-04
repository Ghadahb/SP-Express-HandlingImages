const express = require("express");
const upload = require("../../middleware/multer");

const {
  getShops,
  shopCreate,
  productDelete,
  productUpdate,
  productDetailFetch,
  fetchProduct,
  productListFetch,
  productCreate,
} = require("./controllers");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    next({ status: 404, message: "Product Not Found!" });
  }
});

router.post("/", shopCreate);

router.get('/', getShops);

router.get("/:productId", productDetailFetch);

router.get("/", productListFetch);

router.put("/:productId", upload.single("image"), productUpdate);

router.delete("/:productId", productDelete);

module.exports = router;

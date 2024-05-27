const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryWithId,
  updateCategoryWithId,
  deleteCategoryWithId,
  categoryWiseExpenseTracking,
} = require("../controllers/category.controllers");
const auth = require("../middlewares/auth.middlewares");

const router = express.Router();

router.route("/").post(auth, createCategory).get(auth, getAllCategories);

router
  .route("/:id")
  .get(auth, getCategoryWithId)
  .put(auth, updateCategoryWithId)
  .patch(auth, updateCategoryWithId)
  .delete(auth, deleteCategoryWithId);

router.route("/type/:category").get(auth, categoryWiseExpenseTracking);

module.exports = router;

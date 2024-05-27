const express = require("express");
const {
  createTransaction,
  readTransaction,
  readTransactionById,
  updateTransactionById,
  deleteTransactionById,
} = require("../controllers/transaction.controllers");
const auth = require("../middlewares/auth.middlewares");

const router = express.Router();

router.route("/").post(auth, createTransaction).get(auth, readTransaction);

router
  .route("/:id")
  .get(auth, readTransactionById)
  .put(auth, updateTransactionById)
  .patch(auth, updateTransactionById)
  .delete(auth, deleteTransactionById);

module.exports = router;

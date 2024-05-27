const express = require("express");
const { login, register } = require("../controllers/user.controllers");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;

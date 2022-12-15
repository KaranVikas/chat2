// write all routes rtelated to our user
const express = require("express");

const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/").get(protect, allUsers);

module.exports = router;

const express = require("express");
const {
  SignUp,
  Login,
  GetAllUser,
  GetSingleUser,
  UpdateSingleUser,
  deleteSingleUser,
} = require("../controller/Usercontroler");

const router = express.Router();

router.post("/", SignUp);

router.post("/login", Login);

router.put("/:id", UpdateSingleUser);

router.delete("/:id", deleteSingleUser);

router.get("/:id", GetSingleUser);

router.get("/", GetAllUser);

module.exports = router;

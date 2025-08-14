const express = require("express");
const {
  CreateMail,
  GetAllMsg,
  GetSingleMsg,
  UpdateSingleMsg,
  DeleteSinglemsg,
} = require("../controller/Mailcontroller");

const router = express.Router();

router.post("/", CreateMail);
router.get("/", GetAllMsg);
router.get("/:id", GetSingleMsg);
router.put("/:id", UpdateSingleMsg);
router.delete("/:id", DeleteSinglemsg);

module.exports = router;

const express = require("express");
const router = express.Router();
const service = require("./mem.service");

router.get("/", service.getUsers);
router.get("/:id", service.getUser);
router.post("/", service.createUser);
router.put("/:id", service.updateUser);
router.delete("/:id", service.deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const ctrl = require("./mem.ctrl");

router.get("/", ctrl.getUsers);
router.get("/:id", ctrl.getUser);
// router.post("/", ctrl.createUser);
// router.put("/:id", ctrl.updateUser);
// router.delete("/:id", ctrl.deleteUser);

module.exports = router;

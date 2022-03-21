const express = require("express");
const router = express.Router();
const ctrl = require("./mem.ctrl");

router.get("/", ctrl.getUser);
// router.get("/:id", ctrl.getUsers);
// router.post("/", ctrl.createUser);
// router.put("/:id", ctrl.updateUser);
// router.delete("/:id", ctrl.deleteUser);

module.exports = router;

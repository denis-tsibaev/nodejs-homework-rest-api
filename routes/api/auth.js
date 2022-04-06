const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

// у Богдана в уроке register, в ДЗ signup
router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

// можно как в дз router.post("/signin")
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;

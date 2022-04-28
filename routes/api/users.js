const express = require("express");

const { auth, ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/users/avatars",
  auth,
  upload.single("image")
  //   ctrlWrapper(ctrl.getCurrent)
);

module.exports = router;

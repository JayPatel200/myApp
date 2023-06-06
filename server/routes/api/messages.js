const express = require("express");
const router = express.Router();
const messagesController = require("../../controllers/messagesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), messagesController.saveNewMessage)
  .get(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), messagesController.getAllMessages)

module.exports = router;

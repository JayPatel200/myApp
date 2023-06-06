const express = require('express');
const router = express.Router();
const houseController = require('../../controllers/houseController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), houseController.createNewHouse)
    .get(verifyRoles(ROLES_LIST.Editor), houseController.getAllHouses)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), houseController.deleteHouse);

router.route('/:id')
    .get(verifyRoles(houseController.getHouses));

module.exports = router;
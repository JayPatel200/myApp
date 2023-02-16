const express = require('express');
const router = express.Router();
const tenantsController = require('../../controllers/tenantsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(tenantsController.getAllTenants)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), tenantsController.createNewTenant)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), tenantsController.updateTenant)
    .delete(verifyRoles(ROLES_LIST.Admin), tenantsController.deleteTenant);

router.route('/:id')
    .get(tenantsController.getTenant);

module.exports = router;
const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/tasksController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), tasksController.getAllTasks)
    .delete(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), tasksController.deleteTask);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor), tasksController.getTask);

module.exports = router;
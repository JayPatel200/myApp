const User = require('../model/User');
const House = require("../model/Houses");

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUsers = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'House ID required' });
    const users = await House.find({ allowedHouses: req.params.id }).exec();
    if (!users) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found in the house` });
    }
    res.json(users.username);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUsers,
}
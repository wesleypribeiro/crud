const usersModel = require('../models/users');

const getAll = async (req, res) => {
    const users = await usersModel.getAll();
    return res.status(200).json(users);
}

const findUser = async (req, res) => {
    const { name } = req.params;
    const user = await usersModel.findUser(name);
    return res.status(200).json(user);
}

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const newUser = await usersModel.createUser(name, email);
    return res.status(201).json(newUser);
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await usersModel.deleteUser(id);
    return res.status(204);
}

const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email} = req.body;
    const editedUser = await usersModel.editUser(id, name, email);
    return res.status(200).json(editedUser);
}

module.exports = {
    getAll,
    findUser,
    createUser,
    deleteUser,
    editUser
}
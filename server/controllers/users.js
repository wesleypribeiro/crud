const usersModel = require("../models/users");
const userServices = require('../services/users');
const emailServices = require('../services/email');

const getAll = async (req, res) => {
  const users = await usersModel.getAll();
  return res.status(200).json(users);
};

const findUser = async (req, res) => {
  const { name } = req.params;
  const user = await usersModel.findUser(name);
  return res.status(200).json(user);
};

const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  const newUser = await userServices.isValid(name, email);
  if (newUser.error) {
    return next(newUser);
  }
  return res.status(201).json(newUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await usersModel.deleteUser(id);
  return res.status(204);
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const editedUser = await usersModel.editUser(id, name, email);
  return res.status(200).json(editedUser);
};

const sortUser = async (req, res) => {
  const users = await usersModel.getAll();
  const sortedNames = userServices.sortNames(users);
  await emailServices.sendEmail(sortedNames);
};

module.exports = {
  getAll,
  findUser,
  createUser,
  deleteUser,
  editUser,
  sortUser,
};

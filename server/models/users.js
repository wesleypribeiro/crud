const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
    return connection()
        .then((db) => db.collection('users').find().toArray());
}

const findUser = async (name) => {
    return connection()
        .then((db) => db.collection('users').findOne({name}));
}

const createUser = async (name, email) => {
    return connection()
        .then((db) => db.collection('users').insertOne({name, email}))
        .then((result) => result.ops[0]);
}

const deleteUser = async (id) => {
    return connection()
        .then((db) => db.collection('users').deleteOne({ _id: ObjectId(id)}));
}

const editUser = async (id, name, email) => {
    return connection()
        .then((db) => db.collection('users').updateOne({ _id: ObjectId(id)}, { $set: { name, email }}))
        .then(() => ({_id: id, name, email}));
}

module.exports = {
    getAll,
    findUser,
    createUser,
    deleteUser,
    editUser
}
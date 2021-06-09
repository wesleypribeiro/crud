import api from "./api";

export const getAll = (callback) => {
  api.get('/users').then((response) => callback(response.data));
};

export const createUser = (name, email) => {
    return api.post('/users', {name, email});
}

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
}

export const editUser = (id, name, email) => {
  return api.put(`/users/${id}`, {id, name, email});
}

export const sortPairs = () => {
  return api.get('/users/sort');
}
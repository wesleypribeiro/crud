const userModel = require('../models/users');

const pattern = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

const isValid = async (name, email) => {
  if (name === "") {
    return ({error: "Nome não pode estar vazio!"});
  }

  if (!pattern.test(email)) {
    return ({error: "E-mail inválido!"});
  }

  const newUser = await userModel.createUser(name, email);

  return newUser;
};

const sortNames = (names) => {
  const sortedNames = sortPairs(names);
  const _sortedNames = sortedNames.map((pairs) => {
    const { name, email } = pairs[0];
    const { name: pair } = pairs[1];
    return { name, pair, email };
  });
  return _sortedNames;
};

const sortPairs = (names) => {
  const _pairs = [];
  const _names = [...names];

  _names.sort(() => Math.random() - 0.5);

  for (let i = 0; i < _names.length; i++) {
    _pairs.push([_names[i], _names[i != _names.length - 1 ? i + 1 : 0]]);
  }

  return _pairs;
};

module.exports = {
  sortNames,
  isValid,
};

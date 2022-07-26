const { dataUser } = require("../dbContent/users/user");

const firstPage = async (req, res) => {
  res.status(200).send("User server");
};

const getAllUsers = async (req, res) => {
  res.status(200).send(dataUser);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const userResponse = dataUser.filter((user) => user.id === Number(id));
  res.status(200).send(userResponse);
};

const getUserByName = async (req, res) => {
  const { name } = req.query;
  const checkName = dataUser.filter((user) => user.name === name);
  res.status(200).send(checkName);
};

const createUser = async (req, res) => {
  const newUser = req.body;
  const { id } = req.body;
  const checkId = checkIfUserExists(id);
  if (checkId) {
    dataUser.push(newUser);
    res.status(201).send("User added!");
} else {
  console.log(error);
  res.status(404).send(error.message`- Operation not succeded`);
}
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    const isUser = checkIfUserExists(id);
    if (isUser) throw new Error("Resource not found.");
    const user = updateUserInfo(req.body);
    const oldUsers = dataUser.filter((item) => item.id !== id);
    const newUsers = [...oldUsers, user];
    res.status(200).json(newUsers);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

// Private functions

const updateUserInfo = ({ id, name, birthDate }) => {
  return dataUser.reduce((acc, currentUser) => {
    const checkedUser = currentUser.id === id;
    if (checkedUser) {
      acc = { ...acc, ...{ id, name, birthDate } };
    }
    return acc;
  }, {});
};

const deleteUser = (req, res) => {
  const { id } = req.body;
  const isUser = checkIfUserExists(id);
  const index = returnIndex(id);
  if (isUser) {
    console.log(error);
    res.status(404).send(error.message`- Operation not succeded`);
  } else {
    dataUser.splice(index, 1);
    res.status(200).send(`User deleted successfully`);
  }
};

const returnIndex = (id) => {
  const user = dataUser.findIndex((user) => user.id === Number(id));
  return user;
};

const checkIfUserExists = (id) => {
  const user = dataUser.filter((item) => item.id === Number(id));
  return !user.length > 0;
};

module.exports = {
  firstPage,
  getUser,
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};
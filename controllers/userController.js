const { dataUser } = require("../dbContent/users/user");

const firstPage = (req, res) => {
  res.status(200).send("User server"); 
};

const getAllUsers = (req, res) => {
  res.status(200).send(dataUser); 
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isUser = checkIfUserExists(id);
    if (isUser) res.status(404).send("NOT_FOUND");
    const userResponse = dataUser.filter((user) => user.id === Number(id));
    res.status(200).send(userResponse);
  } catch (err) {
    res.status(400).send("BAD_REQUEST");
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.query;
    const checkName = dataUser.filter((user) => user.name === name);
    res.status(200).send(checkName);
  } catch (err) {
    res.status(400).send("BAD_REQUEST");
  }  
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const { id } = req.body;
    const checkId = checkIfUserExists(id);
    if (checkId) {
      dataUser.push(newUser);
      res.status(201).send("CREATED!");
    } else {
      res.status(400).send("BAD_REQUEST");
    }
  } catch (err) {
    res.status(400).send("BAD_REQUEST");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedUser = req.body;
    const index = returnIndex(id);
    const isUser = checkIfUserExists(id);
    if (isUser) res.status(404).send("NOT_FOUND");
    dataUser.splice(index, 1, updatedUser);
    res.status(200).send("OK!");
  } catch (err) {
    res.status(400).send("BAD_REQUEST");
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const isUser = checkIfUserExists(id);
    const index = returnIndex(id);
    if (isUser) res.status(404).send("NOT_FOUND");
    dataUser.splice(index, 1);
    res.status(204).send("NO_CONTENT");
  } catch (err) {
    res.status(400).send("BAD_REQUEST");
  }
};

// Private functions

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
const { dataTshirt } = require("../dbContent/products/tshirts");

const firstPage = (req, res) => {
    res.status(200).send("Product server")
}

const getAllProducts = (req, res) => {
  res.status(200).send(dataTshirt);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const isUser = checkIfProductExists(id);
  if (isUser) throw new Error(err.message);
  else {
    const searchIdResult = dataTshirt.filter(
      (product) => product.id === Number(id)
    );
    res.status(200).send(searchIdResult);
  }
};

const getProductBySize = async (req, res) => {
  const { size } = req.query;
  const response = dataTshirt.reduce((acc, product) => {
    const checkedSize = product.size === size;
    if (checkedSize) acc = [...acc, product];
    return acc;
  }, []);
  res.send(response);
};

const createProduct = (req, res) => {
  const newProduct = req.body;
  const { id } = req.body;
  const checkId = checkIfProductExists(id);
  if (checkId) {
    dataTshirt.push(newProduct);
    res.status(201).send("Product added!");
  } else {
    console.log(error);
    res.status(404).send(error.message`- Operation not succeded`);
  }
};

const updateProduct = (req, res) => {
  const updatedProduct = req.body;
  const { id } = req.body;
  const index = getProductIndex(id);
  dataTshirt.splice(index, 1, updatedProduct);
  res.status(200).send("Product updated!");
};

const deleteProduct = (req, res) => {
  const { id } = req.body;
  const isUser = checkIfProductExists(id);
  const index = getProductIndex(id);
  if (isUser) {
    console.log(error);
    res.status(404).send(error.message`- Operation not succeded`);
  } else {
    dataTshirt.splice(index, 1);
    res.status(200).send(`Product deleted successfully`);
  }
};

function checkIfProductExists(id) {
  const product = dataTshirt.filter((user) => user.id === Number(id));
  return !product.length > 0;
}

function getProductIndex(id) {
  const index = dataTshirt.findIndex((product) => product.id === id);
  return index;
}

module.exports = {
  firstPage,
  getProductBySize,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
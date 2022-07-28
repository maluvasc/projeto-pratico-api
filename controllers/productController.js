const { dataTshirt } = require("../dbContent/products/tshirts");

const firstPage = (req, res) => {
    res.status(200).send("Product server"); 
}

const getAllProducts = (req, res) => {
  res.status(200).send(dataTshirt); 
};

const getProductById = async (req, res) => {
  try{
  const { id } = req.params;
  const isProduct = checkIfProductExists(id);
  if (isProduct) res.status(404).send("NOT_FOUND")
  const searchIdResult = dataTshirt.filter((product) => product.id === Number(id));
  res.status(200).send(searchIdResult);
 } catch(err) {
  res.status(400).send("BAD_REQUEST");
  }
};

const getProductBySize = async (req, res) => {
  try{
    const { size } = req.query;
    if(size === "small" || "medium" || "large"){
      const response = dataTshirt.reduce((acc, product) => {
        const checkedSize = product.size === size;
        if (checkedSize) acc = [...acc, product];
        return acc;
      }, []);
      res.send(response);
      //ERR AND REDIRECT NOT WORKING YET
    } else {
      console.log(size) //test
      res.redirect("/api/products/tshirts");
    }
  } catch(err) {
    res.status(400).send("BAD_REQUEST");
  }
};

const createProduct = (req, res) => {
  try{
    const newProduct = req.body;
    const { id } = req.body;
    const checkId = checkIfProductExists(id);
    if (checkId) {
      dataTshirt.push(newProduct);
      res.status(201).send("CREATED!");
    } else {
      res.status(400).send("BAD_REQUEST");
    }
  }
  catch(err) {
    res.status(400).send("BAD_REQUEST");
  }
};

const updateProduct = (req, res) => {
  try{
    const { id } = req.body;
    const updatedProduct = req.body;
    const index = getProductIndex(id);
    const isProduct = checkIfProductExists(id);
    if (isProduct) res.status(404).send("NOT_FOUND");
    dataTshirt.splice(index, 1, updatedProduct);
    res.status(200).send("OK!");
  } catch(err) {
    res.status(400).send("BAD_REQUEST");
  }
};

const deleteProduct = (req, res) => {
  try{
    const { id } = req.params;
    const isProduct = checkIfProductExists(id);
    const index = getProductIndex(id);
    if (isProduct) res.status(404).send("NOT_FOUND");
    dataTshirt.splice(index, 1);
    res.status(204).send("NO_CONTENT");
    }
    catch(err) {
      res.status(400).send("BAD_REQUEST");
    }
};

//Private functions

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
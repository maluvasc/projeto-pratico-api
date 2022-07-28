const express = require('express');
const router = express.Router()
const { createValidator } = require('express-joi-validation')
const validator = createValidator({});
const { tshirtQuerySchema, userParamSchema, productParamSchema, productDefaultBodySchema } = require('../middleware/validator');
const controller = require('../controllers/productController');

router.get('/', controller.firstPage)
router.get('/tshirts', controller.getAllProducts)
router.get('/tshirts/:id', validator.params(productParamSchema), controller.getProductById)
router.get('/tshirt', validator.query(tshirtQuerySchema), controller.getProductBySize)
router.post('/tshirts', validator.body(productDefaultBodySchema), controller.createProduct)
router.put('/tshirts', validator.body(productDefaultBodySchema), controller.updateProduct)
router.delete('/tshirts/:id', validator.params(productParamSchema), controller.deleteProduct)


module.exports = router
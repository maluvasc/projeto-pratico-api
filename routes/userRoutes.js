const express = require('express');
const router = express.Router()
const { createValidator } = require('express-joi-validation')
const validator = createValidator({});
const { userQuerySchema, userDefaultBodySchema, userParamSchema } = require('../middleware/validator');
const controller = require('../controllers/userController');

router.get('/', controller.firstPage)
router.get('/user', validator.query(userQuerySchema), controller.getUserByName)
router.get('/users', controller.getAllUsers)
router.get('/users/:id', validator.params(userParamSchema), controller.getUser)
router.post('/users', validator.body(userDefaultBodySchema), controller.createUser)
router.put('/users', validator.body(userDefaultBodySchema), controller.updateUser)
router.delete('/users', validator.body(userDefaultBodySchema), controller.deleteUser)


module.exports = router;
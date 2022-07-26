const Joi = require('joi');

const userQuerySchema = Joi.object({
    name: Joi.string().required()
});

const userParamSchema = Joi.object({
    id: Joi.number().required()
});

const productParamSchema = Joi.object({
    id: Joi.number().required()
});

const userDefaultBodySchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    birthDate: Joi.string().required()
});

const productDefaultBodySchema = Joi.object({
    id: Joi.number().required(),
    size: Joi.string().required(),
    description: Joi.string().required()
});

const tshirtQuerySchema = Joi.object({
    size: Joi.string().required()
});

module.exports = {
    userQuerySchema,
    userParamSchema,
    userDefaultBodySchema,
    tshirtQuerySchema,
    productParamSchema,
    productDefaultBodySchema,
}
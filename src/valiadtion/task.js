const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).allow(""), // Optional field
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).optional(),
  perPage: Joi.number().integer().min(1).max(100).default(10).optional(),
});

module.export = {
  todoSchema,
  paginationSchema,
};

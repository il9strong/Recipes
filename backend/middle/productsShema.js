const Joi = require('joi');

const ProductSchema = Joi.object({
  name: Joi.string().required(),
  user_id: Joi.number().integer().required(),
  img: Joi.string().allow(null),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateProduct = (data) => {
  return ProductSchema.validate(data, { abortEarly: false });
};

module.exports = { validateProduct };

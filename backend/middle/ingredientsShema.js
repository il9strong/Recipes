const Joi = require('joi');

const IngredientSchema = Joi.object({
  recipe_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
  count: Joi.number().integer().allow(null),
  weight: Joi.number().precision(2).allow(null),
  name: Joi.string().allow(null),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateIngredient = (IngredientSchema) => (req,res,next) => {
    const {error} = IngredientSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateIngredient = validateIngredient(IngredientSchema);

const Joi = require('joi');

const RecipeSchema = Joi.object({
  name: Joi.string().required(),
  category_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
	img: Joi.string().allow(null),
	description: Joi.string().allow(null),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateRecipe = (RecipeSchema) => (req,res,next) => {
    const {error} = RecipeSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateRecipe = validateRecipe(RecipeSchema);

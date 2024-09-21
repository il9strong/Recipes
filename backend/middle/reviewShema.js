const Joi = require('joi');

const ReviewSchema = Joi.object({
  text: Joi.string().allow(null),
  date: Joi.date().allow(null),
  recipe_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null),
	rating: Joi.number().integer().required()
});

const validateReview = (ReviewSchema) => (req,res,next) => {
    const {error} = ReviewSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateReview = validateReview(ReviewSchema);

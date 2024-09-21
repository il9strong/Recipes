const Joi = require('joi');

const TypeSchema = Joi.object({
  name: Joi.string().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateType = (TypeSchema) => (req,res,next) => {
    const {error} = TypeSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateType = validateType(TypeSchema);

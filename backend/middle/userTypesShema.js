const Joi = require('joi');

const UserTypeSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  type_id: Joi.number().integer().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateUserType = (UserTypeSchema) => (req,res,next) => {
    const {error} = UserTypeSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateUserType = validateUserType(UserTypeSchema);

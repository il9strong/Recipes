const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().allow(null),
  login: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null),
});

const validateUser = (UserSchema) => (req,res,next) => {
    const {error} = UserSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}

exports.validateUser = validateUser(UserSchema);

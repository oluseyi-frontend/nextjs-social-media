import Joi from 'joi'



const handleRegistrationValidation = (data) => {
  const registerSchema = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  });

  return registerSchema.validate(data);
};

// const handleAccountUpdateValidation = (data) => {
//   const registerSchema = Joi.object({
//     email: Joi.string().required().email(),
//     first_name: Joi.string().min(2).required(),
//     last_name: Joi.string().min(2).required(),
//     address: Joi.string().required(),
//     phone: Joi.string().required(),
//     state: Joi.string().required(),
//     lga: Joi.string().required(),
//   });

//   return registerSchema.validate(data);
// };

const handleLoginValidation = (data) => {
  const loginSchema = Joi.object({
    username: Joi.string().required().min(4),
    password: Joi.string().required().min(6),
  });
  return loginSchema.validate(data);  
};

const handleCommentBodyValidation = (data) => {
  const commentSchema = Joi.object({
    body: Joi.string().required().min(4),
  });
  return commentSchema.validate(data);
};

module.exports.handleRegistrationValidation = handleRegistrationValidation;
module.exports.handleLoginValidation = handleLoginValidation;
module.exports.handleCommentBodyValidation = handleCommentBodyValidation;
// module.exports.handleAccountUpdateValidation = handleAccountUpdateValidation;

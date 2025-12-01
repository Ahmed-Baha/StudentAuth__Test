const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}).unknown(true);;
const studentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().min(1).max(90).required(),
  classId: Joi.string().required()
});


module.exports =  {registerSchema,studentSchema} ;

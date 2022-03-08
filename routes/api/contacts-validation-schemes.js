const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Поле name обязательное",
    "string.empty": "Поле name не может быть пустым",
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = schemaCreateContact;

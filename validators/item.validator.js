const Joi = require("joi");
const CONST = require("../const");

const itemObject = {
  name: Joi.string()
    .required()
    .messages({
      "any.required": `${CONST.NAME_REQUIRED}`,
    }),
  description: Joi.string(),
  price: Joi.number()
    .required()
    .messages({
      "any.required": `${CONST.PRICE_REQUIRED}`,
    }),
};
const ItemSchema = Joi.object(itemObject);

module.exports = {
  ItemSchema,
} 

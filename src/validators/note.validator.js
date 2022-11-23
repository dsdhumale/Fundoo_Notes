import Joi from '@hapi/joi';

//Fuction for validate notes details
export const noteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().required(),
    Description: Joi.string().required(), 
    Colour: Joi.string().optional(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

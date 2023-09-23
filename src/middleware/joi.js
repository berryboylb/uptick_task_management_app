const createHttpError = require('http-errors');
const Joi = require('joi')
function validateBody(validator) {

    return async function(req, res, next) {
        try {
            const validated = await validator.validateAsync(req.body);
            req.body = validated
            next()
        } catch (err) {
            if(err.isJoi) 
                return next(createHttpError(422, {message: err.message}))
            next(createHttpError(500))
        }
    }
}

function validateQuery(schema) {
  return (req, res, next) => {
    if (Object.keys(req.query).length === 0) {
      // No query parameters provided, skip validation
      return next();
    }
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

module.exports = {
  validateBody,
  validateQuery,
};

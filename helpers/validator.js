const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('cod_account').isNumeric().isLength({ min: 5, max: 5 }),
    body('nom_account').isString().isLength({ min: 3 }),
  ]
}
                    
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}
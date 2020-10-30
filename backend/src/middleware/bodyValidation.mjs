import validator from 'express-validator';

const { validationResult } = validator;

export const validate = validations => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));

  let errors = validationResult(req);

  if (errors.isEmpty()) return next();

  errors = errors.array().map(({ param, msg }) => ({ [`${param}`]: msg }));

  return res.status(400).json({ errors });
};

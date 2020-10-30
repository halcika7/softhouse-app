import validator from 'express-validator';

const { check } = validator;

const PasswordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,15})'
);

export const checkPassword = check('password')
  .isLength({ min: 5, max: 15 })
  .withMessage('Password must contain between 5 and 15 chars')
  .matches(PasswordRegex)
  .withMessage(
    'Password needs to contain both lower and upper case characters, number and a special character'
  );

export const checkPassword2 = check('password2')
  .custom((password2, { req }) => {
    if (password2 !== req.body.password) {
      throw new Error();
    }
    return true;
  })
  .withMessage('Passwords do not match');

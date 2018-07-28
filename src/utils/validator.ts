import { body } from 'express-validator/check';
export const checkSignup = [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").isLength({ min: 4 }).withMessage("Password must be 4 characters or more")
]
export const checkLogin = [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").isLength({ min: 4 }).withMessage("Password must be 4 characters or more")
]
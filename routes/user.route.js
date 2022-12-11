import { Router } from "express";
import { body } from 'express-validator';
import { CreateUserController, LoginUser } from "../controller/user.controller";
import catchAsyncError from "../utils/catchAsyncError";
export const UserRouter = Router()

UserRouter.post(
  '/register',
  body('name', 'name is required').notEmpty(),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'password should be of 8 - 16 characters length').isLength({
    min: 8,
    max: 16
  }),
  body(
    'password',
    'Please enter a password with atleast one lower case character'
  ).matches(/^(?=.*[a-z])[0-9a-zA-Z!@#$&()\\-`.+,/]{1,}$/),
  body(
    'password',
    'Please enter a password with atleast one upper case character'
  ).matches(/^(?=.*[A-Z])[0-9a-zA-Z!@#$&()\\-`.+,/]{1,}$/),
  body('password', 'Please enter a password with atleast one number').matches(
    /^(?=.*\d)[0-9a-zA-Z!@#$&()\\-`.+,/]{1,}$/
  ),
  body('age', 'please enter age between 18 and 65').custom(a => a <= 65 && a >= 18),
  body('phone', 'please enter valid phone').matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/),
  (req, res, next) => {
    catchAsyncError(CreateUserController, req, res, next)
  }
)

UserRouter.post(
  '/login',
  body('email', 'Enter valid email').isEmail(),
  body('password', 'please enter valid password').matches(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/gim
  ),
  (req, res, next) => {
    catchAsyncError(LoginUser, req, res, next)
  }
)
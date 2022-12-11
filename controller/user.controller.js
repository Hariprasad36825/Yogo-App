import { validationResult } from 'express-validator'
import { CommonError, userError, wrapper } from '../Responses'
import {
  comparePassword,
  createToken,
  CreateUser,
  getUser
} from '../services/user.service'
import {
  CONFLICT,
  CREATION_SUCCESSFULL,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED
} from '../statusCodes'

export const CreateUserController = async (req, res) => {
  // validates request body
  validationResult(req).throw()

  const { email, password, name, age, phone } = req.body

  // check user already exists
  if ((await getUser(email)) !== null) {
    return res.status(CONFLICT).send(wrapper(userError.exists))
  }

  // insert user
  const user = await CreateUser(email, password, name, age, phone)
  if (user) {
    return res.status(CREATION_SUCCESSFULL).send(await createToken(user))
  }
  res.status(INTERNAL_SERVER_ERROR).send(wrapper(CommonError.ContactAdmin))
}

export const LoginUser = async (req, res) => {
  // validates request body
  validationResult(req).throw()

  const { email, password } = req.body

  const user = await getUser(email)

  if (!user) {
    return res.status(UNAUTHORIZED).send(wrapper(userError.invalid))
  }

  // check password
  const canLogin = await comparePassword(password, user)

  if (!canLogin) {
    return res.status(UNAUTHORIZED).send(wrapper(userError.invalid))
  }
  res.status(OK).send(await createToken(user))
}

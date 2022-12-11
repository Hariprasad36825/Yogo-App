import bcrypt from 'bcryptjs';
import { User } from "../models/user.model";
import { createAuthToken, createRefreshToken } from './token.services';

export const CreateUser = async (email, password, name, age, phone) => {
  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password, salt)
  const user = await User.create({ email, name, age, phone, password })
  return user
}

export const comparePassword = async (password, user) => {
  return await bcrypt.compare(password, user.password)
}


export const getUser = async (email) => {
  return await User.findOne({ where: { email } })
}

export const createToken = async (user) => {
  const AccessToken = createAuthToken(user)
  const RefreshToken = await createRefreshToken(user)
  const type = user.type || 'user'
  return { AccessToken, RefreshToken, type }
}


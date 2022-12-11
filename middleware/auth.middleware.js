import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { tokenError, wrapper } from '../Responses'
import { FORBIDDEN_REQUEST, UNAUTHORIZED } from '../statusCodes'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET

export const isAuthorised = (role) => (req, res, next) => {
  let token = req.header('authorization')

  if (!token) {
    return res.status(UNAUTHORIZED).send(wrapper(tokenError.notFound))
  }
  token = token.split(' ')[1]
  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(FORBIDDEN_REQUEST).send(wrapper(tokenError.expired))
      }
      return res.status(UNAUTHORIZED).send(wrapper(tokenError.invalid))
    }
    if (role && decoded.user.type !== role) {
      return res
        .status(FORBIDDEN_REQUEST)
        .send(wrapper(tokenError.notAuthorised))
    }
    req.user = decoded.user
    // console.log(req.user)
    next()
  })
}

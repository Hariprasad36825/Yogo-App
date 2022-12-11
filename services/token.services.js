import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { Token } from '../models/token.model'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET
const jwtSecretRefersh = process.env.JWT_SECRET_REFRESH

export const createAuthToken = (user) => {
  const payload = {
    user
  }
  const AccessToken = jwt.sign(payload, jwtSecret, { expiresIn: '2h' })
  return AccessToken
}

export const createRefreshToken = async (user, oldUid) => {
  const uid = uuidv4()

  const RefreshPayload = {
    uid,
    _id: user._id
  }

  oldUid === undefined
    ? await InsertToken(RefreshPayload)
    : await updateToken(oldUid, RefreshPayload)

  const refreshToken = jwt.sign(RefreshPayload, jwtSecretRefersh, {
    expiresIn: '30d'
  })
  return refreshToken
}

export const updateToken = async (oldUid, payload) => {
  await Token.upsert(
    { uid: payload.uid },
    {
      where: {
        uid: oldUid
      }
    }
  )
}

export const InsertToken = async ({ uid, user }) => {
  await Token.create({ uid, user })
}

import jwt, { JwtPayload } from 'jsonwebtoken'

export const createAccessToken = (payload: JwtPayload) => {
  const { _id } = payload

  return jwt.sign({ _id }, process.env.ACCESS_SIGNATURE)
}

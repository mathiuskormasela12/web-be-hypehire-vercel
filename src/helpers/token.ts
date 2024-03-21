import jwt from 'jsonwebtoken'
import type CreateTokenHandler from '@/types/CreateTokenHandle'
import Config from '@/config'

export const createJwtToken: CreateTokenHandler = (params) => {
  const accessToken = jwt.sign(params as object, Config.ACCESS_TOKEN.KEY, { expiresIn: Config.ACCESS_TOKEN.EXPIRES_IN })
  const refreshToken = jwt.sign(params as object, Config.REFRESH_TOKEN.KEY, { expiresIn: Config.REFRESH_TOKEN.EXPIRES_IN })

  return {
    accessToken,
    refreshToken
  }
}

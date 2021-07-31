import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Token } from 'src/types'

export const Auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const access = req.header('_token')

    if (!access) {
      req.token = { _id: '' }
    } else {
      const verified = jwt.verify(access, process.env.ACCESS_SIGNATURE) as Token

      req.token = verified
    }

    return next()
  } catch (error) {
    return res.status(500).json({
      dev: error.message,
    })
  }
}

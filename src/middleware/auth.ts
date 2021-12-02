import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { Token } from '../types'

export const Auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw Error('Not authenticated')
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SIGNATURE) as Token
      const { _id } = decoded

      req.user = { _id }

      return next()
    } catch (error) {
      throw Error('Invalid Authentication Headers')
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

export const SoftAccess = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    req.user = { _id: '' }

    if (authHeader) {
      const token = authHeader.split(' ')[1]

      if (token) {
        const decoded = jwt.verify(token, process.env.ACCESS_SIGNATURE) as Token
        const { _id } = decoded

        req.user = { _id }
      }
    }

    return next()
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

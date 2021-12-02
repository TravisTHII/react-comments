import { Request, Response } from 'express'

import User from '../models/User'

import { createAccessToken } from '../utils/createToken'

// @desc 		Get Token
// @route 	POST /api/v1/token
// @access 	Public
export const Token = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const token = createAccessToken(user)

    return res.status(200).json({
      token,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

export const TestToken = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user

    const user = await User.findById({ _id })

    return res.status(200).json({
      user,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

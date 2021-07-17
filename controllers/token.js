const { createAccessToken } = require("../utils/createToken")

// @desc 		Get Token
// @route 	POST /api/v1/token
// @access 	Public
exports.Token = async (req, res) => {
  try {

    const { user } = req.body

    const token = createAccessToken(user)

    return res.status(200).json({
      token
    })

  } catch (error) {

    return res.status(500).json({
      error: error.message
    })

  }
}
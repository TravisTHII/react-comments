const jwt = require('jsonwebtoken')

exports.createAccessToken = (payload) => {
  const { _id } = payload

  return jwt.sign({ _id }, process.env.ACCESS_SIGNATURE)
}
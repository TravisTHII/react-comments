const jwt = require('jsonwebtoken')

const Auth = (req, res, next) => {
	try {

		const access = req.header('_token')

		if (!access)
			return res.status(401).json('authorization denied.')

		const verified = jwt.verify(access, process.env.ACCESS_SIGNATURE)

		req.token = verified

		next()

	} catch (error) {

		return res.status(500).json({
			dev: error.message
		})

	}
}

module.exports = Auth
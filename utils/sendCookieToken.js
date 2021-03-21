exports.sendCookieToken = (res, token) => {
	res.cookie('_token', token, { httpOnly: true })
}
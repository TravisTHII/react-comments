exports.Slugify = function (s) {
	return s.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
}

exports.isOverflowed = function (content) {

	let s = content.split(/\r\n|\r|\n/m)

	return (s.length > 9 || content.length > 999) ? true : false

}
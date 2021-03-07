export function Slugify(s) {
	return s.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
}

function preventDefault(e) {
	e.preventDefault()
}

function disableScroll() {
	document.body.addEventListener('wheel', preventDefault, { passive: false })
}

export function enableScroll() {
	document.body.removeEventListener('wheel', preventDefault, { passive: false })
}

export function StopScrolling(x) {
	x.addEventListener('mouseenter', () => {
		disableScroll()

		x.addEventListener('mouseleave', () => {
			enableScroll()
		})
	})
}

export function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export function validText(x) {
	const v = x.trim()
	return v === null || (/^ *$/).test(v) || v.length > 9999
}

export function expandTextarea(t, h) {
	t.style.height = "";
	t.style.height = (t.scrollHeight - t.offsetHeight) + h + "px";
}

export function invalidValue(s, l) {
	return s === null || (/^ *$/).test(s) || s.length > l
}

export function random_str(length, keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
	let s = ''
		, l = keyspace.length

	for (let i = 0; i < length; i++) {
		s += keyspace.charAt(Math.floor(Math.random() * l))
	}

	return s
}

export function isOverflowed(content) {

	let s = content.split(/\r\n|\r|\n/m)

	return (s.length > 9 || content.length > 999) ? true : false

}
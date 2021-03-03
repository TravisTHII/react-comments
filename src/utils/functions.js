export function Capitalize([firstLetter, ...rest]) {
	return [firstLetter.toLocaleUpperCase(), ...rest].join('')
}

export function Slugify(s) {
	return s.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
}

export function WeaveArray(array, weaveValue) {
	const { length } = array
	return array.reduce((result, value, i) => {
		if (i < length - 1) {
			result.push(value, weaveValue)
		} else {
			result.push(value)
		}
		return result
	}, [])
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

export function debounce(func, wait, immediate) {
	var timeout

	return function executedFunction() {
		var context = this
		var args = arguments

		var later = function () {
			timeout = null
			if (!immediate) func.apply(context, args)
		}

		var callNow = immediate && !timeout

		clearTimeout(timeout)

		timeout = setTimeout(later, wait)

		if (callNow) func.apply(context, args)
	}
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
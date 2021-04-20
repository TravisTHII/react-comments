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
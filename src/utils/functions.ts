export const Slugify = function (s: string) {
  return s.replace(/[^A-Z0-9]+/gi, '-').toLowerCase()
}

export const isOverflowed = function (content: string) {
  let s = content.split(/\r\n|\r|\n/m)

  return s.length > 9 || content.length > 999 ? true : false
}

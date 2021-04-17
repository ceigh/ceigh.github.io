export function shortDate (date, locale = 'en') {
  return new Date(date).toLocaleString(locale, {
    year: 'numeric',
    month: 'short'
  })
}

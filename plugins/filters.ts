export function shortDate (date: string, locale = 'en') {
  return new Date(date).toLocaleString(locale, {
    year: 'numeric',
    month: 'short'
  })
}

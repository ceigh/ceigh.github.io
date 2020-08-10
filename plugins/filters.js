export function shortDate (date) {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric'
  })
}

export function shortDate (date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

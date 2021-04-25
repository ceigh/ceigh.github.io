const cli = bin => `${bin} --ignore-path .gitignore`

module.exports = {
  '*.{vue,ts,js}': cli('eslint'),
  '*.{css,vue}': cli('stylelint')
}

const cli = bin => `${bin} --ignore-path .gitignore`

module.exports = {
  '*.{js,vue}': cli('eslint'),
  '*.{css,vue}': cli('stylelint')
}

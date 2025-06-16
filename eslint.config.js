import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default antfu(
  {
    isInEditor: false,

    formatters: {
      css: true,

      prettierOptions: {
        plugins: [
          'prettier-plugin-css-order',
        ],
      },
    },

    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
  },

  {
    files: ['**/*.?([cm])[jt]s', '**/*.vue'],

    rules: {
      'no-restricted-imports': ['warn', {
        patterns: ['./**/*'],
      }],

      'ts/no-explicit-any': ['error', {
        fixToUnknown: false,
      }],

      'perfectionist/sort-array-includes': ['warn'],
      'perfectionist/sort-interfaces': ['warn'],
      'perfectionist/sort-object-types': ['warn'],
    },
  },

  {
    files: ['**/*.vue'],

    rules: {
      'vue/max-attributes-per-line': ['warn', {
        singleline: 3,
        multiline: 1,
      }],

      'vue/component-name-in-template-casing': ['warn', 'PascalCase', {
        registeredComponentsOnly: false,
      }],
    },
  },

  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),
)

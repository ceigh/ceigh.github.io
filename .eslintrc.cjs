module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },

  extends: [
    "standard",
    "plugin:vue/vue3-recommended",
  ],

  rules: {
    quotes: ["warn", "double"],
    "comma-dangle": ["warn", "always-multiline"],
    "no-alert": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-template": "warn",
    "multiline-comment-style": ["warn", "separate-lines"],

    "vue/multi-word-component-names": "off",
    "vue/block-lang": [
      "warn",
      {
        script: { lang: "ts", allowNoLang: false },
        template: { allowNoLang: true },
        style: { allowNoLang: true },
      },
    ],
    "vue/component-tags-order": ["warn", {
      order: ["script[setup]", "template", "style[module]"],
    }],
  },
}

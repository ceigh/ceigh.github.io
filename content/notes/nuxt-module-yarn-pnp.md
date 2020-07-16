---
title: Writing Nuxt module with Yarn PnP
abstract: Short guide about nuxt modules basics
date: Jul 2020
---


https://github.com/nuxt-community/module-template

node 12.18.2 (LTS)

```shell
yarn global add @vue/cli
vue init nuxt-community/module-template nuxt-chatra-module
cd nuxt-chatra-module
yarn
```


https://yarnpkg.com/advanced/qa#which-files-should-be-gitignored

```shell
git init
yarn set version berry
yarn

yarn dlx @yarnpkg/doctor .

git add .

git commit -m 'feat(project): initialize project' .
```


But...

```shell
Oops! Something went wrong! :(

ESLint: 7.4.0

ESLint couldn't find the plugin "eslint-plugin-import".

(The package "eslint-plugin-import" was not found when loaded as a Node module from the directory "/home/ceigh/Work/nuxt-chatra-module".)

It's likely that the plugin isn't installed correctly. Try reinstalling by running the following:

    npm install eslint-plugin-import@latest --save-dev

The plugin "eslint-plugin-import" was referenced from the config file in ".eslintrc.js » @nuxtjs/eslint-config".

If you still can't figure out the problem, please stop by https://eslint.org/chat to chat with the team.
```

HOW TO FIX ESLINT HERE AND WHY IT IS HAPPENING

To fix eslint:

`yarn add -D eslint-plugin-import@latest eslint-plugin-vue@latest eslint-plugin-jest@latest eslint-plugin-unicorn@latest eslint-plugin-node@latest eslint-plugin-promise@latest eslint-plugin-standard@latest eslint-import-resolver-node@latest`

Now eslint works and says:

`3:18  error  Async function has no 'await' expression  require-await`

Change string in `lib/module.js`:

`module.exports = async function (moduleOptions) {`

to

`module.exports = function (moduleOptions) {`

Now we get another error:

`(node:11560) [MODULE_NOT_FOUND] Error: vue-eslint-parser tried to access babel-eslint, but it isn't declared in its dependencies; this makes the require call ambiguous and unsound.`

We can fix it with update `.yarnrc.yml`

Add to file:

```
packageExtensions:
  "vue-eslint-parser@*":
    dependencies:
      babel-eslint": "*"
```

Now run `yarn`

For now seems eslint is fixed and we can commit!

Add new deps to cache:

`git add .yarn`

Commit

`git commit -m 'feat(project) initialize project' .`

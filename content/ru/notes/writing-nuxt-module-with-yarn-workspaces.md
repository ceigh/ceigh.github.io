---
date: 8/11/2020
title: Writing Nuxt module with Yarn workspaces
abstract: Basics about how to write testable nuxt modules using yarn workspaces.
keywords:
  - nuxt-module
  - nuxt
  - yarn
  - yarn-workspaces
unsplash:
  id: Nnc1ynV1WLM
  author: Victor Garcia
config:
  node: 14.7.0
  yarn: 1.22.4
  nuxt: 2.14.1
---

## About

In this article, i want to show - how to easy and fast write
Nuxt.js modules[^1] (and plugins[^2] also), <ins>without any bootstrap</ins>.

We can write and test it in real-time with yarn workspaces[^3] help.

Also, I will use code linter and commit linter - to
increase the quality of the resulted code.

All code you can find on my GitHub repository.[^4]

## Get started

First, we need to create our module directory.

Here I will use [yarn](https://yarnpkg.com), but you can adopt this tutorial for
[npm](https://npmjs.com).

Because of yarn workspaces, it makes sense to use <ins>only</ins> yarn.

### Create directory

For example, I made [`nuxt-chatra-module`](https://www.npmjs.com/package/nuxt-chatra-module),
which integrate [chatra](https://chatra.com) tool with nuxt.

So, I create an empty directory: `mkdir nuxt-chatra-module-monorepo`

Then we need to initialize yarn here:
```shell
cd nuxt-chatra-module-monorepo
yarn init -py
```

>**Note that I use the `-p` flag. It's because our directory is not a dedicated package, it's like a monorepo for our module and testing nuxt environment.**

>**Yarn workspaces monorepo <mark>must</mark> be private.**

### Create workspaces

Now create an empty `packages` directory here.
`packages` name is a common name for workspaces.

```shell
mkdir packages
```

Point root `package.json` to this directory:

```json{7-9}
{
  "name": "nuxt-chatra-module-monorepo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

Fill `packages` directory with our main package (`nuxt-chatra-module`),
and `nuxt-mock` package, which we will use as an isolated testing environment.

```shell
cd packages
mkdir nuxt-chatra-module
cd nuxt-chatra-module && yarn init -y && cd ..

mkdir nuxt-mock
cd nuxt-mock && yarn init -py
```

For `nuxt-mock`, we use private flag, because it will <ins>only be used locally</ins>.

Now we need to point our `nuxt-mock` - to use our `nuxt-chatra-module`.

```json{7-9}[nuxt-mock/package.json]
{
  "name": "nuxt-mock",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "nuxt-chatra-module": "^1.0.0"
  }
}
```

Call `yarn` in the root directory, and it resolves packages and link them.

### Git

Create `.gitignore` file in root directory (`touch .gitignore`),
and fill it with standard Nuxt.js
`.gitignore` file from [here](https://raw.githubusercontent.com/nuxt/nuxtjs.org/master/.gitignore).

Initialize git in the root directory with `git init` command.

<ins>But wait to commit</ins>, we need some more files to create.

### Linters

- **commitlint**

  In my projects, I prefer to use
  commitlint[^5] utility.

  It checks your messages for compliance with commit style conventions.

  Install (all actions are in the root directory).

  ```shell
  yarn add -DW @commitlint/{config-conventional,cli}
  ```

  >**Note: I use `-W` flag to install dependency in workspaces root, you must use this flag to install here.**

  Create commitlint config file: `touch .commitlintrc.js`

  And put config here:

  ```js
  module.exports = {
    extends: ['@commitlint/config-conventional']
  }
  ```

  You can check commitlint docs [here](https://commitlint.js.org).

- **eslint**

  For `.*js` files use classic eslint.[^6]

  I will use it with [this config](https://github.com/standard/eslint-config-standard).

  So install deps:

  ```shell
  yarn add -DW eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
  ```

  Create config: `touch .eslintrc.js`

  Put here:

  ```js
  module.exports = {
    extends: 'standard',
    ignorePatterns: [
      '!.*.js' // for optional configs lint
    ]
  }
  ```

  >**We add our configs as excluded from ignoring, because it start with period, and eslint <ins>ignores</ins> all files like that by default.**

- **lint-staged**

  To lint only staged files, I use lint-staged.[^7]

  ```shell
  yarn add -DW lint-staged`
  touch .lintstagedrc.js
  ```

  Add to config:

  ```js
  module.exports = {
    '*.js': 'eslint' // lint all staged .js files
  }
  ```

  Now guess - what is the *magic* tool that will link all this together?

- **husky**

  Husky[^8] is like an engine for our linters.

  Install: `yarn add -DW husky`

  Create a husky config file: `touch .huskyrc.js`

  Put in it:

  ```js
  module.exports = {
    hooks: {
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS', // lint commit messages
      'pre-commit': 'lint-staged' // lint staged files on commit
    }
  }
  ```

Now we can test it:

Add files to git by `git add .`

And commit changes: `git commit -m "feat(project): initialize project" .`

## Write module

Finally, we start to write something…

To better understand the next steps, check official nuxt modules
[docs](https://nuxtjs.org/guides/directory-structure/modules).

Move to our module directory: `packages/nuxt-chatra-module`

Create two files:

```shell
touch module.js
touch plugin.client.js
```

This is our core module's scripts, in `module.js` we parse nuxt module options, and add plugin,
`plugin.client.js` contains a logical payload.

>**Note, that I named plugin file with `.client` postfix, it's indicate,
>that plugin <ins>only works on client side</ins>,
>and *should not* execute while server side rendering. Check
>[this](https://nuxtjs.org/guide/plugins/#client-or-server-side-only) for details.**

To let recognize Nuxt, that this module is a Nuxt module, we need to change the `"main"` property.

So, replace `"main": "index.js"` with `"main": "module.js"` line in `package.json`.

We made it a module, but under the hood, it's were nuxt plugin. Because I want my
code runs in runtime before Vue app mounted, so all logic was in the plugin, and through the module
we just importing the payload plugin.

Now open `module.js` and write dummy export statement:

```js
export default function () {
  console.log('Hello from module')
}
```

### Setup dev mode with nuxt

I want to test my module in realtime, so go to `packages/nuxt-mock`.

We still haven't install Nuxt here, so: `yarn add -D nuxt`.

Create `dev` command in `package.json`:

```json
"scripts": {
  "dev": "nuxt"
}
```

Also, I create a link for that script in root `package.json`:

```json
"scripts": {
  "dev": "yarn workspace nuxt-mock dev"
}
```

Add `nuxt.config.js` to `packages/nuxt-mock`:

`touch nuxt.config.js`

Point Nuxt to use our module:

```js
export default {
  modules: [
    'nuxt-chatra-module'
  ]
}
```

You can test it now with `yarn dev`.

<figure>
  <img src='/images/writing-nuxt-module-with-yarn-workspaces/0.jpg'
    alt='Module says hello'/>
  <figcaption>Module says hello</figcaption>
</figure>

### Add plugin from module

To test plugin injection, put dummy `console.log` in `plugin.client.js`:

```js
console.log('Hello from plugin')
```

Now we can use special `addPlugin` function from nuxt:

```js{1,4-6}[module.js]
import path from 'path'

export default function () {
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.client.js')
  })
}
```

You can see more about `addPlugin`
[here](https://nuxtjs.org/guides/directory-structure/modules#provide-plugins).

Restart nuxt, and in browser console you must see our plugin's greetings:

<figure>
  <img src='/images/writing-nuxt-module-with-yarn-workspaces/1.jpg'
    alt='Plugin says hello'/>
  <figcaption>Plugin says hello</figcaption>
</figure>

>**Note: if you want in future, publish your module to npm, you *must* add `module.exports.meta`, just add the last line to `module.js`:**

>`module.exports.meta = require('./package.json')`

*And that's it.*

### Pass options from `nuxt.config.js`

I want my module to get options from config like this:

```js{2-4}[nuxt.config.js]
export default {
  chatra: {
    id: 'abcd'
  },
  modules: [
    'nuxt-chatra-module'
  ]
}
```

I can do it by access `this.options` property from **module** function:

```js{4}[module.js]
import path from 'path'

export default function () {
  console.log(this.options.chatra) // { id: 'abcd' }

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.client.js')
  })
}

module.exports.meta = require('./package.json')
```

We sure want to pass our `chatra` object with parameters to the plugin,
but the only way to do it is using
[templates](https://nuxtjs.org/guides/directory-structure/modules#template-plugins).

So update our `addPlugin` in module:

```js{3}[module.js]
this.addPlugin({
  src: path.resolve(__dirname, 'plugin.js'),
  options: this.options.chatra
})
```

We just pass `options` to it.

>**Don't forget to restart `nuxt` every time you change module.**

Now in plugin we can handle it with `'<%= options %>'` templating:

```js{1}[plugin.client.js]
const options = JSON.parse('<%= JSON.stringify(options) %>')
console.log('Chatra options: ', options)
```

And because every item from templates is a `String`,
I can `JSON.stringify()`, and `JSON.parse()` it,
if it's an `Object`.

*That's it!* We do simple module integration with options, now I just write code that I
want to execute on app open:

### Payload

Finally I write plugin payload, it simplty load chatra script,
and initialize it:

```js{5-16}[plugin.client.js]
const options = JSON.parse('<%= JSON.stringify(options) %>')
// to debug
if (options.debug) console.log('Chatra options: ', options)

// https://app.chatra.io/settings/integrations/widget
const [d, w, c] = [document, window, 'Chatra']
w.ChatraID = options.id
w.ChatraSetup = options.setup
var s = d.createElement('script')
w[c] = w[c] || function () {
  (w[c].q = w[c].q || []).push(arguments)
}
s.async = true
s.src = 'https://call.chatra.io/chatra.js'
if (d.head) d.head.appendChild(s)
```

### Access from Vue instances

Also, I want to have a function that allows me to open chatra chat from <ins>any</ins> Vue instance,
so for this, you can do:

```js[plugin.client.js]
import Vue from 'vue'

// other code...

Vue.prototype.$chatra = {
  openChat () {
    window.Chatra('openChat', true)
  }
}
```

just use `Vue.prototype` to inject your objects or functions into Vue instances.

You also can inject functions to nuxt context,
[see](https://nuxtjs.org/guide/plugins/#inject-in-root--context).

## Publish

If you want to publish your module to [npm](https://www.npmjs.com) registry,
you <mark>must</mark> call `yarn publish` from module package (`packages/nuxt-chatra-module`),
**NOT** from root package!

Fill `package.json` meta information like `"author"`, `"homepage"`, etc.

Check files with `yarn pack`.

And if everything is ok, call `yarn publish`. *Done!*

## Conclusion

In this article, I have tried to explain the basic things about writing modules for Nuxt.js
clearly, as possible.

I hope you liked it, and we will soon see even more useful and interesting modules!

Once again: all the code from this article can be found in
[this](https://github.com/ceigh/nuxt-chatra-module) repository.

If you have any problems or find an error, please let me know,
[mail me](mailto:ceigh@pm.me?subject=writing-nuxt-module-with-yarn-workspaces),
or contact on [Github](https://github.com/ceigh).

Bye, bye! :)

## Links

Article reference.

[^1]: https://nuxtjs.org/guide/modules - about Nuxt modules
[^2]: https://nuxtjs.org/guide/plugins - about Nuxt plugins
[^3]: https://classic.yarnpkg.com/en/docs/workspaces - about yarn workspaces
[^4]: https://github.com/ceigh/nuxt-chatra-module - repository with code
[^5]: https://commitlint.js.org - commitlint homepage
[^6]: https://eslint.org - eslint homepage
[^7]: https://github.com/okonet/lint-staged - lint-staged package
[^8]: https://github.com/typicode/husky - husky package

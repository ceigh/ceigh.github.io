---
title: Writing Nuxt module with Yarn workspaces
abstract: How to write testable nuxt modules using yarn workspaces basics.
keywords: nuxt-module, nuxt, yarn, workspaces
date: Aug 2020
---

## About

In this article, i want to show - how to easy and fast write
Nuxt.js modules[^1] (and plugins[^2] also), without any bootstrap.

We can write and test it in real time with yarn workspaces[^3] help.

Also i've been using code linter and commit linter to
increase quality of resulted code.

All code you can find on my github repository[^4].

## Get started

First of all we need to create our module directory.

Here i've been using [yarn](https://yarnpkg.com), but you can adopt this tutorial for
[npm](https://npmjs.com).

Because of yarn workspaces, it makes sense to use only yarn.

### Create directory

For example i made [`nuxt-chatra-module`](https://www.npmjs.com/package/nuxt-chatra-module),
which integrate [chatra](https://chatra.com) tool with nuxt.

So i create empty directory:

`mkdir nuxt-chatra-module`

Then we need to initialize yarn here:
```shell
cd nuxt-chatra-module
yarn init -py
```

Note that i use `-p` flag. It's because our directory is not a dedicated package,
it's like a monorepo for our module and testing nuxt environment.
Yarn workspaces monorepo **must** be private.

### Create workspaces

Now create an empty `packages` directory here.
`packages` name is common name for workspaces.

`mkdir packages`

Point root `package.json` to this directory:

```json
{
  "name": "nuxt-chatra-module-monorepo",
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

Don't forget to specify packages versions.

For `nuxt-mock` we use private flag, because it will only be used locally.

Now we need to point our `nuxt-mock` to use our `nuxt-chatra-module`.

`nuxt-mock/package.json`:

```json
{
  "dependencies": {
    "nuxt-chatra-module": "^0.0.1"
  }
}
```

Now call `yarn` in root directory, it resolves packages and link them.

### Git

Create `.gitignore` file in root directory (`touch .gitignore`),
and fill it with standard Nuxt.js
`.gitignore` file from [here](https://github.com/nuxt/nuxtjs.org/blob/master/.gitignore).

Initialize git in root directory with `git init` command.

But wait to commit, we need some more files.

### Linters

#### commitlint

In my projects i prefer to use
commitlint[^5] utility.

It checks your messages for compliance with commit style conventions.

Install (all actions are in root directory).

`yarn add -D @commitlint/{config-conventional,cli}`

Create commitlint config file:

`touch .commitlintrc.js`

And put in it:

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

You can check commitlint docs [here](https://commitlint.js.org).

#### eslint

For `.*js` files use classic eslint[^6].

I've been use it with [this config](https://github.com/standard/eslint-config-standard).

So install deps:

```shell
yarn add -D eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-import-resolver-node
```

Create config:

`touch .eslintrc.js`

Put here:

```js
module.exports = {
  extends: 'standard',
  ignorePatterns: [
    '!.*.js' // for optional configs lint
  ]
}
```

We add our configs as excluded from ignoring, because it start with period, and
eslint ignores all files like that by default.

#### lint-staged

To lint only staged files, i use lint-staged[^7].

`yarn add -D lint-staged`

`touch .lintstagedrc.js`

Add to config:

```js
module.exports = {
  '*.js': 'eslint' // lint all staged .js files
}
```

Now what is the magick utility, that's run our commands on special
git events?

#### husky

Husky[^8] is like an engine for our linters.

Install:

`yarn add -D husky`

Create husky config file

`touch .huskyrc.js`

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

Finally, we start to write something...

In order to better understand the next steps, check official nuxt modules
[docs](https://nuxtjs.org/guides/directory-structure/modules).

Move to our module directory: `packages/nuxt-chatra-module`

Create to files:

```shell
touch module.js
touch plugin.client.js
```

This is out core module scripts, in `module.js` we are parse nuxt module options, and add plugin,
in `plugin.client.js` contains logic plugin payload.

I named plugin file with `.client` postfix, it's indicate, that plugin only works on client side,
and should not execute while server side rendering. Check
[this](https://nuxtjs.org/guide/plugins/#client-or-server-side-only) for details.

To let recognize nuxt, that this module is a nuxt module, we need to define `main` property.

So add `"main": "module.js"` line to `package.json`.

We were make it module, but under the hood it's were nuxt plugin, because i want to my
code runs in runtime before vue app mounted, so all logic were in plugin, and through module
we just importing payload plugin.

Now open `module.js` and write dummy export statement:

```js
export default function () {
  console.log('Hello from module')
}
```

### Setup dev mode with nuxt

I want to test my module in realtime, so go to `packages/nuxt-mock`.

We still haven't install nuxt here, so: `yarn add -D nuxt`.

Create `dev` command in `package.json`:

```json
"scripts": {
  "dev": "nuxt"
}
```

Also i create link for that script in root `package.json`:

```json
"scripts": {
  "dev": "yarn workspace nuxt-mock dev"
}
```

Add `nuxt.config.js`:

`touch nuxt.config.js`

Point nuxt to use our module:

```js
export default {
  modules: [
    'nuxt-chatra-module'
  ]
}
```

You can test it now with `yarn dev`.

**IMAGE**

### Add plugin from module

To test plugin injection, put dummy `console.log` in `plugin.client.js`:

```js
console.log('Hello from plugin')
```

Now we can use special `addPlugin` fucntion from nuxt:

Open `module.js`, and edit it:

```js
import path from 'path'

export default function () {
  console.log('Hello from module')

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.client.js')
  })
}
```

You can see more about `addPlugin`
[here](https://nuxtjs.org/guides/directory-structure/modules#provide-plugins).

Note: if you want in future publish your module to npm,
you must add `module.exports.meta`, just add last line:

`module.exports.meta = require('./package.json')`

And that's it!

If you run dev, and open browser on `localhost:3000`,

in console you should see our greetings: `Hello from plugin`.

### Pass options from `nuxt.config.js`

I want my module to get options from config like this:

`nuxt.config.js`
```js
export default {
  chatra: {
    id: 12345
  },
  modules: [
    'nuxt-chatra-module'
  ]
}
```

I can do it, by access `this.options` property from plugin function:

```js
console.log(this.options) // { chatra: { id: 12345 } }
```

We sure want to pass our `chatra` object with parameters to plugin,
but only way to do it is use
[templates](https://nuxtjs.org/guides/directory-structure/modules#template-plugins).

So update our `addPlugin` in `module js`:

```js
this.addPlugin({
  src: path.resolve(__dirname, 'plugin.js'),
  options: this.options.chatra
})
```

We just pass `options` to it.

Now in plugin js we can handle it with `'<%= options %>'` templating:

```js
// plugin.client.js
const options = JSON.parse('<%= JSON.stringify(options) %>')
console.log('Chatra options: ', options)
```

That's it! we do simple module integration with options, now i just write code, that i
want to execute on app open:

### Payload

Finally i write plugin payload, it simplty load chatra script,
and initialize it:

```js
// plugin.client.js
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

### Access from vue instances

Also i want to have function that allow me to open chatra chat from any vue instance,
so for this you can do:

```js
import Vue from 'vue'

// other code...

Vue.prototype.$chatra = {
  openChat () {
    window.Chatra('openChat', true)
  }
}
```

just use Vue.prototype to inject your objects or functions into vue instances.

You also can inject functions to nuxt context,
[see](https://nuxtjs.org/guide/plugins/#inject-in-root--context).

## Publish

If you want to publish your module to [npm](https://www.npmjs.com) registry,
you *must* call `yarn publish` from module package (`packages/nuxt-chatra-module`),
**NOT** from root package!

Fill `package.json` meta information like `"license"`, `"author"`, `"homepage"`, etc.
And call `yarn publish`. That's it.

## Conclusion

In this article, i have tried to explain the basic things about writing modules for Nuxt.js
in as clearly as possible.

I hope you liked it, and we will soon see even more useful and interesting modules!

Once again: all the code from this article can be found in
[this](https://github.com/ceigh/nuxt-chatra-module) repository.

If you have any problems or find an error, please let me know,
[mail me](mailto:ceigh@pm.me?subject=writing-nuxt-module-with-yarn-workspaces),
or contact on [Github](https://github.com/ceigh).

Bye!

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

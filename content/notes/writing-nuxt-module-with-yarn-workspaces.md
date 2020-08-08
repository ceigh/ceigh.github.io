---
title: Writing Nuxt module with Yarn workspaces
abstract: How to write testable nuxt modules using yarn workspaces basics
keywords: nuxt-module, nuxt, yarn, workspaces
date: Aug 2020
---

```shell
ceigh@arch ~/Work $ mkdir nuxt-chatra-module
ceigh@arch ~/Work $ cd nuxt-chatra-module
ceigh@arch ~/Work/nuxt-chatra-module $ yarn init -2py
yarn init v1.22.4
warning The yes flag has been set. This will automatically answer yes to all questions, which may have security implications.
Resolving berry to a url...
Downloading https://github.com/yarnpkg/berry/raw/master/packages/berry-cli/bin/berry.js...
Saving it into /home/ceigh/Work/nuxt-chatra-module/.yarn/releases/yarn-berry.js...
Updating /home/ceigh/Work/nuxt-chatra-module/.yarnrc.yml...
Done!
{
  name: 'nuxt-chatra-module',
  private: true
}
✨  Done in 2.61s.
```

```
git init
```

https://yarnpkg.com/advanced/qa#which-files-should-be-gitignored

`touch .gitignore`

And put this:

```
.yarn/*
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*
```

Use commitlint

https://github.com/conventional-changelog/commitlint



`yarn add -D @commitlint/{config-conventional,cli}`
`touch .commitlintrc.js`

And put in it:

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

Install husky

`yarn add -D husky`

Create husky rc

`touch .huskyrc.js`

Put in it:

```js
module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
}
```

Now to lint our files on commit we install lint-staged module

`yarn add -D lint-staged`

`touch .lintstagedrc.js`

Put:

```js
module.exports = {
  '*.js': 'eslint'
}
```

Now we install js linter
I've been using eslint with
https://github.com/standard/eslint-config-standard
So
`yarn add -D eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-import-resolver-node`

`touch .eslintrc.js`

Put here:

```js
module.exports = {
  extends: 'standard',
  ignorePatterns: [
    '!.commitlintrc.js',
    '!.huskyrc.js',
    '!.eslintrc.js',
    '!.lintstagedrc.js'
  ]
}
```

Note that we add our configs to unignore, because it start with period.


Now we can test it:

`yarn eslint .`

So, if everything is ok, we pass


We need to add this to huskyrc on commit hook, so add
`'pre-commit': 'lint-staged'` to the hooks section:

```js
module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
}
```

`git add .`

`git commit -m "feat(project): initialize project" .`




So now we can start really to weite our module

https://nuxtjs.org/guides/directory-structure/modules


`mkdir src`

`touch src/module.js`

Here are our main file, and we must place main property to package.json,
so add:
`main: src/module.js` prop to package.json

We were make it module, but under the hood it's were nuxt plugin, because i want to my
code runs in runtime before vue app mounted, so all logic were in plugin, but through module
we importing plugin


Also my module need to get options like this:
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

so i need to get arg from nuxt in my module
`src/module.js`

```js
export default function () {
  console.log(this.options.chatra.id) // 12345
}
```

And because of i want to publish my module as npm package, i add to file end:
`module.exports.meta = require('../package.json')`


Now we write our plugin and import in from module
See: https://nuxtjs.org/guides/directory-structure/modules#provide-plugins

But first:

```shell
git add .
git commit -m "feat(project): add module.js" .
```


Now create our plugin file

`touch src/plugin.js`

For now fill it with:
```js
console.log('plugin injected')
```

On the nuxt ready if we open our page
we can see it in console, but to to that we need to add plugin through module.

For this reason in nuxt exist special function `addPlugin`

Update our `src/module.js`

```js
import path from 'path'

export default function () {
  console.log(this.options.chatra.id) // 12345
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```

we sure want to pass our id parameter from options to our plugin,

   but only way to do it is use
https://nuxtjs.org/guides/directory-structure/modules#template-plugins
template plugins

so update our addPlugin in module js:

```js
this.addPlugin({
  src: path.resolve(__dirname, 'plugin.js'),
  options: { id: this.options.chatra.id }
})
```

Now in plugin js we can handle it with `'<%= options.id %>'` templating:

```js
const id = '<%= options.id %>'
console.log(`Chatra id: ${id}`)
```

That's it! we do simple module integration with options, now i just write code, that i
want to execute on app open:

`plugin.js`:

```js
window.ChatraID = '<%= options.id %>'

const script = document.createElement('script')
script.async = true
script.src = `${document.location.protocol}//call.chatra.io/chatra.js`
document.head.appendChild(script)
```

it simply loads chatra js script

Also i want to have function that allow me to open chatra chat from any vue instance,
so for this you can do:

`plugin.js`
```
import Vue from 'vue'

// other code...

Vue.prototype.$chatra = {
  openChat () {
    window.Chatra('openChat', true)
  }
}
```

just use Vue.prototype to inject your objects or functions into vue instances.

More about plugins you can read here: https://nuxtjs.org/guide/plugins/


Add
```json
"files": [
  "src"
]
```
to your `package.json`, and fill other interesting fields
then commit change and publish your package!

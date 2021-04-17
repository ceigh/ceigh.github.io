---
date: 2/17/2021
title: Create “Troxler's Fading” with plain canvas api
abstract: Playing with canvas and some optical illusions.
keywords:
  - canvas
  - js
  - optical-illusion
plain:
  src: /images/create-troxlers-fading-with-plain-canvas-api/3.png
  caption: Effect in action
---

## About

If you <i>like</i> optical illusions[^1] as much as I do,
then you also once thought about creating your **own**.

Although I will not create something new, I will implement a <ins>generator</ins>
of a popular optical illusion with my own hands.

Today we will talk about the so-called **“The Troxler's Effect”**[^2].

## Principle of operation

<i>“What is this color smudge that I have to see here?”</i> - ask the impatient.
Do not rush, now I will explain <ins>everything</ins>.

“The Troxler's Effect” or “The Troxler's Phenomenon”, as explained, is the cessation of the eye
to <mark>perceive a visible stimulus</mark> that occupies a fixed position on the retina of the eye.

And now in simple words: the fact is that when our eyes are fixed and <ins>motionless</ins> for a while,
the brain stops responding to some visible objects, thereby making it possible
to hide these objects from visibility **at all**.

### Try it yourself

Open the [picture](/images/create-troxlers-fading-with-plain-canvas-api/3.png)
attached at the beginning of the article,
fix your eyes on the cross in the center and look at it motionlessly for <ins>10-20 seconds</ins>.

As a result, you should notice how the colored spots <i>gradually dissolve</i> into
a solid gray background.

Done! <i>It was as if there were no spots at all</i>.

## Implementation

The illusion inspired me **so much**, and I wanted even more of these images, so I thought:
<i>“Why don't I write my own generator for them…?”</i>.

Looking ahead, I will say: I still wrote this generator,
I also added a few settings there for more fine-tuning,
all the code can be found [here](https://git.ceigh.com/?p=troxler.git;a=tree).

### Tools

So, where to start? As is customary for rendering any <i>“programmable”</i> graphics on the Web,
a `<canvas>`[^3] element is used, so you don't have to choose…

Also, I would like not to use any libraries at all <ins>(in the spirit of real asceticism)</ins>,
so we are armed with only pure `ES6+`.

### Template

To begin with, we need to render the image somewhere, create html markup:

```html
<!-- index.html -->
<html>
  <body>
    <canvas width='300' height='300'></canvas>
  </body>
</html>
```

### Script

Let's create a function that will draw on our canvas.

```js
// index.js
function draw (canvas) {
  // …draw
}
```

Here we accept canvas element in `canvas` argument.

>**All further pieces of code should be considered <ins>as parts of the draw function</ins>.
>(To simplify).**

The basic principle is to <i>draw a lot of rectangles of random color - in a random place,
and then blur all the image</i> to get a blending.

- Size and place

  Let's agree that the number of rectangles to draw, as well as their size,
  will depend on the size of the canvas,
  let's say it will be a **large side divided by four**:

  ```js
  const { width: w, height: h } = canvas
  const side = Math.floor(Math.max(w, h) / 4)
  ```

- Color

  To determine the color, I will write a helper function `rdnColor`:

  ```js
  const rndColor = (alpha = 1) =>
    `rgba(${rndByte()}, ${rndByte()}, ${rndByte()}, ${alpha})`
  ```

  As we know[^4], colors are encoded with three values **from zero to two hundred and fifty-five**
  (three bytes) <ins>(the red component, the green component, and the blue component)</ins>,
  and as you can see, our function also takes color transparency values (the `alpha` component),
  it can be from zero to one.

  The question arises - what is hidden behind the other helper function `rndByte`?

  ```js
  const rndTo = to => Math.floor(Math.random() * to)
  const rndByte = () => rndTo(255)
  ```

  The `roundto(to)` function returns a random value <ins>from `0` to the `to`</ins> argument.
  ><i>(We'll need it soon. Many have already guessed why…)</i>

Let's at least draw[^5] something!

```js
const ctx = canvas.getContext('2d')

// random rectangles
for (let i = side; i--;) {
  ctx.fillStyle = rndColor()
  ctx.fillRect(rndTo(w), rndTo(h), side, side)
}
```

This loop draws a `side`-by-`side` rectangle of random color,
at a random location on **x (`w`)** and at a random location on **y (`h`)**, but
<mark>no further than our canvas</mark>, `side` times.

This is where we also needed the `rndTo` function.

<figure>
  <img src='/images/create-troxlers-fading-with-plain-canvas-api/0.png'
    alt='Strange rectangles on canvas (?)'/>
  <figcaption>Strange rectangles on canvas (?)</figcaption>
</figure>

<i>Pretty simple!</i>

- Blend

  Wait… Now it just looks like a <i>bunch</i> of rectangles scattered
  on the canvas, how do we achieve the **blur** effect?

  To do this, apply the <i>blur</i> filter[^6] to the canvas **context**:

  ```js
  // blur with canvas
  ctx.filter = 'blur(1.5rem)'
  ```

  **Filtering directly on the canvas context can sometimes affect performance,
  so alternatively you can blur the canvas itself using css:**

  ```js
  // blur with css
  canvas.style.filter = 'blur(1.5rem)'
  ```

  >**To apply this effect on our rectangles you must
  ><mark>put this code before drawing loop</mark>**.

  <figure>
    <img src='/images/create-troxlers-fading-with-plain-canvas-api/1.png'
      alt='Awesome blending'/>
    <figcaption>Awesome blending</figcaption>
  </figure>

- Marker

  To make it easier to focus the center of the image, let's add a marker:

  First remove our previous blur filter:

  ```js
  ctx.filter = 'none'
  ```

  >**(Otherwise, we won't see our marker.)**

  ```js
  // draw marker
  const markerSide = Math.round(Math.max(w, h) / 100)
  const markerSideHalf = Math.round(markerSide / 2)
  const markerX = Math.round(w / 2 - markerSideHalf)
  const markerY = Math.round(h / 2 - markerSideHalf)
  ctx.fillStyle = '#000'
  ctx.fillRect(markerX, markerY, markerSide, markerSide)
  ```

  <figure>
    <img src='/images/create-troxlers-fading-with-plain-canvas-api/2.png'
      alt='With marker'/>
    <figcaption>With marker</figcaption>
  </figure>

- Background

  As you can see, for now our image is <i>pretty</i> transparent,
  this is because of blur.

  To fix this, we need to <ins>fill our canvas</ins> before drawing:

  ```js
  // fill bg
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ```

  <figure>
    <img src='/images/create-troxlers-fading-with-plain-canvas-api/3.png'
      alt='With background'/>
    <figcaption>With background</figcaption>
  </figure>

In the end, we have this code:

```js
// helpers
const rndTo = to => Math.floor(Math.random() * to)
const rndByte = () => rndTo(255)
const rndColor = (alpha = 1) =>
  `rgba(${rndByte()}, ${rndByte()}, ${rndByte()}, ${alpha})`

function draw (canvas) {
  const { width: w, height: h } = canvas
  const side = Math.floor(Math.max(w, h) / 4)
  const ctx = canvas.getContext('2d')

  // fill bg
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)

  // for blending
  // blur with canvas
  ctx.filter = 'blur(1.5rem)'
  /*
  // blur with css
  canvas.style.filter = 'blur(1.5rem)'
  */

  // random rectangles
  for (let i = side; i--;) {
    ctx.fillStyle = rndColor()
    ctx.fillRect(rndTo(w), rndTo(h), side, side)
  }

  // reset filter
  ctx.filter = 'none'

  // draw marker
  const markerSide = Math.round(Math.max(w, h) / 100)
  const markerSideHalf = Math.round(markerSide / 2)
  const markerX = Math.round(w / 2 - markerSideHalf)
  const markerY = Math.round(h / 2 - markerSideHalf)
  ctx.fillStyle = '#000'
  ctx.fillRect(markerX, markerY, markerSide, markerSide)
}
```

## Conclusion

So, we wrote a “Troxler's Effect” generator.

I hope it was **easy**, you **liked** it and you **learned** something new.

Also in addition to this, I wrote an [npm module](https://npmjs.com/troxler)[^7]
where you can use and <i>configure</i> this function.

You can see it in action on my [homepage](/).
Just reload the page couple of times.

All the code can be found [here](https://git.ceigh.com/?p=troxler.git;a=tree)[^8]
or [here](https://github.com/ceigh/troxler)[^9].

See you again :)

## Links

Article reference.

[^1]: https://en.wikipedia.org/wiki/Optical_illusion - about illusions
[^2]: https://en.wikipedia.org/wiki/Troxler%27s_fading - about “Troxler's Effect”
[^3]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas - about canvas
[^4]: https://en.wikipedia.org/wiki/RGB_color_model - RGB
[^5]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D - about canvas context
[^6]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter - canvas filter
[^7]: https://npmjs.com/troxler - npm package
[^8]: https://git.ceigh.com/?p=troxler.git;a=tree - repository with code
[^9]: https://github.com/ceigh/troxler - github mirror

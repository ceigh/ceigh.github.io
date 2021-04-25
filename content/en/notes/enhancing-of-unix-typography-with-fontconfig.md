---
date: 4/18/2021
title: Enhancing of UNIX typography with Fontconfig
abstract:
  Refining our environment with beautiful fonts and their correct rendering.
keywords:
  - unix
  - fonts
  - typography
unsplash:
  id: UOk20CQrea8
  author: Elisa Calvet B.
---

## About

First of all, do not consider this text as a <i>specific guide
to action</i>, it is rather my own thoughts on how
to configure the unity of fonts in your system, and how to display them so that
**pleased** the eye.

I believe that for a comfortable work, you can not do without high-quality
[typography](https://en.wikipedia.org/wiki/Typography), and that this moment
should stand in the list of priority actions when customizing the working
environment, since this primarily affects the <ins>overall impression and
attractiveness</ins> of it.

## Standard

Speaking about the “standard” display of text, I would like
to mention the now popular "UNIX-like" OS, specifically
[macOS](https://www.apple.com/ru/macos/big-sur)
(and in general the OS family from Apple).

Their designers pay a lot of attention[^1] to typography issues,
and it seems to me that they are <mark>quite good</mark> at it.
Starting from developing fonts, and ending with writing
engines for rendering text.

![apple typography](https://developer.apple.com/news/images/og/fonts-og.jpg)

Not least of all, the perception of text depends on the display itself
on which the text is displayed, we can assume that some of Apple's
success in this regard is due to their displays with high pixel
density (PPI)[^2]. But time goes on and now such matrices will not
surprise anyone, so specific display parameters come into play.

**Typeface, anti-aliasing, hinting, and so on**, this is what today
(in most operating systems) depends on - whether you will be
comfortable working with text, or not.

Today I will try to fully cover my experience in configuring the display
and selecting fonts in <i>*NIX</i>.

## Font

I would like to say right away that the selection of fonts is
a <ins>purely personal</ins> matter for everyone, choose those
families with which you will be comfortable working and which will
**please** you with their appearance.


I, since we are talking about the "standard", will show you how to use
the official fonts from Apple. They can be easily found on
[GitHub](https://github.com) <i>(don't worry, you can safely use them
for non-commercial purposes)</i>.

### Installation

You need to choose at least <mark>three fonts for three typefaces</mark> -
**Sans-serif**, **Serif**, and **Monospaced** (all glyphs are the same width). I like
[SF Pro](https://github.com/sahibjotsaggu/San-Francisco-Pro-Fonts),
[Libertinus](https://github.com/alerque/libertinus/releases) and
[SF Mono](https://github.com/supercomputra/SF-Mono-Font).

Download the fonts and put them in the `~/.local/share/fonts`
(or `~/.fonts`) directory.

### Ligatures

If you sometimes have to write some code <i>(for example, you are engaged
in software development :))</i>, then you have probably heard about
ligatures[^3] in monospaced fonts. These are special font glyphs
that combine some adjacent characters into one.

For example, take a look at this line: `-> => == != === ~~> и даже www`.
If your monospaced font supports ligatures, then you should see how
the individual characters “merge” into one single one.
Just in case, here's a picture:

![ligatures](/images/enhancing-of-unix-typography-with-fontconfig/0.png)

It looks pretty enough, so I prefer to use fonts with ligatures, but what
should I do if I really like a font and it does not support
ligatures by its nature? The answer is simple - you need to <ins>patch</ins> it.

Don't be alarmed, it's <i>simple</i>. Especially if you use patching software,
such as [Ligaturizer](https://github.com/ToxicFrog/Ligaturizer). You can use it to add
ligature glyphs from `FireCode`[^4] to your chosen font. Also in the process,
you can choose which ligatures to use and which **not to touch**.
Let's patch the monospaced `SF Mono`:

- ```sh
  git clone git@github.com:ToxicFrog/Ligaturizer.git --recurse-submodules
  cd Ligaturizer
  mv ~/.local/share/fonts/sf-mono fonts
  ```
  >**pay attention to `--recurse-submodules` option!**

- Now you can select the ligatures you need by changing the file
  `ligatures.py`. Just <mark>comment out</mark> the lines with
  unnecessary ligatures.

- Now we need to add our font to the build process by changing the file `build.py`:

  ```python
  prefixed_fonts = [
    …
    'fonts/sf-mono/*'
  ]
  ```

- Run the build via `make`.

- After successful patching, you will see the new fonts in `fonts/output`.
  These are the fonts we need, which now <i>support</i> ligatures.
  Move them to the font directory:
  ```sh
  mkdir ~/.local/share/fonts/sf-mono
  mv fonts/output/* ~/.local/share/fonts/sf-mono
  ```

More information [here](https://github.com/ToxicFrog/Ligaturizer#using-the-script).

## Fontconfig

The [Fontconfig](https://www.freedesktop.org/wiki/Software/fontconfig) library
is responsible for the display in <i>GNU/Linux</i> and in many other
**UNIX-like** operating systems.

You can make your own configuration via the configuration file,
which is located at the path: `~/.config/fontconfig/fonts.conf`.
This is essentially a simple
[XML](https://ru.wikipedia.org/wiki/XML) file. You can read more
about setting up Fontconfig [here](https://wiki.archlinux.org/index.php/Font_configuration).

### Default font selection

Let's specify our installed fonts as the <ins>default</ins> fonts:

```xml
<match>
  <test name="family"><string>sans-serif</string></test>
  <edit name="family" mode="prepend" binding="strong">
    <string>SF Pro Display</string>
  </edit>
</match>
```

Here I pointed out that for the `sans-serif` family, I prefer the `SF Pro Display`
font. To find out the internal name of a particular font,
use the command: `fc-list | grep 'SF Pro'`. You will get a list of all fonts
whose names contain the string `'SF Pro'`, the name is usually indicated after the colon:
`.local/share/fonts/sf-pro/SF-Pro-Display-Regular.otf: SF Pro Display:style=Regular`,
take only the part that is <mark>after the first colon and before the second</mark>,
the rest is the font <i>style</i>.

I will also redefine the fonts for `serif` and `monospaced`:

```xml
<match>
  <test name="family"><string>serif</string></test>
  <edit name="family" mode="prepend" binding="strong">
    <string>Libertinus Serif</string>
  </edit>
</match>

<match>
  <test name="family"><string>monospace</string></test>
  <edit name="family" mode="prepend" binding="strong">
    <string>Liga SFMono</string>
  </edit>
</match>
```

To check the match, use `fc-match`. For example:
`fc-match serif` will tell us: `Liberationserif-Regular.otf: "Liberation Serif" "Regular"`,
this means that we specified everything **correctly** and our font was <ins>applied</ins>,
you can also check the other families.

### Aliasing

There are also situations when we want to display our **selected** font <i>instead</i>
of one, so add the following code to the configuration file:

```xml
<alias>
  <family>Liberation Mono</family>
  <prefer><family>monospace</family></prefer>
</alias>
```

This construction must be added <mark>before</mark> defining our default fonts.
Here I pointed out that instead of `Liberation Mono`, I want to use the
standard `monospace`, which is pointed to `SF Pro Display`.

### Rendering

So, all the fonts are specified, the most **important** thing remains-to
configure their <i>correct</i> display.
To do this, add the following construction to the <mark>beginning</mark>
in the `<fontconfig>` block <i>(where we worked before)</i>:

```xml
<match target="font">
  <edit name="rgba"><const>rgb</const></edit>
  <edit name="lcdfilter"><const>lcddefault</const></edit>
  <edit name="hinting"><bool>false</bool></edit>
  <edit name="embolden"><bool>true</bool></edit>
</match>
```

These settings are common to **all** fonts in general, now I will explain what they mean:

- `rgba`
  is responsible for sub-pixel mapping (<i>better</i> anti-aliasing).

- `lcdfilter`
  filter for correct subpixel smoothing.

- `hinting`
  aligns the glyphs on the grid. **Disable it if you don't want the font to “jump”**.

- `embolden`
  synthetically **thickens** the outline. This is my <ins>favorite</ins> setting,
  because it makes any font look <i>much cooler</i>.

To learn about other options, visit the
[wiki](https://wiki.archlinux.org/index.php/Font_configuration)
or [documentation](https://www.freedesktop.org/software/fontconfig/fontconfig-user.html).
The documentation also contains <ins>a lot of interesting</ins>
information about Fontconfig itself.

## Use by programs

### Terminal

Usually, your terminal uses `monospace` as the font, so you should already
have everything working. Otherwise, you will have to specify it **manually**.
I'll show you how to change the font in [`st`](https://st.suckless.org).
Open the config file and add the following line:
```c
static char *font = "monospace:pixelsize=15";
```

This approach <ins>saves us a lot of time</ins>, for example, if we want
to change the font in **different programs at once**, we will have to change
the font only in Fontconfig itself, and not in <mark>a bunch of different configuration
files</mark>.

Here I only changed the font size (`:pixelsize=15`). You can override the font
parameters right here, for example: `"monospace:pixelsize=15:hinting=true"` and so on.

![terminal](/images/enhancing-of-unix-typography-with-fontconfig/2.png)

Everything of course depends on your terminal emulator, but most likely the
<ins>same scheme</ins> will be used there.

### Environment
Here, too, everything should happen **automatically**, if this is not the
case-see the example with the terminal, everything is exactly the same.

### Browser

#### Firefox

Open `about:preferences`, find the font settings, and specify <ins>Default</ins> everywhere.

I also prefer to change the font of the Firefox interface, via the `userChrome.css` file.
It is located in `~/.mozilla/firefox/<profile>/chrome/userChrome.css`, add it there:
```css
* {
  font-family: sans-serif !important;
}
```

![firefox](/images/enhancing-of-unix-typography-with-fontconfig/1.png)

You can find out the **name of your profile** on the `about:support` page,
in the `Profile Directory` field.

#### Chromium

Open `chrome://settings/fonts`, and specify:

<br>
<table>
  <tbody>
    <tr>
      <td>Serif font</td>
      <td>Serif</td>
    </tr>
    <tr>
      <td>Sans-serif font</td>
      <td>Sans</td>
    </tr>
    <tr>
      <td>Fixed-width font</td>
      <td>Monospace</td>
    </tr>
  </tbody>
</table>

## Icons and emojis

To display various Unicode icons, you will need an <i>icon font</i>, such as
[Nerd Fonts](https://github.com/ryanoasis/nerd-fonts/blob/master/src/glyphs/Symbols-1000-em%20Nerd%20Font%20Complete.ttf).
Check out this repository, it contains **a huge number** of icon fonts, and there
are also utilities that allow you to <ins>patch</ins> your font to support icons in it.

[Emojis](https://en.wikipedia.org/wiki/Emoji) are essentially also some <i>font</i>,
so they can also be **redefined** in Fontconfig.
So for example, to use an Apple emoji, install [this](https://github.com/samuelngs/apple-emoji-linux/releases/download/latest/AppleColorEmoji.ttf) font.
Then go to `~/.config/fontconfig/fonts.conf`:
```xml
<match>
  <test name="family"><string>emoji</string></test>
  <edit name="family" mode="prepend" binding="strong">
    <string>Apple Color Emoji</string>
  </edit>
</match>
```

![emoji](/images/enhancing-of-unix-typography-with-fontconfig/3.png)

## Conclusion

So, I showed you how to configure and select fonts using **Fontconfig**.
<mark>Do not be lazy</mark> and study the documentation for it.
<ins>I guarantee</ins> - you will not regret it, because it contains
<i>much more interesting</i> than this article.
I tried to show you the **basic principles** of settings,
and a general idea of typography in <i>*NIX</i>. I hope it was informative :).

My configuration can always be found
[here](https://git.ceigh.com/?p=dotfiles.git;a=blob;f=.config/fontconfig/fonts.conf;h=992d003f85586263a865288a8abf729c1ca10ca0;hb=HEAD)[^5]

## Links

Article reference.

[^1]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/typography - Apple guidelines
[^2]: https://en.wikipedia.org/wiki/Pixel_density - about PPI
[^3]: https://en.wikipedia.org/wiki/Ligature_(writing) - ligatures
[^4]: https://github.com/tonsky/FiraCode - FiraCode font
[^5]: https://github.com/ceigh/dotfiles/blob/master/.config/fontconfig/fonts.conf - my config at GitHub

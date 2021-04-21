---
date: 4/18/2021
title: Улучшение типографики в UNIX с помощью Fontconfig
abstract:
  Облагораживаем своё окружение с помощью красивых шрифтов и их правильного рендеринга.
keywords:
  - unix
  - fonts
  - typography
unsplash:
  id: UOk20CQrea8
  author: Elisa Calvet B.
---

## Предисловие

В первую очередь не стоит рассматривать этот текст как <i>конкретное руководство
к действию</i>, это скорее мои собственные размышления о том,
как настроить единство шрифтов в своей системе, и как отображать их так, чтобы
**радовало** глаз.

Я считаю что для комфортной работы нельзя обойтись без качественной
[типографики](https://ru.wikipedia.org/wiki/%D0%A2%D0%B8%D0%BF%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%BA%D0%B0),
и что этот момент дожен стоять в списке приоритетных действий при кастомизации
рабочего окружения, так как от этого в первую очередь зависит <ins>общее впечатление
и привлекательность</ins> оного.

## Эталон

Говоря об “эталонном” отображении текста я хотел бы упомянуть популярную нынче
“UNIX-подобную” ОС, а конкретно -
[macOS](https://www.apple.com/ru/macos/big-sur) (и в целом семейство ОС от Apple).

Их дизайнеры уделяют вопросам типографики большое внимание[^1], и как мне кажется -
у них это <mark>неплохо</mark> получается. Начиная от разработки собственных
шрифтов, и заканчивая написанием собственных движков для рендеринга текста.

![типографика apple](https://developer.apple.com/news/images/og/fonts-og.jpg)

Не в последнюю очередь восприятие текста зависит от самого дисплея на котором текст
отображается, можно считать что некоторая часть успеха Apple в этом плане обусловлена
их дисплеями с очень высокой плотностью пикселей (PPI)[^2]. Но время идёт и сейчас такими
матрицами никого не удивишь, поэтому в дело вступают конкретные параметры
отображения.

**Начертание, сглаживание, хинтинг, и так далее**, это то, от чего на сегодняшний день
(в большинстве ОС) зависит - будет ли вам комфортно работать с текстом, или не очень.

Сегодня я постараюсь в полной мере осветить свой опыт по настройке отображения и
выбору шрифтов в <i>*NIX</i>.

## Шрифт

Хочется сразу сказать о том, что подбор шрифтов это <ins>сугубо личное дело каждого</ins>,
выбирайте те семейства с которыми вам будет **удобно** работать и которые будут вас
**радовать** своим внешним видом.

Я же, раз мы заговорили про “эталон”, покажу как использовать официальные шрифты от Apple.
Их спокойно можно найти на [GitHub](https://github.com)
<i>(не переживайте, за их использование в
некоммерческих целях, вам ничего не будет)</i>.

### Установка

Нужно выбрать как минимум <mark>три шрифта для трёх начертаний</mark> -
**Sans-serif** (отсутствие засчек),
**Serif** (с засечками) и **Monospaced** (все глифы одинаковы по ширине).
Мне нравятся
[SF Pro](https://github.com/sahibjotsaggu/San-Francisco-Pro-Fonts),
[Libertinus](https://github.com/alerque/libertinus/releases) и
[SF Mono](https://github.com/supercomputra/SF-Mono-Font) соответственно.

Скачайте шрифты и положите их в директорию `~/.local/share/fonts`
(или `~/.fonts`).

### Лигатуры

Если вам иногда приходится писать какой-то код <i>(например вы занимаетесь разработкой
ПО :))</i>, то вы наверняка слышали о **лигатурах**[^3] в моноширинных шрифтах.
Это специальные глифы шрифта которые объединяют собой некоторые рядом стоящие
символы в <ins>один</ins>.

Например взгляните на эту строку: `-> => == != === ~~> и даже www`.
Если ваш моноширинный шрифт **поддерживает** лигатуры, то вы должны увидеть как
отдельные символы “сливаются” в один единый. На всякий случай вот картинка:

![лигатуры](/images/enhancing-of-unix-typography-with-fontconfig/0.png)

Выглядит достаточно симпатично, поэтому я предпочитаю использовать шрифты с лигатурами.
Но что делать, если какой то шрифт очень нравится, но лигатур он по своей природе не
поддерживает? Ответ прост - <ins>нужно его пропатчить</ins>.

Не пугайтесь, это очень <i>просто</i>. Особенно если использовать ПО для патчинга, например
[Ligaturizer](https://github.com/ToxicFrog/Ligaturizer).
С его помощью, можно добавить в выбранный вами шрифт лигатурные глифы из `Fira Code`[^4].
Также в процессе можно выбрать какие лигатуры использовать, а какие **не трогать**.
Давайте пропатчим моноширинный `SF Mono`:

- ```sh
  git clone git@github.com:ToxicFrog/Ligaturizer.git --recurse-submodules
  cd Ligaturizer
  mv ~/.local/share/fonts/sf-mono fonts
  ```
  >**обратите внимание на опцию `--recurse-submodules`!**

- Сейчас можно выбирать нужные вам лигатуры изменив файл `ligatures.py`.
  Просто <mark>закомментируйте</mark> строчки с ненужными лигатурами.

- Теперь нужно добавить наш шрифт в процесс сборки, изменив файл `build.py`:

  ```python
  prefixed_fonts = [
    …
    'fonts/sf-mono/*'
  ]
  ```

- Запускаем сборку через `make`.

- После успешного патчинга вы увидите новые шрифты в `fonts/output`.
  Это и есть нужные нам шрифты, теперь уже <i>поддерживающие</i> лигатуры.
  Переместим их в директорию со шрифтами:
  ```sh
  mkdir ~/.local/share/fonts/sf-mono
  mv fonts/output/* ~/.local/share/fonts/sf-mono
  ```

Подробнее можно узнать [тут](https://github.com/ToxicFrog/Ligaturizer#using-the-script).

## Fontconfig

За отображение в <i>GNU/Linux</i> и во многих других **UNIX-like** ОС, отвечает
библиотека [Fontconfig](https://www.freedesktop.org/wiki/Software/fontconfig).

Производить собственную настройку можно через конфигурационный файл, который
находится по пути: `~/.config/fontconfig/fonts.conf`. Это по сути простой
[XML](https://ru.wikipedia.org/wiki/XML) файл.
Подробнее про настройку Fontconfig можно прочесть
[тут](https://wiki.archlinux.org/index.php/Font_configuration_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).

### Выбор шрифтов по-умолчанию

Давайте укажем наши установленные шрифты в качестве шрифтов <ins>по умолчанию</ins>:

```xml
<match>
  <test name="family"><string>sans-serif</string></test>
  <edit name="family" mode="prepend" binding="strong">
    <string>SF Pro Display</string>
  </edit>
</match>
```

Тут я указал, что для семейства `sans-serif` я предпочитаю
шрифт `SF Pro Display`. Чтобы узнать внутреннее название того или иного шрифта,
используйте команду: `fc-list | grep 'SF Pro'`. Вы получите список всех
шрифтов, названия которых <i>содержат в себе</i> строку `'SF Pro'`, название обычно указано
после двоеточия:
`.local/share/fonts/sf-pro/SF-Pro-Display-Regular.otf: SF Pro Display:style=Regular`,
возьмите только ту часть, которая находится
<mark>после первого двоеточия, и до второго</mark>,
<i>всё остальное это начертание</i>.

Также я переопределю шрифты для `serif` и `monospaced`:

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

Чтобы проверить соответствие, используйте `fc-match`. Например:
`fc-match serif` скажет нам:
`LibertinusSerif-Regular.otf: "Libertinus Serif" "Regular"`, это означает, что
мы всё указали **верно** и наш шрифт <ins>применился</ins>, вы также можете проверить
и остальные семейства.

### Переопределение

Также бывают ситуации, когда мы хотим чтобы <i>вместо</i> одного шрифта,
отображался наш **выбранный**, для этого добавьте в файл конфигурации такой код:

```xml
<alias>
  <family>Liberation Mono</family>
  <prefer><family>monospace</family></prefer>
</alias>
```

Эту конструкцию нужно добавить <mark>до</mark> определения наших шрифтов по-умолчанию.
Тут я указал, что вместо `Liberation Mono` хочу использовать стандартный `monospace`,
который в свою очередь смотрит на `SF Pro Display`.

### Рендеринг

Итак, все шрифты указаны, осталось самое **главное** - настроить их <i>правильное</i>
отображение.
Для этого добавьте в <mark>самое начало</mark> в блок `<fontconfig>`
<i>(где мы и работали до этого)</i>, такую конструкцию:

```xml
<match target="font">
  <edit name="rgba"><const>rgb</const></edit>
  <edit name="lcdfilter"><const>lcddefault</const></edit>
  <edit name="hinting"><bool>false</bool></edit>
  <edit name="embolden"><bool>true</bool></edit>
</match>
```

Это настройки общие для вообще **всех** шрифтов, сейчас я объясню что они значат:

- `rgba`
  Отвечает за субпиксельное отображение (<i>лучшее</i> сглаживание).

- `lcdfilter`
  Фильтр для корректного субпиксельного сглаживания.

- `hinting`
  Выравнивает глифы по сетке. **Отключайте, если не хотите чтобы шрифт
  “прыгал”.**

- `embolden`
  Синтетически **утолщает** начертание. Это моя <ins>любимая</ins> настройка, потому что
  с ней любой шрифт выглядит <i>куда круче</i>.

Чтобы узнать о других параметрах посетите
[вики](https://wiki.archlinux.org/index.php/Font_configuration_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)) или [документацию](https://www.freedesktop.org/software/fontconfig/fontconfig-user.html). Также в документации находится <ins>масса интересного</ins> о самом Fontconfig.

## Использование программами

### Терминал

Обычно, ваш терминал использует `monospace` в качестве шрифта, так что
у вас уже должно всё работать. В ином случае придется указывать **вручную**.
Я покажу как изменить шрифт в [`st`](https://st.suckless.org).
Откройте конфиг файл и добавьте строку:
```c
static char *font = "monospace:pixelsize=15";
```
Такой подход <ins>экономит нам кучу времени</ins>, например если мы хотим поменять
шрифт **сразу в разных программах**, то придётся изменить шрифт только в
самом Fontconfig, а не в <mark>куче разных конфигурационных файлов</mark>.

Тут я изменил только размер шрифта (`:pixelsize=15`). Вы можете переопределять
параметры шрифта прямо тут, например: `"monospace:pixelsize=15:hinting=true"`
и так далее.

![терминал](/images/enhancing-of-unix-typography-with-fontconfig/2.png)

Всё конечно зависит от вашего эмулятора терминала, но вероятнее всего там будет
использоваться <ins>та же схема</ins>.

### Окружение
Тут также всё должно произойти **автоматически**, если это не так - смотрите пример с
терминалом, всё точно также.

### Браузер

#### Firefox

Откройте `about:preferences`, найдите параметры шрифтов, и укажите везде <ins>Default</ins>.

Также я предпочитаю менять шрифт интерфейса Firefox, через `userChrome.css` файл.
Находится он в `~/.mozilla/firefox/<профиль>/chrome/userChrome.css`, добавьте туда:

```css
* {
  font-family: sans-serif !important;
}
```

![firefox](/images/enhancing-of-unix-typography-with-fontconfig/1.png)

Узнать **имя вашего профиля** можно на странице `about:support`, поле `Profile Directory`.

#### Chromium

Откройте `chrome://settings/fonts`, и укажите:

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

## Иконки и эмодзи

Для отображения различных Unicode иконок, вам
понадобится <i>иконочный шрифт</i>, например
[Nerd Fonts](https://github.com/ryanoasis/nerd-fonts/blob/master/src/glyphs/Symbols-1000-em%20Nerd%20Font%20Complete.ttf).
Изучите этот репозиторий, он содержит **огромное количество** иконочных шрифтов,
также есть утилиты которые позволяют <ins>пропатчить ваш шрифт</ins> для поддержки
иконок в нём.

[Эмодзи](https://ru.wikipedia.org/wiki/%D0%AD%D0%BC%D0%BE%D0%B4%D0%B7%D0%B8)
по сути тоже являются <i>некоторым шрифтом</i>, так что
их тоже можно **переопределить** в Fontconfig.
Так например чтобы использовать эмодзи от Apple, установите
[этот](https://github.com/samuelngs/apple-emoji-linux/releases/download/latest/AppleColorEmoji.ttf) шрифт. Затем в `~/.config/fontconfig/fonts.conf`:

```xml
<match>
  <test name="family"><string>emoji</string></test>
  <edit name="family" mode="prepend" binding="strong">
    <string>Apple Color Emoji</string>
  </edit>
</match>
```

![эмодзи](/images/enhancing-of-unix-typography-with-fontconfig/3.png)

## Заключение

Итак, я показал вам как настраивать и выбирать шрифты с помощью
**Fontconfig**. <mark>Не ленитесь</mark> и изучите документацию к ней.
<ins>Гарантирую</ins> - вы не пожалеете, ведь она содержит
в себе <i>намного больше интересного</i> чем эта статья.
Я же попытался показать вам **базовые принципы** настроек,
и общее представление о типографике в <i>*NIX</i>. Надеюсь было познавательно :).

Мою конфигурацию всегда можно найти
[тут](https://git.ceigh.com/?p=dotfiles.git;a=blob;f=.config/fontconfig/fonts.conf;h=992d003f85586263a865288a8abf729c1ca10ca0;hb=HEAD)[^5]

## Ссылки

Материалы статьи.

[^1]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/typography - руководства Apple
[^2]: https://ru.wikipedia.org/wiki/Ppi - что такое PPI
[^3]: https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D0%B3%D0%B0%D1%82%D1%83%D1%80%D0%B0_(%D1%81%D0%BE%D0%B5%D0%B4%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B1%D1%83%D0%BA%D0%B2) - о лигатурах
[^4]: https://github.com/tonsky/FiraCode - шрифт FiraCode
[^5]: https://github.com/ceigh/dotfiles/blob/master/.config/fontconfig/fonts.conf - конфиг на GitHub

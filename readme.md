# micromark-extension-gfm

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[micromark][] extension to support [GitHub flavored markdown][gfm] (GFM).

## Contents

*   [What is this?](#what-is-this)
*   [When to use this](#when-to-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`gfm(options?)`](#gfmoptions)
    *   [`gfmHtml(htmlOptions?)`](#gfmhtmlhtmloptions)
*   [Authoring](#authoring)
*   [HTML](#html)
*   [CSS](#css)
*   [Syntax](#syntax)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package contains extensions that add support for all features enabled by
GFM to [`micromark`][micromark].
It supports autolink literals, footnotes, strikethrough, tables, tagfilter, and
tasklists.

## When to use this

These tools are all low-level.
In many cases, you want to use [`remark-gfm`][plugin] with remark instead.

When you do want to use `micromark`, you likely want to use
this to support all GFM features.

When working with `mdast-util-from-markdown`, you must combine this package with
[`mdast-util-gfm`][util].

Alternatively, you can also use the underlying features separately:

*   [`micromark/micromark-extension-gfm-autolink-literal`][gfm-autolink-literal]
    — support GFM [autolink literals][]
*   [`micromark/micromark-extension-gfm-footnote`][gfm-footnote]
    — support GFM [footnotes][]
*   [`micromark/micromark-extension-gfm-strikethrough`][gfm-strikethrough]
    — support GFM [strikethrough][]
*   [`micromark/micromark-extension-gfm-table`][gfm-table]
    — support GFM [tables][]
*   [`micromark/micromark-extension-gfm-tagfilter`][gfm-tagfilter]
    — support GFM [tagfilter][]
*   [`micromark/micromark-extension-gfm-task-list-item`][gfm-task-list-item]
    — support GFM [tasklists][]

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, 16.0+, or 18.0+), install with [npm][]:

```sh
npm install micromark-extension-gfm
```

In Deno with [`esm.sh`][esmsh]:

```js
import {gfm, gfmHtml} from 'https://esm.sh/micromark-extension-gfm@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {gfm, gfmHtml} from 'https://esm.sh/micromark-extension-gfm@2?bundle'
</script>
```

## Use

Say our document `example.md` contains:

```markdown
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tag filter

<plaintext>

## Tasklist

* [ ] to do
* [x] done
```

…and our module `example.js` looks as follows:

```js
import fs from 'node:fs/promises'
import {micromark} from 'micromark'
import {gfm, gfmHtml} from 'micromark-extension-gfm'

const output = micromark(await fs.readFile('example.md'), {
  allowDangerousHtml: true,
  extensions: [gfm()],
  htmlExtensions: [gfmHtml()]
})

console.log(output)
```

…now running `node example.js` yields:

```html
<h1>GFM</h1>
<h2>Autolink literals</h2>
<p><a href="http://www.example.com">www.example.com</a>, <a href="https://example.com">https://example.com</a>, and <a href="mailto:contact@example.com">contact@example.com</a>.</p>
<h2>Footnote</h2>
<p>A note<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup></p>
<h2>Strikethrough</h2>
<p><del>one</del> or <del>two</del> tildes.</p>
<h2>Table</h2>
<table>
<thead>
<tr>
<th>a</th>
<th align="left">b</th>
<th align="right">c</th>
<th align="center">d</th>
</tr>
</thead>
</table>
<h2>Tag filter</h2>
&lt;plaintext>
<h2>Tasklist</h2>
<ul>
<li><input type="checkbox" disabled="" /> to do</li>
<li><input type="checkbox" disabled="" checked="" /> done</li>
</ul>
<section data-footnotes="" class="footnotes"><h2 id="footnote-label" class="sr-only">Footnotes</h2>
<ol>
<li id="user-content-fn-1">
<p>Big note. <a href="#user-content-fnref-1" data-footnote-backref="" class="data-footnote-backref" aria-label="Back to content">↩</a></p>
</li>
</ol>
</section>
```

## API

This package exports the identifiers `gfm` and `gfmHtml`.
There is no default export.

The export map supports the endorsed [`development` condition][condition].
Run `node --conditions development module.js` to get instrumented dev code.
Without this condition, production code is loaded.

### `gfm(options?)`

Add support for parsing GFM in markdown.

Function that can be called to get a syntax extension for micromark (passed in
`extensions`).

##### `options`

Configuration (optional).

###### `options.singleTilde`

Whether to support strikethrough with a single tilde (`boolean`, default:
`true`).
Single tildes work on github.com, but are technically prohibited by GFM.

Passed as [`singleTilde`][single-tilde] in
[`micromark-extension-gfm-strikethrough`][gfm-strikethrough].

### `gfmHtml(htmlOptions?)`

Add support for turning GFM in markdown to HTML.

Function that can be called to get an HTML extension for micromark (passed in
`htmlExtensions`).

##### `htmlOptions`

Configuration (optional).

###### `htmlOptions.clobberPrefix`

Prefix to use before the `id` attribute to prevent it from *clobbering*
(`string`, default: `'user-content-'`).
DOM clobbering is this:

```html
<p id=x></p>
<script>console.log(x)</script>
<!-- The element is printed to the console. -->
```

Elements by their ID are made available in browsers on the `window` object.
Using a prefix prevents this from being a problem

Passed as [`clobberPrefix`][clobber-prefix] in
[`micromark-extension-gfm-footnote`][gfm-footnote].

###### `htmlOptions.label`

Label to use for the footnotes section (`string`, default: `'Footnotes'`).
Affects screen reader users.
Change it if you’re authoring in a different language.

Passed as [`label`][label] in
[`micromark-extension-gfm-footnote`][gfm-footnote].

###### `htmlOptions.backLabel`

Label to use from backreferences back to their footnote call (`string`, default:
`'Back to content'`).
Affects screen reader users.
Change it if you’re authoring in a different language.

Passed as [`backLabel`][backlabel] in
[`micromark-extension-gfm-footnote`][gfm-footnote].

## Authoring

For recommendations on how to author GFM, see each corresponding readme:

*   [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#authoring)
*   [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#authoring)
*   [strikethrough](https://github.com/micromark/micromark-extension-gfm-strikethrough#authoring)
*   [table](https://github.com/micromark/micromark-extension-gfm-table#authoring)
*   tagfilter n/a
*   [tasklists](https://github.com/micromark/micromark-extension-gfm-task-list-item#authoring)

## HTML

For info on what HTML features GFM relates to, see each corresponding readme:

*   [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#html)
*   [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#html)
*   [strikethrough](https://github.com/micromark/micromark-extension-gfm-strikethrough#html)
*   [table](https://github.com/micromark/micromark-extension-gfm-table#html)
*   [tagfilter](https://github.com/micromark/micromark-extension-gfm-tagfilter#html)
*   [tasklists](https://github.com/micromark/micromark-extension-gfm-task-list-item#html)

## CSS

For info on how GitHub styles these features, see each corresponding readme:

*   [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#css)
*   [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#css)
*   [strikethrough](https://github.com/micromark/micromark-extension-gfm-strikethrough#css)
*   [table](https://github.com/micromark/micromark-extension-gfm-table#css)
*   tagfilter n/a
*   [tasklists](https://github.com/micromark/micromark-extension-gfm-task-list-item#css)

## Syntax

For info on the syntax of these features, see each corresponding readme:

*   [autolink literal](https://github.com/micromark/micromark-extension-gfm-autolink-literal#syntax)
*   [footnote](https://github.com/micromark/micromark-extension-gfm-footnote#syntax)
*   [strikethrough](https://github.com/micromark/micromark-extension-gfm-strikethrough#syntax)
*   [table](https://github.com/micromark/micromark-extension-gfm-table#syntax)
*   tagfilter n/a
*   [tasklists](https://github.com/micromark/micromark-extension-gfm-task-list-item#syntax)

## Types

This package is fully typed with [TypeScript][].
It exports the additional types `Options` and `HtmlOptions`.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
It also works in Deno and modern browsers.

## Security

This package is safe.
Setting `htmlOptions.clobberPrefix = ''` is dangerous.

## Contribute

See [`contributing.md` in `micromark/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/micromark/micromark-extension-gfm/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-gfm/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-gfm.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-gfm

[downloads-badge]: https://img.shields.io/npm/dm/micromark-extension-gfm.svg

[downloads]: https://www.npmjs.com/package/micromark-extension-gfm

[size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-extension-gfm.svg

[size]: https://bundlephobia.com/result?p=micromark-extension-gfm

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/micromark/micromark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/micromark/.github/blob/main/contributing.md

[support]: https://github.com/micromark/.github/blob/main/support.md

[coc]: https://github.com/micromark/.github/blob/main/code-of-conduct.md

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[condition]: https://nodejs.org/api/packages.html#packages_resolving_user_conditions

[typescript]: https://www.typescriptlang.org

[micromark]: https://github.com/micromark/micromark

[plugin]: https://github.com/remarkjs/remark-gfm

[gfm]: https://github.github.com/gfm/

[strikethrough]: https://github.github.com/gfm/#strikethrough-extension-

[tables]: https://github.github.com/gfm/#tables-extension-

[tasklists]: https://github.github.com/gfm/#task-list-items-extension-

[autolink literals]: https://github.github.com/gfm/#autolinks-extension-

[tagfilter]: https://github.github.com/gfm/#disallowed-raw-html-extension-

[footnotes]: https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/

[single-tilde]: https://github.com/micromark/micromark-extension-gfm-strikethrough#optionssingletilde

[clobber-prefix]: https://github.com/micromark/micromark-extension-gfm-footnote#htmloptionsclobberprefix

[label]: https://github.com/micromark/micromark-extension-gfm-footnote#htmloptionslabel

[backlabel]: https://github.com/micromark/micromark-extension-gfm-footnote#htmloptionsbacklabel

[gfm-strikethrough]: https://github.com/micromark/micromark-extension-gfm-strikethrough

[gfm-autolink-literal]: https://github.com/micromark/micromark-extension-gfm-autolink-literal

[gfm-footnote]: https://github.com/micromark/micromark-extension-gfm-footnote

[gfm-table]: https://github.com/micromark/micromark-extension-gfm-table

[gfm-tagfilter]: https://github.com/micromark/micromark-extension-gfm-tagfilter

[gfm-task-list-item]: https://github.com/micromark/micromark-extension-gfm-task-list-item

[util]: https://github.com/syntax-tree/mdast-util-gfm

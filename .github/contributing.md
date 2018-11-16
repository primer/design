# Contributing

## Creating pages
To create a new page, just create a new file in the `pages/design` directory. (Note: pages outside of the `design` subdirectory will not be accessible from `primer.style/design`!)

The URL for each page reflects its path within the `pages` directory, so:

* `pages/design/foo.js` loads at `/design/foo`
* `pages/design/foo/index.js` **also** loads at `/design/foo`
* `pages/design/foo/bar.js` loads at `/design/foo/bar`
* ...and so on!

### Page naming conventions
Please follow these conventions when naming new pages:

1. Use all lower-case letters: `about.md`, not `About.md`
1. Separate words with hyphens, not underscores: `color-system.md` rather than `color_system` or `colorsystem`

## Navigation
The top and side navigation is generated automatically from the `pages` directory structure and a [tree model](https://www.npmjs.com/package/tree-model) that can be programmatically walked and searched. To get a sense of what that structure looks like, run the `tree` command in `pages/design`:


```
~/primer/design/pages/design% tree
.
├── communication
├── foundation
│   ├── color.mdx
│   └── index.mdx
├── global
│   ├── accessibility.mdx
│   └── index.mdx
├── index.mdx
└── tools
    ├── figma.mdx
    ├── index.mdx
    └── sketch.mdx

4 directories, 8 files
```

### Top navigation
The top nav is made from the list of pages that export `meta.nav.top === true`. Pages written in [MDX] or JS can be included in this list with:

```js
export const meta = {nav: {top: true}, /* etc. */ }
```

### Side navigation
The side navigation is built by looking for the closest "ancestor" of the current page that exports `meta.nav.side === true`:

```js
export const meta = {nav: {side: true}, /* etc. */ }
```

You can set both `top` and `side` nav keys; in fact, we do this in `pages/design/tools/index.mdx` so that it's listed in the top nav _and_ so that its children are listed whenever you're in that section. (We exclude pages with `meta.nav.top === true` from being side nav listings.)

### Link text
The link text will be the page's `meta.displayName` export. If you see a nav link with a filename as its text (e.g. `design/tools/sketch.mdx`), it's probably missing the `meta` export, which you can add to the bottom of your [MDX] or JS file:

```js
export const meta = {displayName: 'Link text'}
```

For consistency and skimmability, lists of links in the top and side navigation areas are sorted alphabetically.

## Content types
You can write pages in any of the following formats:

| Format | Extension | Notes |
| :--- | :--- | :--- |
| Markdown | `.md` | Content should be styled similar to github.com using [primer-markdown] |
| MDX | `.mdx` | [MDX] is Markdown + JSX tags; see [the syntax docs](https://mdxjs.com/syntax) for examples |
| JavaScript | `.js` | You must `export default` a React component

[MDX]: https://mdxjs.com/
[primer-markdown]: https://github.com/primer/primer/tree/master/modules/primer-markdown#documentation

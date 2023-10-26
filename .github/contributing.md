# Contributing

## Creating pages
To create a new page, just create a new file in the `pages/design` directory. (Note: pages outside of the `design` subdirectory will not be accessible from `primer.style`!)

The URL for each page reflects its path within the `pages` directory, so:

* `pages/design/foo.js` loads at `/design/foo`
* `pages/design/foo/index.js` **also** loads at `/design/foo`
* `pages/design/foo/bar.js` loads at `/design/foo/bar`
* ...and so on!

### Page naming conventions
Please follow these conventions when naming new pages:

1. Use all lower-case letters: `about.md`, not `About.md`
1. Separate words with hyphens, not underscores: `color-system.md` rather than `color_system` or `colorsystem`

## Content types
You can write pages in any of the following formats:

| Format | Extension | Notes |
| :--- | :--- | :--- |
| Markdown | `.md` | Content should be styled similar to github.com using [primer-markdown] |
| MDX | `.mdx` | [MDX] is Markdown + JSX tags; see [the syntax docs](https://mdxjs.com/syntax) for examples |
| JavaScript | `.js` | You must `export default` a React component

[MDX]: https://mdxjs.com/
[primer-markdown]: https://primer.style/css/components/markdown

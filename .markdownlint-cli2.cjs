const githubMarkdownOpinions = require('@github/markdownlint-github')

const options = githubMarkdownOpinions.init({
  'line-length': false,
  'blanks-around-headings': false,
  'no-hard-tabs': false,
  'no-trailing-spaces': false,
  'no-multiple-blanks': false,
  'ul-style': false,
  'ul-indent': false,
  'blanks-around-lists': false,
  'no-trailing-punctuation': false,
  'no-space-in-code': false,
  'single-trailing-newline': false,
  'link-image-reference-definitions': false // flaky
})

module.exports = {
  config: options,
  customRules: ["@github/markdownlint-github"],
}
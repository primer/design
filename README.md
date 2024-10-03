# Primer Design System documentation

Documentation for all things Primer, including components, UI patterns, foundations, guides, and more.

## Status

This repository is evolving as our documentation needs change. See our [contribution guides here](https://primer.style/guides/contribute/documentation).

[Project board](https://github.com/orgs/github/projects/4503/views/16) (GitHub staff only)

## Local development

1. Clone this repo, e.g. with:

   ```sh
   git clone https://github.com/primer/design
   ```

2. In the terminal, navigate (`cd`) to the repo directory
3. `nvm use --default` to use the correct node version.
4. `yarn` to install dependencies
5. `yarn start` to start the dev server

### Figma API token

To get images downloaded from the Figma API, you'll need to create a `.env` file in the root of the project and add your Figma API token. You can create a new token [here](https://www.figma.com/developers/api#access-tokens).

```sh
`FIGMA_API_TOKEN=your-token-here`
``

## Deployment

We deploy this site using [GitHub Pages](https://pages.github.com/). Every push to a branch other than `main` will deploy to a URL unique to the preview environment. Merges to `main` will automatically deploy the site to `https://primer.style/`.

## FAQ

### How do I add documentation for a new component or edit existing component documentation?
- Our [component documentation files are found here](https://github.com/primer/design/tree/main/content/components), and guidelines for adding content can be found under the [Documenting components](https://primer.style/guides/contribute/documentation#documenting-components) section of the [Contributing guidelines]((https://primer.style/guides/contribute/documentation)).
- For a more detailed walk-through, check out this [tutorial video](https://www.loom.com/share/ac56f610076f41878d0351b4a1c44a6b?sid=1bd5a46d-a7ea-4e0d-bb08-ed9e8c8bfe12).

### I need help getting started.
- Check out our [getting started guides](https://primer.style/guides) or ping us in [Slack](https://github.slack.com/archives/CSGAVNZ19) (GitHub staff only)

### I noticed a bug in the documentation!
- Feel free to open a pull request or issue directly in this repository, or ping us in [Slack](https://github.slack.com/archives/CSGAVNZ19) (GitHub staff only)

const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Interface guidelines',
    shortName: 'Interface guidelines',
    description: 'Principles, standards, and usage guidelines for designing GitHub interfaces.',
  },
  pathPrefix: '/design',
  plugins: [
    {
      resolve: '@primer/gatsby-theme-doctocat',
      options: {
        defaultBranch: 'main',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: '/src/images/svg/',
        },
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          react: path.resolve(__dirname, 'node_modules', 'react'),
          '~': path.resolve(__dirname),
        },
      },
    },
  ],
}

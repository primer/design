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
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          react: path.resolve(__dirname, 'node_modules', 'react'),
        },
      },
    },
  ],
}

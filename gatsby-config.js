const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Primer',
    header: {
      title: 'Primer Design System'
    },
    // Remove short name from site header
    shortName: '',
    description: 'Principles, standards, and usage guidelines for designing GitHub interfaces.',
    primerTracking: 'true'
  },
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
          '~': path.resolve(__dirname),
        },
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: false,
      },
    },
  ],
}

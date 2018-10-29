const withPlugins = require('next-compose-plugins')
const mdx = require('@zeit/next-mdx')

const assetPrefix = process.env.NOW_URL

module.exports = withPlugins([
  mdx({extension: /\.mdx?$/})
], {
  assetPrefix,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],

  publicRuntimeConfig: {
    assetPrefix
  },

  webpack(config, {dev}) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {loader: '@svgr/webpack'}
    })
    const {optimization} = config
    if (optimization && Array.isArray(optimization.minimizer)) {
      const terserPlugin = optimization.minimizer[0]
      /* eslint-disable camelcase, no-console */
      console.warn('*** disabling mangling in Terser plugin ***')
      terserPlugin.options.terserOptions = {
        keep_fnames: true
      }
      /* eslint-enable camelcase, no-console */
    }
    return config
  }
})

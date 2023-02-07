const path = require('path')
const icons = require('@primer/octicons-react/build/data.json')
const defines = require('./babel-defines')

exports.onCreateWebpackConfig = ({actions, plugins, getConfig}) => {
  const config = getConfig()
  // Add our `__DEV__` and `process.env.NODE_ENV` defines
  config.plugins.push(plugins.define(defines[process.env.NODE_ENV || 'development']))

  // Polyfill `path` and stub `fs` for use in the browser
  // https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#webpack-5-node-configuration-changed-nodefs-nodepath-
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      path: require.resolve('path-browserify'),
    },
    fallback: {
      ...config.resolve.fallback,
      fs: false,
    },
  }

  actions.replaceWebpackConfig(config)
}

exports.sourceNodes = ({actions, createNodeId, createContentDigest}) => {
  // TODO: Fetch latest version Octicons from npm
  for (const icon of Object.values(icons)) {
    for (const [height, data] of Object.entries(icon.heights)) {
      const nodeData = {
        name: icon.name,
        keywords: icon.keywords,
        width: data.width,
        height: parseInt(height, 10),
        // We're calling this field `svgPath` because
        // `path` is a reserved field name.
        svgPath: data.path,
        heights: Object.keys(icon.heights),
      }

      const newNode = {
        ...nodeData,
        id: createNodeId(`icon-${icon.name}-${height}`),
        internal: {
          type: 'Octicon',
          contentDigest: createContentDigest(nodeData),
        },
      }

      actions.createNode(newNode)
    }
  }
}

exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      allOcticon {
        nodes {
          name
          keywords
          width
          height
          svgPath
          heights
        }
      }
    }
  `)

  const iconPageTemplate = path.resolve(__dirname, 'src/layouts/icon-page.js')

  for (const icon of data.allOcticon.nodes) {
    actions.createPage({
      path: `/foundations/icons/${icon.name}-${icon.height}`,
      component: iconPageTemplate,
      context: {
        name: icon.name,
        keywords: icon.keywords,
        width: icon.width,
        height: icon.height,
        svgPath: icon.svgPath,
        heights: icon.heights,
      },
    })
  }
}

const path = require('path')
const defines = require('./babel-defines')
const fetch = require('node-fetch')

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

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {
  // Save the current version of Octicons to the GraphQL store.
  // This will be the latest version at the time the site is built.
  // If a new version is released, we'll need to rebuild the site.
  const {version} = await fetch('https://unpkg.com/@primer/octicons/package.json').then(res => res.json())

  const nodeData = {
    version,
  }

  const newNode = {
    ...nodeData,
    id: createNodeId('octicons-version'),
    internal: {
      type: 'OcticonsVersion',
      contentDigest: createContentDigest(nodeData),
    },
  }

  actions.createNode(newNode)

  // Save the icon data to the GraphQL store
  const octiconData = await fetch('https://unpkg.com/@primer/octicons/build/data.json').then(res => res.json())

  for (const icon of Object.values(octiconData)) {
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

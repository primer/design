const path = require('path')
const defines = require('./babel-defines')
const fetch = require('node-fetch')
const fs = require('fs')

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

// Source site data and add it to the GraphQL store
exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {
  await sourcePrimerReactData({actions, createNodeId, createContentDigest})
  await sourceOcticonData({actions, createNodeId, createContentDigest})
}

async function sourcePrimerReactData({actions, createNodeId, createContentDigest}) {
  // Save the current version of Primer React to the GraphQL store.
  // This will be the latest version at the time the site is built.
  // If a new version is released, we'll need to rebuild the site.
  const {version} = await fetch('https://unpkg.com/@primer/react/package.json').then(res => res.json())

  const nodeData = {
    version,
  }

  const newNode = {
    ...nodeData,
    id: createNodeId('primer-react-version'),
    internal: {
      type: 'PrimerReactVersion',
      contentDigest: createContentDigest(nodeData),
    },
  }

  actions.createNode(newNode)

  // Save the Primer React data to the GraphQL store
  const json = await fetch(
    `https://api.github.com/repos/primer/react/contents/generated/components.json?ref=v${version}`,
  ).then(res => res.json())

  const content = JSON.parse(Buffer.from(json.content, 'base64').toString())

  for (const component of Object.values(content.components)) {
    const newNode = {
      ...{...component, componentId: component.id},
      id: createNodeId(`react-${component.id}`),
      internal: {
        type: 'ReactComponent',
        contentDigest: createContentDigest({...component, componentId: component.id}),
      },
    }

    actions.createNode(newNode)
  }
}

async function sourceOcticonData({actions, createNodeId, createContentDigest}) {
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

// Create pages from data in the GraphQL store
exports.createPages = async ({actions, graphql}) => {
  await createComponentPages({actions, graphql})
  await createIconPages({actions, graphql})

  const {data} = await graphql(`
    query {
      allMdx(filter: {slug: {regex: "/^components/.+/"}}) {
        nodes {
          slug
          frontmatter {
            reactId
            title
            description
          }
        }
      }
      allReactComponent {
        nodes {
          id: componentId
          name
          status
          a11yReviewed
          stories {
            id
            code
          }
          props {
            name
            type
            description
            defaultValue
            required
            deprecated
          }
          subcomponents {
            name
            props {
              name
              type
              description
              defaultValue
              required
              deprecated
            }
          }
        }
      }
    }
  `)

  const components = data.allMdx.nodes
    .filter(node => Boolean(node.frontmatter.title))
    .map(node => {
      const reactComponent = data.allReactComponent.nodes.find(component => component.id === node.frontmatter.reactId)

      return {
        id: node.slug.replace(/^components\//, ''),
        name: node.frontmatter.title,
        description: node.frontmatter.description,
        implementations: {
          react: reactComponent || null,
        },
      }
    })

  fs.writeFileSync(
    path.resolve(process.cwd(), 'public/components.json'),
    JSON.stringify({schemaVersion: 1, components}),
  )
}

async function createComponentPages({actions, graphql}) {
  const {data} = await graphql(`
    {
      allMdx {
        nodes {
          slug
          frontmatter {
            reactId
            railsUrl: rails
            figmaUrl: figma
          }
        }
      }
    }
  `)

  const reactComponentLayout = path.resolve(__dirname, 'src/layouts/react-component-layout.tsx')
  const railsComponentLayout = path.resolve(__dirname, 'src/layouts/rails-component-layout.tsx')
  const figmaComponentLayout = path.resolve(__dirname, 'src/layouts/figma-component-layout.tsx')

  for (const {slug, frontmatter} of data.allMdx.nodes) {
    if (frontmatter.reactId) {
      actions.createPage({
        path: `/${slug}/react`,
        component: reactComponentLayout,
        context: {
          componentId: frontmatter.reactId,
          parentPath: `/${slug}`,
        },
      })
    }

    if (frontmatter.railsUrl) {
      actions.createPage({
        path: `/${slug}/rails`,
        component: railsComponentLayout,
        context: {
          parentPath: `/${slug}`,
        },
      })
    }

    if (frontmatter.figmaUrl) {
      actions.createPage({
        path: `/${slug}/figma`,
        component: figmaComponentLayout,
        context: {
          parentPath: `/${slug}`,
        },
      })
    }
  }
}

async function createIconPages({actions, graphql}) {
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

// Create a JSON file with component metadata
// so we can use Primer data outside of the docs site.
exports.onPostBuild = async ({graphql}) => {
  const {data} = await graphql(`
    query {
      allMdx(filter: {slug: {regex: "/^components/.+/"}}) {
        nodes {
          slug
          frontmatter {
            reactId
            title
            description
          }
        }
      }
      allReactComponent {
        nodes {
          id: componentId
          name
          status
          a11yReviewed
          stories {
            id
            code
          }
          props {
            name
            type
            description
            defaultValue
            required
            deprecated
          }
          subcomponents {
            name
            props {
              name
              type
              description
              defaultValue
              required
              deprecated
            }
          }
        }
      }
    }
  `)

  const components = data.allMdx.nodes
    .filter(node => Boolean(node.frontmatter.title))
    .map(node => {
      const reactComponent = data.allReactComponent.nodes.find(component => component.id === node.frontmatter.reactId)

      return {
        id: node.slug.replace(/^components\//, ''),
        name: node.frontmatter.title,
        description: node.frontmatter.description,
        implementations: {
          react: reactComponent || null,
        },
      }
    })

  fs.writeFileSync(
    path.resolve(process.cwd(), 'public/components.json'),
    JSON.stringify({schemaVersion: 1, components}),
  )
}

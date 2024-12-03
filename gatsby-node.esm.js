import * as path from 'path'
import * as fs from 'fs'
import * as defines from './babel-defines'
import fetch from 'node-fetch'
import GithubSlugger from 'github-slugger'
import { latestStatusFrom } from './src/status-utils'
import { Octokit } from '@octokit/rest'
import JSZip from 'jszip'

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
  await sourcePrimerRailsData({actions, createNodeId, createContentDigest})
  await sourceOcticonData({actions, createNodeId, createContentDigest})
  await sourceFigmaData({actions, createNodeId, createContentDigest})
  await sourceDotcomSharedComponentsData({actions, createNodeId, createContentDigest})
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type SharedComponent implements Node {
      component: String!
      storyIds: [String!]
      status: String!
      path: String!
    }
  `
  createTypes(typeDefs)
}

async function sourceDotcomSharedComponentsData({actions, createNodeId, createContentDigest}) {
  const sharedComponents = await getSharedComponentsData()
  const slugger = new GithubSlugger()

  for (const sharedComponent of sharedComponents) {
    const {component: name} = sharedComponent

    const newNode = {
      component: sharedComponent.component,
      storyIds: sharedComponent.storyIds,
      status: sharedComponent.meta.status,
      path: sharedComponent.meta.path,
      id: createNodeId(`dotcom-shared-${name}`),
      internal: {
        type: 'SharedComponent',
        contentDigest: createContentDigest(sharedComponent),
      },
    }

    actions.createNode(newNode)

    const sharedComponentsPath = '/github-staff/github-shared-components'
    const componentPath = `${sharedComponentsPath}/${slugger.slug(name)}`

    actions.createRedirect({
      fromPath: componentPath,
      toPath: `${sharedComponentsPath}#${name[0].toLowerCase()}`,
      redirectInBrowser: true,
      force: true
    })

    const searchDoc = {
      title: name,
      path: componentPath,
      rawBody: name
    }

    const searchNode = {
      ...searchDoc,
      id: createNodeId(`shared-component-search-doc-${name}`),
      internal: {
        type: 'CustomSearchDoc',
        contentDigest: createContentDigest(searchDoc)
      }
    }

    actions.createNode(searchNode)
  }
}

async function getSharedComponentsData() {
  if (!process.env.GITHUB_TOKEN) {
    console.log('No GITHUB_TOKEN in environment, falling back to using recipe_metadata.json')
    return JSON.parse(fs.readFileSync('recipe_metadata.json', 'utf8'))
  }

  const client = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })

  console.log('Listing dotcom workflow runs...')

  const workflowRuns = await client.rest.actions.listWorkflowRuns({
    owner: 'github',
    repo: 'github',
    workflow_id: 'preview-pages-build.yml',
    branch: 'master',
    status: 'success',
    per_page: 1
  })

  if (workflowRuns.data.workflow_runs.length == 0) {
    console.log('No workflow runs found 🤔')
    return
  }

  const workflowRunId = workflowRuns.data.workflow_runs[0].id
  console.log(`Workflow run ${workflowRunId} found`)

  console.log('Listing workflow run artifacts...')
  const artifacts = await client.rest.actions.listWorkflowRunArtifacts({
    owner: 'github',
    repo: 'github',
    run_id: workflowRunId
  })

  const artifactId = (() => {
    for (const artifact of artifacts.data.artifacts) {
      if (artifact.name == 'recipe-metadata') {
        return artifact.id
      }
    }

    return null
  })()

  if (artifactId) {
    console.log(`Found artifact ${artifactId}`)
  } else {
    console.log('No artifacts found for workflow run 🤯')
    return
  }

  console.log('Downloading artifact...')
  const artifactContents = await client.rest.actions.downloadArtifact({
    owner: 'github',
    repo: 'github',
    artifact_id: artifactId,
    archive_format: 'zip'
  })

  console.log('Extracting artifact...')

  const zip = new JSZip();
  const zipData = await zip.loadAsync(artifactContents.data)
  const manifestRaw = await zipData.file('recipe_metadata.json').async('string')
  const manifest = JSON.parse(manifestRaw)

  return manifest
}

async function sourcePrimerRailsData({actions, createNodeId, createContentDigest}) {
  // Save the current version of PVC to the GraphQL store.
  // This will be the latest version at the time the site is built.
  // If a new version is released, we'll need to rebuild the site.
  const {version} = await fetch('https://rubygems.org/api/v1/versions/primer_view_components/latest.json').then(res =>
    res.json(),
  )

  const nodeData = {
    version,
  }

  const newNode = {
    ...nodeData,
    id: createNodeId('primer-rails-version'),
    internal: {
      type: 'PrimerRailsVersion',
      contentDigest: createContentDigest(nodeData),
    },
  }

  actions.createNode(newNode)

  let infoArch

  // Save the PVC data to the GraphQL store
  if (process.env.RAILS_INFO_ARCH_PATH) {
    const path = process.env.RAILS_INFO_ARCH_PATH
    console.log(`Using Rails information architecture data from ${path}`)
    const fileContent = fs.readFileSync(path, {encoding: 'utf-8'})
    infoArch = JSON.parse(fileContent)
  } else {
    console.log(`Fetching Rails information architecture data for version ${version}`)
    const url = `https://api.github.com/repos/primer/view_components/contents/static/info_arch.json?ref=v${version}`
    const response = await fetch(url).then(res => res.json())

    infoArch = JSON.parse(Buffer.from(response.content, 'base64').toString())
  }

  for (const component of infoArch) {
    const newNode = {
      ...component,
      id: createNodeId(`rails-${component.status}-${component.component}`),
      internal: {
        type: 'RailsComponent',
        contentDigest: createContentDigest(component),
      },
    }

    actions.createNode(newNode)
  }
}

async function sourcePrimerReactData({actions, createNodeId, createContentDigest}) {
  // Save the current version of Primer React to the GraphQL store.
  // This will be the latest version at the time the site is built.
  // If a new version is released, we'll need to rebuild the site.
  const {version} = await fetch('https://unpkg.com/@primer/react/package.json', {redirect: 'follow'}).then(res =>
    res.json(),
  )

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
  const content = await fetch(`https://unpkg.com/@primer/react/generated/components.json`, {redirect: 'follow'}).then(
    res => res.json(),
  )

  for (const component of Object.values(content.components)) {
    const newNode = {
      ...{...component, componentId: component.docsId || component.id},
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
  const {version} = await fetch('https://unpkg.com/@primer/octicons/package.json', {redirect: 'follow'}).then(res =>
    res.json(),
  )

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
  const octiconData = await fetch('https://unpkg.com/@primer/octicons/build/data.json', {redirect: 'follow'}).then(
    res => res.json(),
  )

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

async function sourceFigmaData({actions, createNodeId, createContentDigest}) {
  // Save the Primer Figma data to the GraphQL store
  const json = await fetch(
    `https://raw.githubusercontent.com/primer/figma/main/packages/web/generated/components.json`,
  ).then(res => res.json())

  const {fileUrl, components} = json

  /**
   * Add figma components to the GraphQL store
   */
  for (const component of components) {
    const newNode = {
      ...{...component, figmaId: component.id},
      // Create unique id for each component and status
      id: createNodeId(`figma-${component.name}-${component.status}`),
      internal: {
        type: 'figmaComponent',
        contentDigest: createContentDigest({...component, figmaId: component.id}),
      },
    }
    actions.createNode(newNode)
  }

  /**
   * Add figma file url to the GraphQL store
   */
  const nodeData = {
    fileUrl,
  }

  const newNode = {
    ...nodeData,
    id: createNodeId('figma-file'),
    internal: {
      type: 'FigmaFile',
      contentDigest: createContentDigest(nodeData),
    },
  }

  actions.createNode(newNode)
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
            figmaId
            railsIds
            cssId
          }
        }
      }
      allRailsComponent {
        nodes {
          railsId: fully_qualified_name
          status
        }
      }
      allReactComponent {
        nodes {
          reactId: componentId
          docsId
          status
        }
      }
    }
  `)

  const reactComponentLayout = path.resolve(__dirname, 'src/layouts/react-component-layout.tsx')
  const railsComponentLayout = path.resolve(__dirname, 'src/layouts/rails-component-layout.tsx')
  const figmaComponentLayout = path.resolve(__dirname, 'src/layouts/figma-component-layout.tsx')
  const cssComponentLayout = path.resolve(__dirname, 'src/layouts/css-component-layout.tsx')
  const redirectLayout = path.resolve(__dirname, 'src/layouts/redirect-layout.tsx')

  for (const {slug, frontmatter} of data.allMdx.nodes) {
    if (frontmatter.reactId) {
      const statuses = []

      for (const reactComponent of data.allReactComponent.nodes) {
        if (reactComponent.reactId === frontmatter.reactId) {
          statuses.push(reactComponent.status)

          actions.createPage({
            path: `/${slug}/react/${reactComponent.status}`,
            component: reactComponentLayout,
            context: {
              componentId: frontmatter.reactId,
              parentPath: `/${slug}`,
              status: reactComponent.status
            },
          })
        }
      }

      actions.createPage({
        path: `/${slug}/react/latest`,
        component: redirectLayout,
        context: {
          location: `/${slug}/react/${latestStatusFrom(statuses)}`
        }
      })

      actions.createPage({
        path: `/${slug}/react`,
        component: redirectLayout,
        context: {
          location: `/${slug}/react/${latestStatusFrom(statuses)}`
        }
      })
    }

    if (frontmatter.railsIds) {
      const statuses = []

      frontmatter.railsIds.forEach(railsId => {
        let status

        for (const railsComponent of data.allRailsComponent.nodes) {
          if (railsComponent.railsId === railsId) {
            status = railsComponent.status
            break
          }
        }

        statuses.push(status)

        actions.createPage({
          path: `/${slug}/rails/${status}`,
          component: railsComponentLayout,
          context: {
            componentId: railsId,
            parentPath: `/${slug}`,
          },
        })
      })

      actions.createPage({
        path: `/${slug}/rails/latest`,
        component: redirectLayout,
        context: {
          location: `/${slug}/rails/${latestStatusFrom(statuses)}`
        }
      })

      actions.createPage({
        path: `/${slug}/rails`,
        component: redirectLayout,
        context: {
          location: `/${slug}/rails/${latestStatusFrom(statuses)}`
        }
      })
    }

    if (frontmatter.figmaId) {
      actions.createPage({
        path: `/${slug}/figma`,
        component: figmaComponentLayout,
        context: {
          figmaId: frontmatter.figmaId,
          parentPath: `/${slug}`,
        },
      })
    }

    if (frontmatter.cssId) {
      actions.createPage({
        path: `/${slug}/css`,
        component: cssComponentLayout,
        context: {
          cssId: frontmatter.cssId,
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

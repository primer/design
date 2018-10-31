import {config} from './utils'

export const pageMap = config.pageMap || {}
export const pageTree = config.pageTree || {}

// augment the page tree with a function that can find
// a node recursively given a test function
pageTree.find = check => {
  function findIn(node) {
    return check(node) || node.children.find(findIn)
  }
  return findIn(pageTree)
}

export const ROOT_URL = pageTree.path || '/'

const requirePage = require.context('../pages', true, /\.(js|md)x?$/)

export function getComponent(file) {
  const page = requirePage.keys().find(key => key === `.${file}`)
  if (page) {
    return requirePage(page)
  } else {
    // eslint-disable-next-line no-console
    console.warn(`no file to require from file: ${file}`)
  }
}

export function getNavName(file) {
  let name
  const Component = getComponent(file)
  if (Component) {
    name = getDisplayName(Component)
  }
  return name || file
}

export function isFileHidden(file) {
  return getFileMeta(file, 'hidden') === true
}

export function isComponentHidden(Component) {
  return getComponentMeta(Component, 'hidden') === true
}

export function getFileMeta(file, key = null) {
  const Component = getComponent(file)
  if (Component) {
    return getComponentMeta(Component, key)
  }
  return undefined
}

export function getComponentMeta(Component, key = null) {
  const meta = Component.meta || {}
  return key ? meta[key] : meta
}

export function getDisplayName(obj) {
  return (obj.meta ? obj.meta.displayName : null) || obj.displayName || obj.name
}

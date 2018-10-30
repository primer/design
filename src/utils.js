import getConfig from 'next/config'

const config = getConfig().publicRuntimeConfig || {}

export const assetPrefix = config.assetPrefix || ''
export const assetPath = `${assetPrefix}/static/assets/`

export const pageMap = config.pageMap || {}
export const pageTree = config.pageTree || {}

export function getAssetPath(path) {
  return `${assetPath}${path}`
}

export function getDisplayName(obj) {
  return (obj.meta ? obj.meta.displayName : null) || obj.displayName || obj.name
}

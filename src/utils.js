import getConfig from 'next/config'

const config = getConfig().publicRuntimeConfig || {}

export const assetPrefix = config.assetPrefix || ''
export const assetPath = `${assetPrefix}/static/assets/`

export const pageMap = config.pageMap || {}

export function getAssetPath(path) {
  return `${assetPath}${path}`
}

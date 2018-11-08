import TreeModel from 'tree-model'
import {config} from './utils'

const pageTree = config.pageTree || {}

const tree = new TreeModel()
const root = tree.parse(pageTree)

export default root

export function populateTree(context) {
  const keys = context.keys()
  root.walk(node => {
    const {path, file} = node.model
    const key = keys.find(key => key === `.${file}`)
    const component = key ? context(key) : {}
    const meta = component.meta || {}
    const name = meta.displayName || component.displayName || component.name || path
    Object.assign(node, {component, meta, name, path})
  })

  // sort all of the child lists by name or path
  const compareKey = key => (a, b) => a[key].localeCompare(b[key])
  const compareName = compareKey('name')
  const comparePath = compareKey('path')
  const cmpNode = (a, b) => compareName(a, b) || comparePath(a, b)
  root.walk(node => node.children.sort(cmpNode))

  return root
}

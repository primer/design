import * as primerComponents from '@primer/react'
import * as deprecated from '@primer/react/deprecated'
import * as octicons from '@primer/octicons-react'
import State from '../../components/state'

// Exclude octicons-react's default export because it's deprecated
const {default: _, ...octiconComponents} = octicons

export default function resolveScope(metastring) {
  return {
    Octicon: primerComponents.StyledOcticon,  // alias
    ...primerComponents,
    ...octiconComponents,
    ...(metastring.includes('deprecated') ? deprecated : {}),
    State,
  }
}

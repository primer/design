import * as primerComponents from '@primer/react'
import State from '../../components/state'

export default function resolveScope(_metastring) {
  return {
    ...primerComponents,
    State
  }
}

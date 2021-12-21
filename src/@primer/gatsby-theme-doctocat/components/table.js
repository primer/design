/**
 * We can delete this file when doctocat PR is merged
 * https://github.com/primer/doctocat/pull/330
 */

import styled from 'styled-components'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'

const OverridenTable = styled(Table)`
  img {
    vertical-align: middle;
  }
`

export default OverridenTable

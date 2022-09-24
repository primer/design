import React, {FC} from 'react'
import Table from '@primer/gatsby-theme-doctocat/src/components/table.js'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code.js'
import {Box} from '@primer/react'
import styled from 'styled-components'
import propValues from '@primer/view-components/static/arguments.json'

// const TokenTable = styled(Table)`
//   display: table;
// `

interface PropsTableProps {
  component?: string
  status?: string
}

const PropsTable: FC<PropsTableProps> = ({component = 'button'}) => {
  const lookupComponent = propValues?.find(e => e['component'] == component)
  return (
    <Table>
      <thead>
        <tr>
          <Box as="th" textAlign="left">
            Name
          </Box>
          <Box as="th" textAlign="left">
            Type
          </Box>
          <Box as="th" textAlign="left">
            Default
          </Box>
          <Box as="th" textAlign="left">
            Description
          </Box>
        </tr>
      </thead>
      <tbody>
        {lookupComponent?.parameters.map(propValue => {
          return (
            <tr>
              <td id={propValue.name} key={propValue.name}>
                <InlineCode>{propValue.name}</InlineCode>
              </td>
              <td id={propValue.type} key={propValue.type}>
                <InlineCode>{propValue.type}</InlineCode>
              </td>
              <td id={propValue.default} key={propValue.default}>
                <InlineCode>{propValue.default}</InlineCode>
              </td>
              <td id={propValue.description} key={propValue.description}>
                {propValue.description}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default PropsTable

import React from 'react'
import {Box, Text, StyledOcticon, Link} from '@primer/react'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import {SyncIcon, TypographyIcon, DiamondIcon} from '@primer/octicons-react'

function propertyValues(property) {
  let values = property.values.map((value, index) => {
    return (
      <React.Fragment key={index}>
        <InlineCode>{value}</InlineCode> 
      </React.Fragment>
    )
  })

  if (property.type === 'TEXT') {
    values = (
      <Link href="https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties#h_01G2Q5G3FV0EQP9RZFZG7GVWEG">
        <Box display="flex" alignItems="center" sx={{gap: 1}}>
          <StyledOcticon icon={TypographyIcon} />
          <Text fontSize={1}>Text</Text>
        </Box>
      </Link>
    )
  }

  if (property.type === 'INSTANCE_SWAP') {
    values = (
      <Link href="https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties#h_01G2Q5FYN2ADEDQ3ZSB1KKY8Z0">
        <Box display="flex" alignItems="center" sx={{gap: 1}}>
          <StyledOcticon icon={SyncIcon} />
          <Text fontSize={1}>Instance swap</Text>
        </Box>
      </Link>
    )
  }

  return values
}

export default function FigmaPropertyOverview({properties}) {
  return (
    <article>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Values</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => {
            return (
              <tr key={index}>
                <td>{property.name}</td>
                <td>{propertyValues(property)}</td>
                <td>
                  <InlineCode>{property.defaultValue}</InlineCode>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </article>
  )
}

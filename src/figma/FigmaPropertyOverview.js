import React from 'react'
import {Heading, Box, Text, StyledOcticon, Link} from '@primer/react'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import {SyncIcon, TypographyIcon, DiamondIcon} from '@primer/octicons-react'

function PropertyValues({property}) {
  let values = property.values.map((value, index) => (
    <>
      <InlineCode key={index}>{value}</InlineCode> 
    </>
  ))

  if (property.type === "TEXT") {
    values = (
      <InlineCode style={{padding: '0.3em 0.4em', verticalAlign: 'middle'}}>
        <StyledOcticon icon={TypographyIcon} sx={{mr: 2}} verticalAlign="middle" />
        text
      </InlineCode>
    )
  }

  if (property.type === 'INSTANCE_SWAP') {
    values = (
      <InlineCode style={{padding: '0.3em 0.4em', verticalAlign: 'middle'}}>
        <Link sx={{color: 'fg.default'}} hoverColor='accent.fg' href="https://help.figma.com/hc/en-us/articles/360039150413-Swap-components-and-instances">
          <StyledOcticon icon={SyncIcon} sx={{mr: 2}} verticalAlign="middle" />
          instance swap
        </Link>
      </InlineCode>
    )
  }

  return (
    <>
      {values}
    </>
  )
}

export default function FigmaPropertyOverview({properties}) {
  const combinationCount = properties
    .flatMap(a => a.values.length)
    .filter(i => i > 0)
    .reduce((accumulator, currentValue) => accumulator * currentValue, 1)

  return (
    <article>
      <Box
        display={'flex'}
        alignItems={'center'}
        sx={{
          marginBottom: 4
        }}
      >
        <StyledOcticon icon={DiamondIcon} sx={{mr: 2}} />
        <Text fontWeight={'bold'}>{combinationCount}</Text>
        <Text>&nbsp;</Text>
        <Text>variants</Text>
      </Box>

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
                <td>
                  <PropertyValues property={property} />
                </td>
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
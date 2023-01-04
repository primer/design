import React from 'react'
import {Heading, Box, Text, StyledOcticon} from '@primer/react'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import {IssueReopenedIcon} from '@primer/octicons-react'

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
        <StyledOcticon icon={IssueReopenedIcon} sx={{mr: 2}} />
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
                  <Box
                    display="flex"
                    flexWrap={'wrap'}
                    sx={{
                      alignItems: 'start',
                      gap: 2
                    }}
                  >
                    {property.values.map((value, index) => (
                      <InlineCode key={index}>{value}</InlineCode>
                    ))}
                  </Box>
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
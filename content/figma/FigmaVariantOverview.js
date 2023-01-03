import React from 'react'
import {Heading, Box, Text, StyledOcticon} from '@primer/react'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import {IssueReopenedIcon} from '@primer/octicons-react'

export default function FigmaVariantOverview({variants}) {
  const variantCount = Object.values(variants)
    .map(array => array.length)
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
        <Text fontWeight={'bold'}>{variantCount}</Text>
        <Text>&nbsp;</Text>
        <Text>{'variants'}</Text>
      </Box>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(variants).map((variant, index) => {
            return (
              <tr key={index}>
                <td>{variant[0]}</td>
                <td>
                  <Box
                    display="flex"
                    flexWrap={'wrap'}
                    sx={{
                      alignItems: 'start',
                      gap: 2
                    }}
                  >
                    {variant[1].map((value, index) => (
                      <InlineCode key={index}>{value}</InlineCode>
                    ))}
                  </Box>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </article>
  )
}

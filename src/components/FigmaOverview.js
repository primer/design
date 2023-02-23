import React from 'react'
import {Box, Avatar, Text, Link, StyledOcticon, Label} from '@primer/react'
import StatusLabel from '@primer/gatsby-theme-doctocat/src/components/status-label'
import {LinkIcon, KeyAsteriskIcon} from '@primer/octicons-react'

export default function FigmaOverview({status, user, updatedAt, url, properties}) {
  const combinationCount = properties
    .flatMap(a => a.values.length)
    .filter(i => i > 0)
    .reduce((accumulator, currentValue) => accumulator * currentValue, 1)
  const date = new Date(updatedAt)

  return (
    <>
      <Box sx={{display: 'flex', gap: 3, mb: 4}}>
        <StatusLabel status={status} />
        <Box
          color={'fg.muted'}
          display={'flex'}
          alignItems={'center'}
          sx={{
            gap: 2,
          }}
        >
          <StyledOcticon color={'fg.subtle'} icon={KeyAsteriskIcon} />
          <div>
            <Text fontWeight={'bold'}>{combinationCount}</Text> <Text>variants</Text>
          </div>
        </Box>
        <Link href={url}>
          <Box display={'flex'} alignItems={'center'} sx={{gap: 2}}>
            <StyledOcticon icon={LinkIcon} />
            Figma
          </Box>
        </Link>
      </Box>
    </>
  )
}

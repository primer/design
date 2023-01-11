import React from 'react'
import {Box, Avatar, Text, Link, StyledOcticon} from '@primer/react'
import StatusLabel from '@primer/gatsby-theme-doctocat/src/components/status-label'
import {LinkIcon, KeyAsteriskIcon} from '@primer/octicons-react'

export default function FigmaOverview({status, user, updatedAt, url, properties, thumbnailUrl}) {
  const combinationCount = properties
    .flatMap(a => a.values.length)
    .filter(i => i > 0)
    .reduce((accumulator, currentValue) => accumulator * currentValue, 1)
  const date = new Date(updatedAt)

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        sx={{
          gap: 4,
          mt: 2
        }}
      >
        <StatusLabel status={status} />
        <Box
          color={'fg.muted'}
          display={'flex'}
          alignItems={'center'}
          sx={{
            gap: 2
          }}
        >
          <StyledOcticon color={'fg.subtle'} icon={KeyAsteriskIcon} />
          <div>
            <Text fontWeight={'bold'}>{combinationCount}</Text> <Text>variants</Text>
          </div>
        </Box>
        <Box color={'fg.muted'} display={'flex'} alignItems={'center'} sx={{gap: 2}}>
          <Avatar src={user.imgUrl} />
          <Text>
            Last edited by {user.handle} on{' '}
            {date.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </Text>
        </Box>
        <Link href={url}>
          <Box display={'flex'} alignItems={'center'} sx={{gap: 2}}>
            <StyledOcticon icon={LinkIcon} />
            Figma
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          placeContent: 'center',
          py: 8,
          px: 6,
          border: '1px solid',
          borderColor: 'border.muted',
          borderRadius: 10,
          bg: 'neutral.subtle',
          mt: 3,
          mb: 6,
          display: 'inline-flex',
          width: '100%'
        }}
      >
        <img src={thumbnailUrl} alt={''} />
      </Box>
    </>
  )
}

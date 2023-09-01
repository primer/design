import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import {graphql, useStaticQuery} from 'gatsby'
import { H3 } from '@primer/gatsby-theme-doctocat/src/components/heading'
import {LinkExternalIcon} from '@primer/octicons-react'

function SharedComponentStatusLabel({status}) {
  const variant = (() => {
    if (status === 'draft') {
      return 'attention'
    } else {
      return 'default'
    }
  })()

  return <Label sx={{marginLeft: '5px'}} variant={variant}>{status}</Label>
}

function SharedComponentLink({component}) {
  const urlForComponent = (component) => {
    return `https://ui.githubapp.com/storybook/?path=/story/${component.storyIds[0]}`
  }

  if (component.storyIds.length > 0) {
    return <Box>
      <Link target="_blank" href={urlForComponent(component)}>
        {component.component} <LinkExternalIcon/>
      </Link>
      &nbsp;
      <SharedComponentStatusLabel status={component.status}></SharedComponentStatusLabel>
    </Box>
  } else {
    return <Box>
      <Link target="_blank" href={`https://github.com/github/github/blob/master/${component.path}`}>
        {component.component} <LinkExternalIcon/>
      </Link>
      <SharedComponentStatusLabel status={component.status}></SharedComponentStatusLabel>
    </Box>
  }
}

export default function DotcomSharedComponentsLayout({pageContext, children}) {
  const data = useStaticQuery(graphql`
    query DotcomSharedComponentsPageQuery {
      allSharedComponent {
        nodes {
          component
          storyIds
          status
          path
        }
      }
    }
  `)

  const {title, description} = pageContext.frontmatter

  const tableOfContents = {
    items: [
      {url: '#related-reading', title: 'Related reading'},
      {url: '#shared-components', title: 'Components'}
    ],
  }

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        <Heading as="h1" sx={{fontSize: 7}}>{title}</Heading>
        <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
          {description}
        </Text>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: [null, 7, 8, 9]}}>
          <Box
            sx={{
              width: 220,
              flex: '0 0 auto',
              position: 'sticky',
              top: HEADER_HEIGHT + 24,
              maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - 24px)`,
              display: ['none', null, 'block'],
            }}
          >
            <Heading as="h3" sx={{fontSize: 1, display: 'inline-block', fontWeight: 'bold', pl: 3}} id="toc-heading">
              On this page
            </Heading>
            <TableOfContents aria-labelledby="toc-heading" items={tableOfContents.items} />
          </Box>
          <Box sx={{'flexGrow': 1}}>
            {children}

            {data.allSharedComponent.nodes.map(component => {
              return <SharedComponentLink component={component} />
            })}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {Box, Heading, Text} from '@primer/react'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import {graphql, useStaticQuery} from 'gatsby'
import { H3 } from '@primer/gatsby-theme-doctocat/src/components/heading'
import {LinkExternalIcon} from '@primer/octicons-react'

function SharedComponentLink({component}) {
  const urlForComponent = (component) => {
    return `https://ui.githubapp.com/storybook/?path=/story/${component.storyIds[0]}`
  }

  if (component.storyIds) {
    return <Box>
      <a target="_blank" href={urlForComponent(component)}>{component.component} <LinkExternalIcon/></a>
    </Box>
  } else {
    return <Box>{component.component}</Box>
  }
}

function SharedComponentGroup({groupKey, components}) {
  return (
    <>
      <H3>{groupKey}</H3>
      {components.map(component => {
        return <SharedComponentLink component={component} />
      })}
    </>
  )
}

export default function DotcomSharedComponentsLayout({pageContext, children}) {
  const data = useStaticQuery(graphql`
    query DotcomSharedComponentsPageQuery {
      allSharedComponent {
        nodes {
          component
          storyIds
        }
      }
    }
  `)

  const alphabetizedComponents = {}

  for (const component of data.allSharedComponent.nodes) {
    const firstLetter = component.component.toUpperCase()[0]

    if (!alphabetizedComponents[firstLetter]) {
      alphabetizedComponents[firstLetter] = []
    }

    alphabetizedComponents[firstLetter].push(component)
  }

  for (const firstLetter of Object.keys(alphabetizedComponents)) {
    alphabetizedComponents[firstLetter].sort((a, b) => {
      if (a.component === b.component) return 0
      return a.component > b.component ? 1 : -1
    })
  }

  const {title, description} = pageContext.frontmatter

  const tableOfContents = {
    items: [
      {url: '#finding-these-components', title: 'Finding these components'},
      {url: '#related-reading', title: 'Related reading'},
      {url: '#components', title: 'Components'}
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

            {Object.keys(alphabetizedComponents).sort().map(firstLetter => {
              return <SharedComponentGroup groupKey={firstLetter} components={alphabetizedComponents[firstLetter]} />
            })}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

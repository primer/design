import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {Box, Heading, Text, UnderlineNav} from '@primer/react'
import {paramCase} from 'change-case'
import {graphql, Link as GatsbyLink, useStaticQuery} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'

export default function ComponentLayout({pageContext, children, path}) {
  const {title, description, rails: railsUrl, figma: figmaUrl} = pageContext.frontmatter

  const data = useStaticQuery(graphql`
    query ReactComponents {
      allReactComponent {
        nodes {
          componentId
        }
      }
    }
  `)

  // Check if component is implemented in Primer React
  const hasReactImpl = data.allReactComponent.nodes.some((node: {componentId}) =>
    path.endsWith(paramCase(node.componentId)),
  )

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7]}}>
        <Heading as="h1">{title}</Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}
        <UnderlineNav sx={{mb: 4}}>
          <UnderlineNav.Link as={GatsbyLink} to={path} selected>
            Overview
          </UnderlineNav.Link>
          {hasReactImpl ? (
            <UnderlineNav.Link as={GatsbyLink} to={`${path}/react`}>
              React
            </UnderlineNav.Link>
          ) : null}
          {railsUrl ? (
            <UnderlineNav.Link href={railsUrl} target="_blank" rel="noopener noreferrer">
              Rails
            </UnderlineNav.Link>
          ) : null}
          {figmaUrl ? (
            <UnderlineNav.Link href={figmaUrl} target="_blank" rel="noopener noreferrer">
              Figma
            </UnderlineNav.Link>
          ) : null}
        </UnderlineNav>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: 4}}>
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
            {pageContext.tableOfContents.items ? (
              <>
                <Text sx={{display: 'inline-block', fontWeight: 'bold', pl: 3}} id="toc-heading">
                  On this page
                </Text>
                <TableOfContents aria-labelledby="toc-heading" items={pageContext.tableOfContents.items} />
              </>
            ) : null}
          </Box>
          <Box>
            {/* Narrow table of contents */}
            {pageContext.tableOfContents.items ? (
              <Box
                sx={{
                  display: ['block', null, 'none'],
                  mb: 5,
                  borderColor: 'border.muted',
                  bg: 'canvas.subtle',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: 2,
                }}
              >
                <Box sx={{px: 3, py: 2}}>
                  <Box
                    sx={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}
                  >
                    <Text sx={{fontWeight: 'bold'}} id="toc-heading-narrow">
                      On this page
                    </Text>
                  </Box>
                </Box>
                <Box sx={{borderTop: '1px solid', borderColor: 'border.muted'}}>
                  <TableOfContents aria-labelledby="toc-heading-narrow" items={pageContext.tableOfContents.items} />
                </Box>
              </Box>
            ) : null}
            <Box
              sx={{
                '& > :first-child': {
                  mt: 0,
                },
                '& > :last-child': {
                  mb: 0,
                },
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
        <PageFooter editUrl={pageContext.editUrl} contributors={pageContext.contributors} />
      </Box>
    </BaseLayout>
  )
}

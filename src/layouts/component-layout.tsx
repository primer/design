import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {Box, Heading, Text, UnderlineNav} from '@primer/react'
import {paramCase} from 'change-case'
import {graphql, Link as GatsbyLink, useStaticQuery} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'

export default function ComponentLayout({pageContext, children, path}) {
  const {title, description, reactId, rails: railsUrl, figma: figmaUrl} = pageContext.frontmatter

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7]}}>
        <Heading as="h1">{title}</Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}
        <Box sx={{mb: 4}}>
          <ComponentPageNav
            basePath={path}
            includeReact={reactId}
            includeRails={railsUrl}
            includeFigma={figmaUrl}
            current="overview"
          />
        </Box>
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
                <Heading
                  as="h3"
                  sx={{fontSize: 2, display: 'inline-block', fontWeight: 'bold', pl: 3}}
                  id="toc-heading"
                >
                  On this page
                </Heading>
                <TableOfContents aria-labelledby="toc-heading" items={pageContext.tableOfContents.items} />
              </>
            ) : null}
          </Box>
          <Box sx={{minWidth: 0}}>
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
                    <Heading as="h3" sx={{fontSize: 2, fontWeight: 'bold'}} id="toc-heading-narrow">
                      On this page
                    </Heading>
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

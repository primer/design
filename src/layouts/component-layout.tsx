import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {Box, Heading, Text, Breadcrumbs} from '@primer/react'
import React from 'react'
import {withPrefix} from 'gatsby'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'
import navItems from '@primer/gatsby-theme-doctocat/src/nav.yml'

type NavItemData = {
  title: string
  url?: string
  children?: NavItemData[]
}

export default function ComponentLayout({pageContext, children, path}) {
  const {title, description, reactId, railsIds, figmaId, cssId} = pageContext.frontmatter

  const getPageAncestry = (url: string, object: NavItemData[]) => {
    const result: NavItemData[] = []
    const buildArray = (node: NavItemData, path: string) => {
      if (node.url === path) {
        result.push({title: node.title, url: node.url})
      } else if (node.children) {
        for (const child of node.children) {
          buildArray(child, path)
          if (result.length > 0) {
            result.unshift({title: node.title, url: node.url})
            break
          }
        }
      }
    }
    for (const node of object) {
      buildArray(node, url)
      if (result.length > 0) {
        break
      }
    }
    return result
  }

  const breadcrumbData = getPageAncestry(path, navItems).filter(item => item.url)

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', pb: [4, 5, 6, 7], px: [4, 5, 6, 7], pt: [2, 3, 4, 5], mx: 'auto'}}>
        {breadcrumbData.length > 1 ? (
          <Breadcrumbs sx={{mb: 4}}>
            {breadcrumbData
              .map(item =>
                item.url ? (
                  <Breadcrumbs.Item key={item.url} href={withPrefix(item.url)} selected={path === item.url}>
                    {item.title}
                  </Breadcrumbs.Item>
                ) : null,
              )
              .filter(item => item)}
          </Breadcrumbs>
        ) : null}
        <Heading as="h1" sx={{fontSize: 7}}>
          {title}
        </Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}
        <Box sx={{mb: 4}}>
          <ComponentPageNav
            basePath={path}
            includeReact={reactId}
            includeRails={railsIds}
            includeFigma={figmaId}
            includeCSS={cssId}
            current="overview"
          />
        </Box>
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
            {pageContext.tableOfContents.items ? (
              <>
                <Heading
                  as="h3"
                  sx={{fontSize: 1, display: 'inline-block', fontWeight: 'bold', pl: 3}}
                  id="toc-heading"
                >
                  On this page
                </Heading>
                <TableOfContents aria-labelledby="toc-heading" items={pageContext.tableOfContents.items} />
              </>
            ) : null}
          </Box>
          <Box sx={{minWidth: 0, flexGrow: 1}}>
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
                    <Heading as="h3" sx={{fontSize: 1, fontWeight: 'bold'}} id="toc-heading-narrow">
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

import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import {Box, Heading, Text, Breadcrumbs, Link} from '@primer/react'
import {MarkGithubIcon} from '@primer/octicons-react'
import React from 'react'
import {withPrefix} from 'gatsby'
import {BaseLayout} from '../components/base-layout'
import navItems from '@primer/gatsby-theme-doctocat/src/nav.yml'

type NavItemData = {
  title: string,
  url?: string,
  children?: NavItemData[]
}

export default function ComponentLayout({pageContext, children, path}) {
  const {title, description, reactId, railsIds, figmaId, cssId, source} = pageContext.frontmatter

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
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        {breadcrumbData.length > 1 ? (
          <Breadcrumbs sx={{mb: 4}}>
            {breadcrumbData.map(item => item.url ? (
              <Breadcrumbs.Item key={item.url} href={withPrefix(item.url)} selected={path === item.url}>
                {item.title}
              </Breadcrumbs.Item>
            ): null).filter(item => item)}
          </Breadcrumbs>
        ) : null}
        <Heading as="h1" sx={{fontSize: 7}}>{title}</Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}
        <Box>
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
          </Box>
          <Box sx={{minWidth: 0, flexGrow: 1}}>
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
              {source ? (
                <Box sx={{mb: 5}}>
                  <Link href={source} target="_blank">
                    <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                      <MarkGithubIcon />
                      <Text>Source</Text>
                    </Box>
                  </Link>
                </Box>
              ) : null}
              {children}
            </Box>
          </Box>
        </Box>
        <PageFooter editUrl={pageContext.editUrl} contributors={pageContext.contributors} />
      </Box>

    </BaseLayout>
  )
}

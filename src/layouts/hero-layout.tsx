import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import {Box, Heading} from '@primer/react'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import navItems from '@primer/gatsby-theme-doctocat/src/nav.yml'
import heroIllustration from '~/content/images/hero-illustration.svg'

type NavItemData = {
  title: string,
  url?: string,
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
      <Box sx={{backgroundColor: "#22272E", display: "flex", alignContent: "center", justifyContent: "center", flexFlow: "column", }}>
        <Box sx={{maxWidth: 1200, width: '100%', mx: 'auto', p: [4, 5, 6, 7]}}>
          <Heading as="h1" sx={{color: 'rgb(83, 155, 245)', fontSize: 7, m: 0}}>
            {title}
          </Heading>
          <img src={heroIllustration} alt="Primer Design System" width={"100%"} />
        </Box>
      </Box>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        {children}
        <PageFooter editUrl={pageContext.editUrl} contributors={pageContext.contributors} />
      </Box>

    </BaseLayout>
  )
}

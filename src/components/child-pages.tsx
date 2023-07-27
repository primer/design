import React from 'react'
import navItems from '@primer/gatsby-theme-doctocat/src/nav.yml'
import {Box, Heading, Link, Text} from '@primer/react'
import {graphql, Link as GatsbyLink, useStaticQuery} from 'gatsby'

type NavItems = Array<
  | NavItem
  | {
      title: string
      children: Array<
        | NavItem
        // Max depth is 2
        | {
            title: string
            children: Array<NavItem>
          }
      >
    }
>

type NavItem = {
  title: string
  url: string
}

export function ChildPages({of: title}: {of: string}) {
  const childItems = getChildItems(navItems, title)
  const data = useStaticQuery(graphql`
    query MyQuery {
      allSitePage {
        nodes {
          path
          context {
            frontmatter {
              description
            }
          }
        }
      }
    }
  `)

  const descriptionsByPath = data.allSitePage.nodes.reduce((acc, node) => {
    acc[node.path] = node.context.frontmatter?.description || ''
    return acc
  }, {})

  return (
    <Box sx={{display: 'grid', gap: 5}}>
      {childItems.map(item => (
        <Box key={item.url} sx={{display: 'grid', gap: 1}}>
          <Heading as="h3" sx={{fontSize: 3}}>
            <Link as={GatsbyLink} to={item.url}>
              {item.title}
            </Link>
          </Heading>
          <Text as="p" sx={{m: 0, maxWidth: '80ch', fontSize: 2, color: 'fg.subtle'}}>
            {descriptionsByPath[item.url]}
          </Text>
        </Box>
      ))}
    </Box>
  )
}

function getChildItems(navItems: NavItems, title: string): NavItem[] {
  const flatNavItems = navItems.flatMap(item => {
    if ('children' in item) {
      return [item, ...item.children]
    }
    return item
  })

  const item = flatNavItems.find(item => item.title === title)

  if (item && 'children' in item) {
    return item.children.filter(item => 'url' in item) as NavItem[]
  }

  return []
}

import React from 'react'
import navItems from '@primer/gatsby-theme-doctocat/src/nav.yml'
import {Box, Heading, Link, Text} from '@primer/react'
import {graphql, Link as GatsbyLink, useStaticQuery} from 'gatsby'
import ReactMarkdown from 'react-markdown'

type NavItem = {
  title: string
  url: string
  children?: NavItems
}

type NavItems = Array<NavItem>

export function ChildPages({path}: {path: string}) {
  const childItems = getChildItems(navItems, path)
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
            <ReactMarkdown>
              {descriptionsByPath[item.url]}
            </ReactMarkdown>
          </Text>
        </Box>
      ))}
    </Box>
  )
}

function getParentItem(navItems: NavItems, path: string): NavItem | null {
  const segments = path.split("/")
  let curItem: NavItem = { title: "", url: "", children: navItems }

  for (const segment of segments) {
    if (curItem.children) {
      for (const navItem of curItem.children) {
        if (navItem.title === segment) {
          curItem = navItem;
        }
      }
    } else {
      return null
    }
  }

  return curItem
}

function getChildItems(navItems: NavItems, path: string): NavItem[] {
  const parentNavItem = getParentItem(navItems, path)

  if (parentNavItem && parentNavItem.children) {
    return parentNavItem.children.sort((a, b) => a.title.localeCompare(b.title))
  }

  return []
}

import {Box, Link, Text} from '@primer/react'
import {useStaticQuery, graphql} from 'gatsby'
import React from 'react'

export default function FigmaComponentList() {
  const {
    allMdx: {edges: components}
  } = useStaticQuery(graphql`
    query {
      allMdx(
        filter: {fileAbsolutePath: {glob: "**/content/guides/figma/components/*"}, frontmatter: {draft: {ne: true}}}
        sort: {fields: frontmatter___title}
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            slug
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `)

  return (
    <Box>
      {components.map(component => {
        return (
          <Box key={component.node.slug}>
            <Link sx={{fontWeight: 'bold'}} href={`/${component.node.slug}`}>
              {component.node.frontmatter.title}
            </Link>
            <Text as="p" sx={{marginTop: '0'}}>
              {component.node.frontmatter.description}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}

import {H2} from '@primer/gatsby-theme-doctocat/src/components/heading'
import {SearchIcon} from '@primer/octicons-react'
import {Box, Link, TextInput} from '@primer/react'
import {graphql, Link as GatsbyLink, useStaticQuery} from 'gatsby'
import React from 'react'
import Icon from './icon'
import useSearch from './use-search'

export default function Icons() {
  const data = useStaticQuery(graphql`
    query {
      allOcticon {
        nodes {
          name
          keywords
          width
          height
          svgPath
        }
      }
    }
  `)

  const [query, setQuery] = React.useState('')

  const results = useSearch(data.allOcticon.nodes, query, {keys: ['name', 'keywords']})

  // group icons by height property
  const iconsByHeight = React.useMemo(
    () =>
      results.reduce((acc, cur) => {
        // create height array if it doesn't exist
        if (!acc[cur.height]) acc[cur.height] = []
        // add current icon to height array
        acc[cur.height].push(cur)

        return acc
      }, {}),
    [results],
  )

  return (
    <Box display="grid" gridGap={5}>
      <TextInput
        leadingVisual={SearchIcon}
        aria-label="Search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Search icons..."
        width="100%"
      />
      {Object.entries(iconsByHeight).length > 0
        ? Object.entries(iconsByHeight).map(([height, icons]) => (
            <Box key={height}>
              <H2>
                {height}
                px
              </H2>
              <Box display="flex" flexWrap="wrap" mx={-3}>
                {icons.map(icon => (
                  <Link
                    as={GatsbyLink}
                    key={`${icon.name}-${icon.height}`}
                    sx={{
                      display: 'block',
                      padding: 3,
                      color: 'inherit',
                    }}
                    to={`${icon.name}-${icon.height}`}
                  >
                    <Box display="flex">
                      <Icon width={icon.width} height={icon.height} path={icon.svgPath} />
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          ))
        : 'No results found'}
    </Box>
  )
}

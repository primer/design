import {Box, Heading, Link, TextInput} from '@primer/react'
import {SearchIcon} from '@primer/octicons-react'
import {Link as GatsbyLink} from 'gatsby'
import React from 'react'
import icons from '@primer/octicons-react/build/data.json'
import useSearch from './use-search'
import Icon from './icon'

export default function Icons() {
  const [query, setQuery] = React.useState('')
  const iconsArray = React.useMemo(() => {
    return Object.values(icons).flatMap(icon => Object.entries(icon.heights).map(([height, value]) => ({
        name: icon.name,
        keywords: icon.keywords,
        width: value.width,
        height,
        path: value.path
      }))
    )
  }, [icons])
  const results = useSearch(iconsArray, query, {keys: ['name', 'keywords']})
  // group icons by height property
  const iconsByHeight = React.useMemo(() => results.reduce((acc, cur) => {
    // create height array if it doesn't exist
    if (!acc[cur.height]) acc[cur.height] = []
    // add current icon to height array
    acc[cur.height].push(cur)

    return acc
  }, {}), [results])

  return (
    <Box display={"grid"} gridGap={5}>
      <TextInput
        icon={SearchIcon}
        aria-label="Search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Search icons..."
        width="100%"
      />
      {Object.entries(iconsByHeight).length > 0
        ? Object.entries(iconsByHeight).map(([height, icons]) => (
            <Box key={height}>
              <Heading as="h2" fontSize={3} mb={3}>
                {height}
                px
              </Heading>
              <Box display={"flex"} flexWrap="wrap" mx={-3}>
                {icons.map(icon => (
                  <Link
                    as={GatsbyLink}
                    key={`${icon.name}-${icon.height}`}
                    sx={{
                      display: 'block',
                      padding: 3,
                      color: 'inherit'
                    }}
                    to={`${icon.name}-${icon.height}`}
                  >
                    <Box display={"flex"}>
                      <Icon width={icon.width} height={icon.height} path={icon.path} />
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

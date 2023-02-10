import {Box} from '@primer/react'
import React from 'react'
import navItems from '../nav.yml'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import NavItems from '@primer/gatsby-theme-doctocat/src/components/nav-items'

function usePersistentScroll(id) {
  const ref = React.useRef()

  const handleScroll = React.useCallback(
    // Save scroll position in session storage on every scroll change
    event => window.sessionStorage.setItem(id, event.target.scrollTop),
    [id],
  )

  React.useLayoutEffect(() => {
    // Restore scroll position when component mounts
    const scrollPosition = window.sessionStorage.getItem(id)
    if (scrollPosition && ref.current) {
      ref.current.scrollTop = scrollPosition
    }
  }, [id])

  // Return props to spread onto the scroll container
  return {
    ref,
    onScroll: handleScroll,
  }
}

function Sidebar() {
  const scrollContainerProps = usePersistentScroll('sidebar')

  return (
    <Box
      sx={{
        position: 'sticky',
        top: HEADER_HEIGHT,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        width: 260,
      }}
    >
      <Box
        {...scrollContainerProps}
        style={{overflow: 'auto'}}
        sx={{
          borderWidth: 0,
          borderRightWidth: 1,
          borderRadius: 0,
          height: '100%',
          borderStyle: 'solid',
          borderColor: 'border.subtle',
          px: 2,
        }}
      >
        <Box sx={{flexDirection: 'column', display: 'flex'}}>
          <NavItems items={navItems} />
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar

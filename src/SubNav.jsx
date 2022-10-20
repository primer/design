import {useLocation} from '@reach/router'
import React, {useState} from 'react'
import {UnderlineNav} from '@primer/react'

export function SubNav() {
  const {hash} = useLocation()
  return (
    <UnderlineNav
      aria-label="Page navigation"
      sx={{position: 'sticky', top: '66px', background: '#ffffff', borderBottom: 'none'}}
    >
      <UnderlineNav.Link href="#overview" selected={hash === '#overview'}>
        Overview
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#styles" selected={hash === '#styles'}>
        Styles
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#react" selected={hash === '#react'}>
        React
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#rails" selected={hash === '#rails'}>
        Rails
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#accessibility" selected={hash === '#accessibility'}>
        Accessibility
      </UnderlineNav.Link>
    </UnderlineNav>
  )
}

export default SubNav

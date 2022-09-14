import React, {useState} from 'react'
import {UnderlineNav} from '@primer/react'

export function SubNav() {
  return (
    <UnderlineNav
      aria-label="Page navigation"
      sx={{position: 'sticky', top: '66px', background: '#ffffff', borderBottom: 'none'}}
    >
      <UnderlineNav.Link href="#usage" selected={location.hash === '#usage'}>
        Usage
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#styles" selected={location.hash === '#styles'}>
        Styles
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#react" selected={location.hash === '#react'}>
        React
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#rails" selected={location.hash === '#rails'}>
        Rails
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#accessibility" selected={location.hash === '#accessibility'}>
        Accessibility
      </UnderlineNav.Link>
    </UnderlineNav>
  )
}

export default SubNav

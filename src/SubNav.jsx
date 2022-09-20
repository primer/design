import React, {useState} from 'react'
import {UnderlineNav} from '@primer/react'

export function SubNav() {
  // const {location} = this.props
  return (
    <UnderlineNav
      aria-label="Page navigation"
      sx={{position: 'sticky', top: '66px', background: '#ffffff', borderBottom: 'none'}}
    >
      <UnderlineNav.Link href="#usage" selected={window.location.hash === '#usage'}>
        Usage
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#styles" selected={window.location.hash === '#styles'}>
        Styles
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#react" selected={window.location.hash === '#react'}>
        React
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#rails" selected={window.location.hash === '#rails'}>
        Rails
      </UnderlineNav.Link>
      <UnderlineNav.Link href="#accessibility" selected={window.location.hash === '#accessibility'}>
        Accessibility
      </UnderlineNav.Link>
    </UnderlineNav>
  )
}

export default SubNav

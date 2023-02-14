import React from 'react'
import {UnderlineNav} from '@primer/react'
import {Link as GatsbyLink} from 'gatsby'
import {useLocation} from '@reach/router'

export function ComponentPageNav({
  basePath,
  includeReact,
  includeRails,
  includeFigma,
}: {
  basePath: string
  includeReact?: boolean
  includeRails?: boolean
  includeFigma?: boolean
}) {
  const location = useLocation()
  return (
    <UnderlineNav>
      <UnderlineNav.Link as={GatsbyLink} to={basePath} selected={location.pathname.endsWith(basePath)}>
        Overview
      </UnderlineNav.Link>
      {includeReact ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/react`} selected={location.pathname.endsWith('/react')}>
          React
        </UnderlineNav.Link>
      ) : null}
      {includeRails ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/rails`} selected={location.pathname.endsWith('/rails')}>
          Rails
        </UnderlineNav.Link>
      ) : null}
      {includeFigma ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/figma`} selected={location.pathname.endsWith('/figma')}>
          Figma
        </UnderlineNav.Link>
      ) : null}
    </UnderlineNav>
  )
}

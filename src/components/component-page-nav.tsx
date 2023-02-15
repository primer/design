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
  // Remove trailing slash
  const path = location.pathname.replace(/\/$/, '')
  return (
    <UnderlineNav>
      <UnderlineNav.Link as={GatsbyLink} to={basePath} selected={path.endsWith(basePath)}>
        Overview
      </UnderlineNav.Link>
      {includeReact ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/react`} selected={path.endsWith('/react')}>
          React
        </UnderlineNav.Link>
      ) : null}
      {includeRails ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/rails`} selected={path.endsWith('/rails')}>
          Rails
        </UnderlineNav.Link>
      ) : null}
      {includeFigma ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/figma`} selected={path.endsWith('/figma')}>
          Figma
        </UnderlineNav.Link>
      ) : null}
    </UnderlineNav>
  )
}

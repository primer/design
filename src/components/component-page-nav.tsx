import React from 'react'
import {UnderlineNav} from '@primer/react'
import {Link as GatsbyLink} from 'gatsby'

export function ComponentPageNav({
  basePath,
  includeReact,
  includeRails,
  includeFigma,
  current,
}: {
  basePath: string
  includeReact?: boolean
  includeRails?: boolean
  includeFigma?: boolean
  current?: 'overview' | 'react' | 'rails' | 'figma'
}) {
  return (
    <UnderlineNav>
      <UnderlineNav.Link as={GatsbyLink} to={basePath} selected={current === 'overview'}>
        Overview
      </UnderlineNav.Link>
      {includeReact ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/react`} selected={current === 'react'}>
          React
        </UnderlineNav.Link>
      ) : null}
      {includeRails ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/rails/latest`} selected={current === 'rails'}>
          Rails
        </UnderlineNav.Link>
      ) : null}
      {includeFigma ? (
        <UnderlineNav.Link as={GatsbyLink} to={`${basePath}/figma`} selected={current === 'figma'}>
          Figma
        </UnderlineNav.Link>
      ) : null}
    </UnderlineNav>
  )
}

import VisuallyHidden from '@primer/gatsby-theme-doctocat/src/components/visually-hidden'
import {LinkExternalIcon} from '@primer/octicons-react'
import {NavList} from '@primer/react/drafts'
import {useLocation} from '@reach/router'
import {Link as GatsbyLink, withPrefix} from 'gatsby'
import preval from 'preval.macro'
import React from 'react'

// This code needs to run at build-time so it can access the file system.
const repositoryUrl = preval`
  const readPkgUp = require('read-pkg-up')
  const getPkgRepo = require('get-pkg-repo')
  try {
    const repo = getPkgRepo(readPkgUp.sync().package)
    module.exports = \`https://github.com/\${repo.user}/\${repo.project}\`
  } catch (error) {
    module.exports = ''
  }
`

function NavItem({href, children}) {
  const location = useLocation()
  const hrefWithPrefix = withPrefix(href)
  let isCurrent = location.pathname === hrefWithPrefix

  // If the link is to a component page, we want to highlight the link
  // if any component subpages are active
  // (e.g. '/components/button', '/components/button/react', etc.)
  if (href?.startsWith('/components/')) {
    isCurrent =
      // Matches URLs like '/components/button'
      location.pathname === hrefWithPrefix ||
      // Matches URLs like '/components/button/react'
      location.pathname.startsWith(`${hrefWithPrefix}/`)
  }

  return (
    <NavList.Item as={GatsbyLink} to={href} aria-current={isCurrent ? 'page' : null}>
      {children}
    </NavList.Item>
  )
}

function NavItems({items}) {
  return (
    <>
      <VisuallyHidden>
        <h3 id="nav-heading">Site navigation</h3>
      </VisuallyHidden>
      <NavList aria-labelledby="nav-heading">
        {items.map(item => (
          <React.Fragment key={item.title}>
            {item.children ? (
              <NavList.Group title={item.title}>
                {item.children.map(child => (
                  <NavItem key={child.title} href={child.url}>
                    {child.title}
                    {child.children ? (
                      <NavList.SubNav>
                        {child.children.map(subChild => (
                          <NavItem key={subChild.title} href={subChild.url}>
                            {subChild.title}
                          </NavItem>
                        ))}
                      </NavList.SubNav>
                    ) : null}
                  </NavItem>
                ))}
              </NavList.Group>
            ) : (
              <NavItem href={item.url}>{item.title}</NavItem>
            )}
          </React.Fragment>
        ))}
        {repositoryUrl ? (
          <>
            <NavList.Divider />
            <NavList.Item href={repositoryUrl}>
              GitHub
              <NavList.TrailingVisual>
                <LinkExternalIcon />
              </NavList.TrailingVisual>
            </NavList.Item>
          </>
        ) : null}
      </NavList>
    </>
  )
}

export default NavItems

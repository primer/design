// import {LinkExternalIcon} from '@primer/octicons-react'
import {NavList, Box} from '@primer/react'
// import {useLocation} from '@reach/router'
// import {Link as GatsbyLink, withPrefix} from 'gatsby'
// import preval from 'preval.macro'
import React from 'react'

// This code needs to run at build-time so it can access the file system.
// const repositoryUrl = preval`
//   const readPkgUp = require('read-pkg-up')
//   const getPkgRepo = require('get-pkg-repo')
//   try {
//     const repo = getPkgRepo(readPkgUp.sync().package)
//     module.exports = \`https://github.com/\${repo.user}/\${repo.project}\`
//   } catch (error) {
//     module.exports = ''
//   }
// `

// function NavItem({href, children}) {
//   const location = useLocation()
//   const isCurrent = withPrefix(href) === location.pathname
//   return (
//     <NavList.Item as={GatsbyLink} to={href} aria-current={isCurrent ? 'page' : null}>
//       {children}
//     </NavList.Item>
//   )
// }

function NavItems({items}) {
  return (
    <NavList>
      {items.map(item => (
        <React.Fragment key={item.title}>
          {item.children ? (
            <Box as="ul" title={item.title}>
              {item.children.map(child => (
                <Box as="li" key={child.title} href={child.url}>
                  {child.title}
                  {child.children ? (
                    <Box as="ul">
                      {child.children.map(subChild => (
                        <Box as="li" key={subChild.title}>
                          {subChild.title}
                        </Box>
                      ))}
                    </Box>
                  ) : null}
                </Box>
              ))}
            </Box>
          ) : (
            <Box as="li">{item.title}</Box>
          )}
        </React.Fragment>
      ))}
    </NavList>
  )
  //   return (
  //     <NavList>
  //       {items.map(item => (
  //         <React.Fragment key={item.title}>
  //           {item.children ? (
  //             <NavList.Group title={item.title}>
  //               {item.children.map(child => (
  //                 <NavItem key={child.title} href={child.url}>
  //                   {child.title}
  //                   {child.children ? (
  //                     <NavList.SubNav>
  //                       {child.children.map(subChild => (
  //                         <NavItem key={subChild.title} href={subChild.url}>
  //                           {subChild.title}
  //                         </NavItem>
  //                       ))}
  //                     </NavList.SubNav>
  //                   ) : null}
  //                 </NavItem>
  //               ))}
  //             </NavList.Group>
  //           ) : (
  //             <NavItem href={item.url}>{item.title}</NavItem>
  //           )}
  //         </React.Fragment>
  //       ))}
  //        {repositoryUrl ? (
  //         <>
  //           <NavList.Divider />
  //           <NavList.Item href={repositoryUrl}>
  //             GitHub
  //             <NavList.TrailingVisual>
  //               <LinkExternalIcon />
  //             </NavList.TrailingVisual>
  //           </NavList.Item>
  //         </>
  //       ) : null}
  //     </NavList>
  //   )
}

export default NavItems

import React from 'react'
import {withRouter} from 'next/router'
import NextLink from 'next/link'
import {BorderBox, Box, Link, Flex, Relative} from '@primer/components'
import root from './nav'

export default withRouter(({router, ...rest}) => {
  const sections = getSectionsForPath(router.pathname, node => node.meta.nav === 'side')
  return (
    <Relative {...rest}>
      <BorderBox
        id="sidenav"
        width={['100%', '100%', 256, 256]}
        height="100%"
        bg="gray.0"
        borderLeft={0}
        borderBottom={0}
        borderRight={1}
        borderTop={[1, 1, 0, 0]}
        borderColor="gray.2"
        borderRadius={0}
      >
        {sections.map(node => (
          <Section key={node.path} node={node} />
        ))}
      </BorderBox>
    </Relative>
  )
})

function getSectionsForPath(path, check) {
  const node = root.first(node => node.path === path)
  if (check(node)) {
    return node.parent.children.filter(check)
  }
  // find the first ancestor (going "up" from this node) with *children* that
  // pass the check()
  const parent = node
    .getPath()
    .reverse()
    .find(ancestor => ancestor.children.some(check))
  return parent ? parent.children.filter(check) : []
}

function Section({node, ...rest}) {
  if (node.meta.hidden === true) {
    return null
  }
  const {path = '', name} = node
  const links = node.children.filter(child => !child.meta.hidden).map(child => (
    <PageLink key={child.path} href={child.path}>
      {child.name}
    </PageLink>
  ))
  return (
    <BorderBox px={5} py={3} border={0} borderBottom={1} borderColor="gray.2" borderRadius={0} bg={null} {...rest}>
      <Flex flexDirection="column" alignItems="start">
        <SectionLink href={path}>{name}</SectionLink>
        {links}
      </Flex>
    </BorderBox>
  )
}

const SectionLink = withRouter(({href, router, ...rest}) => (
  <Box my={3}>
    <NextLink href={href}>
      <Link href={href} color="gray.9" fontWeight={router.pathname.startsWith(href) ? 'bold' : null} {...rest} />
    </NextLink>
  </Box>
))

const PageLink = withRouter(({href, router, ...rest}) => (
  <Box mb={3}>
    <NextLink href={href}>
      <Link href={href} color={router.pathname === href ? 'gray.9' : 'blue.5'} fontSize={1} {...rest} />
    </NextLink>
  </Box>
))

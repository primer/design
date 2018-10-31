import React from 'react'
import {withRouter} from 'next/router'
import NextLink from 'next/link'
import {BorderBox, Box, Link, Flex, Relative} from '@primer/components'
import {getNavName, pageTree} from './nav'

// the root section is the one called "Guidelines"
const root = pageTree.find(child => {
  return getNavName(child.file) === 'Guidelines'
})

const sections = root.children

export default function SideNav(props) {
  return (
    <Relative {...props}>
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
}

function Section({node, ...rest}) {
  const {path, file, children} = node
  return (
    <BorderBox px={5} py={2} border={0} borderBottom={1} borderColor="gray.2" borderRadius={0} bg={null} {...rest}>
      <Flex flexDirection="column" alignItems="start">
        <SectionLink href={path}>{getNavName(file)}</SectionLink>
        {children.map(child => (
          <PageLink key={child.path} href={child.path}>
            {getNavName(child.file)}
          </PageLink>
        ))}
      </Flex>
    </BorderBox>
  )
}

const SectionLink = withRouter(({href, router, ...rest}) => (
  <Box my={3}>
    <NextLink href={href}>
      <Link href={href} color="gray.9" fontWeight={router.pathname === href ? 'bold' : null} {...rest} />
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

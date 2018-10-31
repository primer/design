import React from 'react'
import NextLink from 'next/link'
import {withRouter} from 'next/router'
import Octicon, {MarkGithub} from '@githubprimer/octicons-react'
import {Text, Flex, Link, Sticky, BorderBox, Box} from '@primer/components'
import BoxShadow from './BoxShadow'
import {getComponent, getNavName, pageTree, ROOT_URL} from './nav'

const links = pageTree.children.filter(({file}) => {
  const Component = getComponent(file)
  return Component && Component.meta && Component.meta.nav === 'top'
})

const Header = props => (
  <Sticky zIndex={100} {...props}>
    <BoxShadow py={3} bg="gray.9" color="white">
      <Flex px={[3, 6, 6, 3]} alignItems="center" justifyContent="space-between">
        <NextLink href={ROOT_URL}>
          <Link color="white" href={ROOT_URL} ml={3}>
            <Flex alignItems="center" justifyContent="center">
              <Octicon icon={MarkGithub} size="medium" />
              <Text ml={3}>Primer Design Guidelines</Text>
            </Flex>
          </Link>
        </NextLink>
        <Box display={['none', 'none', 'block']}>
          <Links />
        </Box>
        <Box display={['block', 'block', 'none']}>
          <Link href="#sidenav">
            <BorderBox
              bg="black"
              color="white"
              py="6px"
              px="12px"
              border={1}
              borderColor="gray.6"
              borderRadius={3}
              display="inline-block"
            >
              <Text fontWeight="bold" fontSize={1}>
                Menu
              </Text>
            </BorderBox>
          </Link>
        </Box>
      </Flex>
    </BoxShadow>
  </Sticky>
)

function Links(props) {
  return links.map(link => <PageLink key={link.path} link={link} {...props} />)
}

const PageLink = withRouter(({link, router}) => {
  const {path, file} = link
  const current = router.pathname === path
  return (
    <NextLink to={path}>
      <Link href={path} color="white" ml={4} fontWeight={current ? 'bold' : 'normal'}>
        {getNavName(file)}
      </Link>
    </NextLink>
  )
})

export default Header

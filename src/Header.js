import React from 'react'
import NextLink from 'next/link'
import {withRouter} from 'next/router'
import Octicon, {MarkGithub} from '@githubprimer/octicons-react'
import {Text, Flex, Link, Sticky, BorderBox, Box} from '@primer/components'
import BoxShadow from './BoxShadow'
import {ROOT_URL, SITE_TITLE} from './constants'
import root from './nav'

export default withRouter(({router, ...rest}) => {
  // XXX this has to run inside the component because the tree
  // won't have been "initialized"
  const links = root.all(node => node.meta.nav === 'top')
  // get all (both) links with a path matching the beginning of the current page,
  // then sort them by length *descending* to get the most specific one. we
  // have to do this because if "/design" and "/design/tools" are the paths,
  // they will both "match" for anything under "/design/tools/*"
  const current = links
    .filter(node => router.pathname.startsWith(node.path))
    .sort((a, b) => b.path.length - a.path.length)
    .shift()

  return (
    <Sticky zIndex={100} {...rest}>
      <BoxShadow py={3} bg="gray.9" color="white">
        <Flex px={[3, 6, 6, 3]} alignItems="center" justifyContent="space-between">
          <NextLink href={ROOT_URL}>
            <Link color="white" href={ROOT_URL} ml={3}>
              <Flex alignItems="center" justifyContent="center">
                <Octicon icon={MarkGithub} size="medium" />
                <Text ml={3}>{SITE_TITLE}</Text>
              </Flex>
            </Link>
          </NextLink>
          <Box display={['none', 'none', 'block']} mr={4}>
            {links.map(node => {
              const {path = '', name} = node
              return (
                <NextLink href={path} key={path}>
                  <Link href={path} color="white" ml={6} fontWeight={node === current ? 'bold' : 'normal'}>
                    {name}
                  </Link>
                </NextLink>
              )
            })}
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
})

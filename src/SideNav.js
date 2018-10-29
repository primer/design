import React from 'react'
import {withRouter} from 'next/router'
import {default as NextLink} from 'next/link'
import {Text, BorderBox, Box, Link, Flex, Relative} from '@primer/components'
import {pageMap} from './utils'

const getLink = router => {
  return Object.values(pageMap).map(({displayName: name}) => {
    const isSelected = router.pathname === `/components/docs/${name}`
    return (
      <Box mb={3} key={name}>
        <NextLink href={`/components/docs/${name}`}>
          <Link href={`/components/docs/${name}`} color={isSelected ? 'gray.9' : 'blue.5'} fontSize={1}>
            {name}
          </Link>
        </NextLink>
      </Box>
    )
  })
}

const isComponentLink = componentName => {
  return Object.values(pageMap)
    .map(n => n.displayName)
    .includes(componentName)
}

const Section = ({children, ...rest}) => (
  <BorderBox {...rest}>
    <Flex flexDirection="column" alignItems="start">
      {children}
    </Flex>
  </BorderBox>
)

Section.defaultProps = {
  p: 5,
  border: 0,
  borderBottom: 1,
  borderColor: 'gray.2',
  borderRadius: 0,
  bg: null
}

const SideNav = ({router}) => (
  <Relative>
    <BorderBox
      width={['100%', '100%', 256, 256]}
      height="100%"
      bg="gray.0"
      border={0}
      borderRight={1}
      borderTop={[1, 1, 0, 0]}
      borderColor="gray.2"
      borderRadius={0}
      id="sidenav"
    >
      <Section>
        <NextLink href="/components/docs/system-props">
          <Link
            color="gray.9"
            href="/components/docs/system-props"
            m={0}
            mb={4}
            fontWeight={router.pathname === '/components/docs/system-props' ? 'bold' : null}
          >
            System Props
          </Link>
        </NextLink>
        <NextLink href="/components/docs/primer-theme">
          <Link
            color="gray.9"
            href="/components/docs/primer-theme"
            m={0}
            fontWeight={router.pathname === '/components/docs/primer-theme' ? 'bold' : null}
          >
            Primer Theme
          </Link>
        </NextLink>
      </Section>
      <Box pt={5} pl={5}>
        <Text is="p" color="black" m={0} mb={3}>
          <NextLink href="/components/docs/Avatar">
            <Link
              color="gray.9"
              href="/components/docs/Avatar"
              fontWeight={isComponentLink(router.pathname.replace('/components/docs/', '')) ? 'bold' : null}
            >
              Components
            </Link>
          </NextLink>
        </Text>
        {getLink(router)}
      </Box>
    </BorderBox>
  </Relative>
)

export default withRouter(SideNav)

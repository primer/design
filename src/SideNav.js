import React from 'react'
import {withRouter} from 'next/router'
import {default as NextLink} from 'next/link'
import {BorderBox, Box, Link, Flex, Relative} from '@primer/components'
import {pageMap} from './utils'

const Section = ({children, ...rest}) => (
  <BorderBox {...rest}>
    <Flex flexDirection="column" alignItems="start">
      {children}
    </Flex>
  </BorderBox>
)

Section.defaultProps = {
  p: 5,
  pb: 2,
  border: 0,
  borderBottom: 1,
  borderColor: 'gray.2',
  borderRadius: 0,
  bg: null
}

const SideNav = props => (
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
      <Section>
        <SectionLink href="/components/docs/system-props">System Props</SectionLink>
        <SectionLink href="/components/docs/primer-theme">Primer Theme</SectionLink>
      </Section>
      <Section>
        <SectionLink href="/components/docs/Avatar">Components</SectionLink>
        {[...Object.entries(pageMap)].map(([path, file]) => (
          <SideLink href={path} key={path}>
            {file}
          </SideLink>
        ))}
      </Section>
    </BorderBox>
  </Relative>
)

const SectionLink = withRouter(({href, router, ...rest}) => (
  <Box mb={3}>
    <NextLink href={href}>
      <Link href={href} color="gray.9" fontWeight={router.pathname === href ? 'bold' : null} {...rest} />
    </NextLink>
  </Box>
))

const SideLink = withRouter(({href, router, ...rest}) => (
  <Box mb={3}>
    <NextLink href={href}>
      <Link href={href} color={router.pathname === href ? 'gray.9' : 'blue.5'} fontSize={1} {...rest} />
    </NextLink>
  </Box>
))

export default SideNav

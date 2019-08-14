import loadable from '@loadable/component'
import {Box, Heading} from '@primer/components'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'
import heroIllustration from '../../../hero-illustration.svg'

const HeroAnimation = loadable(() => import('../../../hero-animation'), {
  fallback: (
    <img src={heroIllustration} alt="Interface Guidelines hero" width="100%" />
  ),
})

export default function Hero() {
  return (
    <Box bg="black" p={5}>
      <Container>
        <Heading color="blue.4" fontSize={7} pb={3} m={0}>
          Interface Guidelines
        </Heading>
        <HeroAnimation />
      </Container>
    </Box>
  )
}

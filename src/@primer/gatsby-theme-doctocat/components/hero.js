import loadable from '@loadable/component'
import {Box, Heading} from '@primer/components'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'
import heroIllustration from '../../../hero-illustration.svg'

const HeroAnimation = loadable(() => import('../../../hero-animation'), {
  fallback: <img src={heroIllustration} alt="Interface Guidelines hero" width="100%" />,
})

export default function Hero() {
  return (
    <Box bg="black" py={6}>
      <Container>
        <Heading color="blue.4" fontSize={7} lineHeight="condensed" pb={3} m={0}>
          Interface guidelines
        </Heading>
        <HeroAnimation />
      </Container>
    </Box>
  )
}

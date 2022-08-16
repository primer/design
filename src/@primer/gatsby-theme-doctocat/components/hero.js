import {Box, Heading, ThemeProvider} from '@primer/react'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'
import heroIllustration from '../../../hero-illustration.svg'

export default function Hero() {
  return (
    <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
      <Box bg="canvas.default" py={6}>
        <Container>
          <Heading sx={{color: 'accent.fg', fontSize: 7, lineHeight: 'condensed', pb: 3, m: 0}}>
            Interface guidelines
          </Heading>
          <img src={heroIllustration} alt="Interface Guidelines hero" width="100%" />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

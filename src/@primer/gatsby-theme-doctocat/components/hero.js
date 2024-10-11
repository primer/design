import {Text, Box, Heading, ThemeProvider} from '@primer/react'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'

export default function Hero() {
  return (
    <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
      <Box py={6}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              gap: '64px',
              align: 'center',
              img: {
                display: 'none',
                '@media screen and (min-width: 768px)': {display: 'block'},
              },
            }}
          >
            <div>
              <Heading sx={{fontSize: 7, lineHeight: 'condensed', pb: 3, m: 0}}>Primer Design System</Heading>
              <Text as="p" sx={{m: 0, fontSize: 3}}>
                Primer is a set of guidelines, principles, and patterns for designing and building UI at GitHub. It
                provides a shared language and standardized approach to delivering cohesive experiences.
              </Text>
            </div>
            <img
              role="presentation"
              alt="Mona illustration"
              width="150"
              height="150"
              src="https://github.com/user-attachments/assets/c8ad1ae3-262f-4ede-b0ec-9f1500ad30b1"
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

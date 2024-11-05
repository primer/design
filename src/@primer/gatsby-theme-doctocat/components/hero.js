import {Text, Box, Heading, ThemeProvider} from '@primer/react'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'

export default function Hero() {
  return (
    <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
      <Box pt={3}>
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
              <Heading sx={{fontSize: 7, lineHeight: 'condensed', pb: 3, mt: 5}}>Primer Design System</Heading>
              <Text as="p" sx={{m: 0, fontSize: 3, pb: 0}}>
                Primer is a set of guidelines, principles, and patterns for designing and building UI at GitHub.
              </Text>
            </div>
            <img
              role="presentation"
              alt="Mona illustration"
              width="250"
              height="202"
              src="https://github.com/user-attachments/assets/3a52cf63-82b6-4c46-98db-da3d70e4a115"
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

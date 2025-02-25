import {Text, Box, Heading, ThemeProvider, Link} from '@primer/react'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'

export default function Hero() {
  return (
    <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
      <Box pt={3}>
        <Container>
          {/* Temporary banner before site is decomissioned, it is intended to mirror the Note component that shows up on component pages  */}
          <Box
            sx={{
              backgroundColor: '#ddf4ff', //bgColor-accent-muted
              borderColor: '#54aeff66', //borderColor-accent-muted
              borderLeftWidth: '6px',
              borderLeftStyle: 'solid',
              borderStyle: 'solid',
              borderRightWidth: '0',
              borderTopWidth: '0',
              borderBottomWidth: 0,
              padding: 3,
              borderRadius: 2,
              marginBottom: 3,
            }}
          >
            <Text sx={{display: 'block'}}>
              🎉 👀 New look, same Primer!{' '}
              <Link
                href="https://primer-docs-preview.github.com"
                target="_blank"
                sx={{
                  color: '#0969da !important',
                }}
              >
                Preview the new docs experience here
              </Link>{' '}
              and let us know what you think.
            </Text>
          </Box>
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

import {Box, Text, Link} from '@primer/react'
import React from 'react'
import Head from '@primer/gatsby-theme-doctocat/src/components/head'
import Header from '@primer/gatsby-theme-doctocat/src/components/header'
import Sidebar from '@primer/gatsby-theme-doctocat/src/components/sidebar'
import {Note} from '@primer/gatsby-theme-doctocat'
import {LinkExternalIcon} from '@primer/octicons-react'

export function BaseLayout({title, description, children, showSidebar = true}) {
  return (
    <Box sx={{flexDirection: 'column', minHeight: '100vh', display: 'flex'}}>
      <Head title={title} description={description} />
      <Header />
      <Box sx={{zIndex: 0, flex: '1 1 auto', flexDirection: 'row', display: 'flex'}}>
        {showSidebar ? (
          <Box sx={{display: ['none', null, null, 'block']}}>
            <Sidebar />
          </Box>
        ) : null}
        <Box as="main" sx={{minWidth: 0, width: '100%'}} id="skip-nav">
          <Box sx={{maxWidth: 1200, width: '100%', pt: [4, 5, 6, 7], px: [4, 5, 6, 7], pb: 0, mx: 'auto'}}>
            <Note>
              <Text sx={{display: 'block'}}>
                🎉 👀 New look, same Primer!{' '}
                <Link href="https://primer-docs-preview.github.com" target="_blank">
                  Preview the new docs experience here
                </Link>{' '}
                and let us know what you think.
              </Text>
            </Note>
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

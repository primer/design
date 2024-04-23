import {Box} from '@primer/react'
import React from 'react'
import Head from '@primer/gatsby-theme-doctocat/src/components/head'
import Header from '@primer/gatsby-theme-doctocat/src/components/header'
import Sidebar from '@primer/gatsby-theme-doctocat/src/components/sidebar'
import TrackingHeader from './TrackingHeader'

export function BaseLayout({title, description, children, showSidebar = true}) {
  return (
    <Box sx={{flexDirection: 'column', minHeight: '100vh', display: 'flex'}}>
      <Head title={title} description={description} />
      <TrackingHeader />
      <Header />
      <Box sx={{zIndex: 0, flex: '1 1 auto', flexDirection: 'row', display: 'flex'}}>
        {showSidebar ? (
          <Box sx={{display: ['none', null, null, 'block']}}>
            <Sidebar />
          </Box>
        ) : null}
        <Box as="main" sx={{minWidth: 0, width: '100%'}} id="skip-nav">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

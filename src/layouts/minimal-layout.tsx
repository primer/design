import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {Box, Heading, Text} from '@primer/react'
import React from 'react'
import {BaseLayout} from '../components/base-layout'

export default function MinimalLayout({pageContext, children, path}) {
  const {title, description} = pageContext.frontmatter

  return (
    <BaseLayout showSidebar={false} title={title} description={description}>
      <Box sx={{maxWidth: 960, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        <Heading as="h1">{title}</Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}
        <Box sx={{minWidth: 0, flexGrow: 1}}>
          <Box
            sx={{
              '& > :first-child': {
                mt: 0,
              },
              '& > :last-child': {
                mb: 0,
              },
            }}
          >
            {children}
          </Box>
        </Box>
        <PageFooter editUrl={pageContext.editUrl} contributors={pageContext.contributors} />
      </Box>
    </BaseLayout>
  )
}

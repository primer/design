import React from 'react'
import {Box, Heading, Text} from '@primer/react'
import PageFooter from '@primer/gatsby-theme-doctocat/src/components/page-footer'
import {BaseLayout} from '../components/base-layout'

// TODO: render the background graphic at the top of the page once we have the assets

export default function IndexLayout(props) {
  const {pageContext, children} = props
  const {title, description} = pageContext.frontmatter

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        <Box sx={{display: "flex", flexDirection: 'column', gap: 2, mb: 7}}>
          {/* TODO: update `fontSize` to `8` once we can upgrade to the latest version of PRC, which supports that fontSize value */}
          <Heading as="h1" sx={{fontSize: 48}}>{title}</Heading>
          {description ? (
            <Text as="p" sx={{fontSize: 4, m: 0, mb: 3, maxWidth: '60ch'}}>
              {description}
            </Text>
          ) : null}
        </Box>
        {children}
        <PageFooter editUrl={pageContext.editUrl} contributors={pageContext.contributors} />
      </Box>
    </BaseLayout>
  )
}

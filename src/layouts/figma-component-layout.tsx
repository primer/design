import {Note} from '@primer/gatsby-theme-doctocat'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {LinkIcon} from '@primer/octicons-react'
import {Box, Heading, Link, Text, UnderlineNav} from '@primer/react'
import {graphql, Link as GatsbyLink} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'

export const query = graphql`
  query FigmaComponentPageQuery($parentPath: String!) {
    sitePage(path: {eq: $parentPath}) {
      path
      context {
        frontmatter {
          title
          description
          reactId
          figmaUrl: figma
          railsUrl: rails
        }
      }
    }
  }
`

export default function FigmaComponentLayout({data}) {
  const title = data.sitePage?.context.frontmatter.title || name
  const description = data.sitePage?.context.frontmatter.description || ''

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7]}}>
        <Heading as="h1">{title}</Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}

        {data.sitePage ? (
          <UnderlineNav sx={{mb: 4}}>
            <UnderlineNav.Link as={GatsbyLink} to={data.sitePage.path}>
              Overview
            </UnderlineNav.Link>
            {data.sitePage.context.frontmatter.reactId ? (
              <UnderlineNav.Link as={GatsbyLink} to={`${data.sitePage.path}/react`}>
                React
              </UnderlineNav.Link>
            ) : null}
            {data.sitePage.context.frontmatter.railsUrl ? (
              <UnderlineNav.Link
                href={data.sitePage.context.frontmatter.railsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rails
              </UnderlineNav.Link>
            ) : null}
            <UnderlineNav.Link to={`${data.sitePage.path}/figma`} selected>
              Figma
            </UnderlineNav.Link>
          </UnderlineNav>
        ) : null}
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: 4}}>
          <Box>
            {/* @ts-ignore */}
            <Note variant="warning">
              We are currently transferring the Figma documentation for {title} from a different site to this page. To
              view the original documentation with code examples, please visit the{' '}
              <Link href={data.sitePage.context.frontmatter.figmaUrl}>Figma documentation for {title}</Link>.
            </Note>

            <Link
              sx={{display: 'inline-flex', gap: 1, alignItems: 'center'}}
              href={data.sitePage.context.frontmatter.figmaUrl}
            >
              <LinkIcon />
              {title}
            </Link>
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

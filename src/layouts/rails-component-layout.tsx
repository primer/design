import {Note} from '@primer/gatsby-theme-doctocat'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Box, Heading, Link, Text} from '@primer/react'
import {pascalCase} from 'change-case'
import {graphql} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'

export const query = graphql`
  query RailsComponentPageQuery($parentPath: String!) {
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

export default function RailsComponentLayout({data}) {
  const title = data.sitePage?.context.frontmatter.title
  const description = data.sitePage?.context.frontmatter.description
  const componentName = pascalCase(title)

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        <Heading as="h1">{title}</Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}
        <Box sx={{mb: 4}}>
          <ComponentPageNav
            basePath={data.sitePage.path}
            includeReact={data.sitePage.context.frontmatter.reactId}
            includeRails={data.sitePage.context.frontmatter.railsUrl}
            includeFigma={data.sitePage.context.frontmatter.figmaUrl}
            current="rails"
          />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: 4}}>
          <Box>
            {/* @ts-ignore */}
            <Note variant="warning">
              <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Work in progress</Text>
              We are currently transferring the Rails documentation for {componentName} from a different site to this
              page. To view the original documentation, please visit the{' '}
              <Link href={data.sitePage.context.frontmatter.railsUrl}>
                Primer ViewComponents documentation for {componentName}
              </Link>
              .
            </Note>

            <Link
              sx={{display: 'inline-flex', gap: 1, alignItems: 'center'}}
              href={data.sitePage.context.frontmatter.railsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {componentName}
              <LinkExternalIcon />
            </Link>
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

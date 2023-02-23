import {Note} from '@primer/gatsby-theme-doctocat'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Box, Heading, Link, Text} from '@primer/react'
import {graphql} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import { ComponentPageNav } from '../components/component-page-nav'
import {Overview, PropertyOverview, PropertyPreview, Examples} from '../components/FigmaPrimerWeb'

export const query = graphql`
  query FigmaComponentPageQuery($parentPath: String!) {
    sitePage(path: {eq: $parentPath}) {
      path
      context {
        frontmatter {
          title
          description
          reactId
          figmaId
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
  const figmaComponentName = data.sitePage?.context.frontmatter.figmaId

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7]}}>
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
            current="figma"
          />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: 4}}>
          <Box>
            {/* @ts-ignore */}
            <Note variant="warning">
              <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Work in progress</Text>
              We are currently transferring the Figma documentation for {title} from a different site to this page. To
              view the original documentation, please visit the{' '}
              <Link href={data.sitePage.context.frontmatter.figmaUrl}>Figma documentation for {title}</Link>.
            </Note>

            <Overview component={figmaComponentName} />
            
            <h2>Playground</h2>
            <Examples component={figmaComponentName} />

            <h2>Properties</h2>
            <PropertyOverview component={figmaComponentName} />

            <Link
              sx={{display: 'inline-flex', gap: 1, alignItems: 'center'}}
              href={data.sitePage.context.frontmatter.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
              <LinkExternalIcon />
            </Link>
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

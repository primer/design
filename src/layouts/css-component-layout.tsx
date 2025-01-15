import SourceLink from '@primer/gatsby-theme-doctocat/src/components/source-link'
import StorybookLink from '@primer/gatsby-theme-doctocat/src/components/storybook-link'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import {Note} from '@primer/gatsby-theme-doctocat'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import {graphql, Link as GatsbyLink} from 'gatsby'
import React from 'react'
import {StorybookEmbed} from '../components/storybook-embed'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'

export const query = graphql`
  query CssComponentPageQuery($parentPath: String!) {
    sitePage(path: {eq: $parentPath}) {
      id
      path
      context {
        frontmatter {
          title
          description
          reactId
          railsIds
          figmaId
          cssId
        }
      }
    }
  }
`

export default function CssComponentLayout({data}) {
  const name = data.sitePage?.context.frontmatter.cssId || ''
  const title = data.sitePage?.context.frontmatter.title || name
  const description = data.sitePage?.context.frontmatter.description || ''
  const stories = [{id: `deprecated-${name}--default`}]

  const baseUrl = (() => {
    const slugMatch = data.sitePage.id.match(/\/components\/(\w+)\//)

    if (slugMatch) {
      return `/components/${slugMatch[1]}`
    }

    return data.sitePage.path;
  })()

  return (
    <BaseLayout title={title} description={description}>
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        <Heading as="h1" sx={{fontSize: 7}}>{title}</Heading>
        {description ? (
          <Text as="p" sx={{fontSize: 3, m: 0, mb: 3, maxWidth: '60ch'}}>
            {description}
          </Text>
        ) : null}
        <Box sx={{mb: 4}}>
          <ComponentPageNav
            basePath={baseUrl}
            includeReact={data.sitePage.context.frontmatter.reactId}
            includeRails={data.sitePage.context.frontmatter.railsIds}
            includeFigma={data.sitePage.context.frontmatter.figmaId}
            includeCSS={data.sitePage.context.frontmatter.cssId}
            current="css"
          />
        </Box>
        <Note variant="warning">
          <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Primer CSS is no longer actively maintained</Text>
          <Text>The <Link as={GatsbyLink} to="https://github.com/primer/css">CSS library</Link> is still available, but these components will not receive new features or major changes moving forward. We encourage you to use Primer React or View Components wherever possible.</Text>
        </Note>
        <Box sx={{display: 'flex', mt: 4, alignItems: 'start', gap: [null, 7, 8, 9]}}>
          <Box sx={{width: '100%'}}>
            {/* @ts-ignore */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', null, null, null, 'row'],
                justifyContent: 'space-between',
                gap: 3,
                mb: 4,
              }}
            >
              <Box
                as={'ul'}
                sx={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'center',
                  m: 0,
                  p: 0,
                  paddingInline: 0,
                  listStyle: 'none',
                  fontSize: 1,
                  '& > li': {
                    display: 'flex',
                  },
                }}
              >
                <SourceLink href={`https://github.com/primer/css/blob/main/src/${name}`} />
                {stories.length > 0 ? (
                  <StorybookLink href={`https://primer.style/css/storybook/?path=/story/${stories[0].id}`} />
                ) : null}
              </Box>
            </Box>

            <H2>Examples</H2>
            {stories.length > 0 ? (
              <StorybookEmbed framework="css" height={300} stories={stories} />
            ) : (
              // If there are no stories, link to the component's page in the Primer CSS Storybook
              <Link
                sx={{display: 'inline-flex', gap: 1, alignItems: 'center'}}
                href={`https://primer.style/css/${name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{name} examples</span>
                <LinkExternalIcon />
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

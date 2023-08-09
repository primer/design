import SourceLink from '@primer/gatsby-theme-doctocat/src/components/source-link'
import StorybookLink from '@primer/gatsby-theme-doctocat/src/components/storybook-link'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import {graphql} from 'gatsby'
import React from 'react'
import {StorybookEmbed} from '../components/storybook-embed'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'

export const query = graphql`
  query CssComponentPageQuery($parentPath: String!) {
    sitePage(path: {eq: $parentPath}) {
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
  console.log(data.sitePage)
  const name = data.sitePage?.context.frontmatter.cssId || ''
  const title = data.sitePage?.context.frontmatter.title || name
  const description = data.sitePage?.context.frontmatter.description || ''
  const stories = [{id: `deprecated-${name}--docs`}]

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
            basePath={data.sitePage.path}
            includeReact={data.sitePage.context.frontmatter.reactId}
            includeRails={data.sitePage.context.frontmatter.railsIds}
            includeFigma={data.sitePage.context.frontmatter.figmaId}
            includeCSS={data.sitePage.context.frontmatter.cssId}
            current="css"
          />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: [null, 7, 8, 9]}}>
          <Box
            sx={{
              width: 220,
              flex: '0 0 auto',
              position: 'sticky',
              top: HEADER_HEIGHT + 24,
              maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - 24px)`,
              display: ['none', null, 'block'],
            }}
          >
          </Box>
          <Box sx={{minWidth: 0}}>
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
            {/* Narrow table of contents */}
            <Box
              sx={{
                display: ['block', null, 'none'],
                mb: 5,
                borderColor: 'border.muted',
                bg: 'canvas.subtle',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: 2,
              }}
            >
            </Box>

            <H2>Examples</H2>
            {stories.length > 0 ? (
              <StorybookEmbed framework="css" height={300} stories={stories} />
            ) : (
              // If there are no stories, link to the component's page in the Primer React docs
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

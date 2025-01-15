import {Note} from '@primer/gatsby-theme-doctocat'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import FigmaLink from '@primer/gatsby-theme-doctocat/src/components/figma-link'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import {graphql} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import FigmaPropertyTable from '../components/figma-property-table'
import FigmaComponentPlayground from '../components/figma-component-playground'
import FigmaPropertyPreview from '../components/figma-property-preview'

export const query = graphql`
  query FigmaComponentPageQuery($figmaId: String!, $parentPath: String!) {
    sitePage(path: {eq: $parentPath}) {
      id
      path
      context {
        frontmatter {
          title
          description
          reactId
          figmaId
          railsIds
          cssId
        }
      }
    }
    figmaFile {
      fileUrl
    }
    figmaComponent(figmaId: {eq: $figmaId}, status: {ne: "DEPRECATED"}) {
      name
      figmaId
      updatedAt
      componentUrl: url
      thumbnails {
        props {
          name
          value
        }
        url
      }
      properties {
        name
        type
        values
        defaultValue
      }
    }
  }
`

const lastUpdated = date => {
  return `Updated ${new Date(date).toLocaleDateString('en-GB', {year: 'numeric', month: 'short', day: 'numeric'})}`
}

export default function FigmaComponentLayout({data}) {
  const {name, componentUrl, updatedAt, properties, thumbnails} = data.figmaComponent || {}
  const description = data.sitePage?.context.frontmatter.description || ''
  const title = data.sitePage?.context.frontmatter.title || name

  const tableOfContents = {
    items: [
      {url: '#playground', title: 'Playground'},
      {url: '#props', title: 'Props'},
    ],
  }

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
            current="figma"
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
            <Heading as="h3" sx={{fontSize: 1, display: 'inline-block', fontWeight: 'bold', pl: 3}} id="toc-heading">
              On this page
            </Heading>
            <TableOfContents aria-labelledby="toc-heading" items={tableOfContents.items} />
          </Box>
          <Box sx={{minWidth: 0, width: '100%'}}>
            {!name || thumbnails.length === 0 ? (
              // No component found in json
              // @ts-ignore
              <Note variant="warning">
                <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Work in progress</Text>
                We are currently transferring the documentation for {title} to this page. To view the original
                documentation, please visit the <Link href={data.figmaFile.fileUrl}>Figma library</Link>.
              </Note>
            ) : (
              // Component found in json
              <>
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
                      flexWrap: 'wrap',
                      gap: 2,
                      alignItems: 'center',
                      m: 0,
                      p: 0,
                      paddingInline: 0,
                      listStyle: 'none',
                      '& > li': {
                        display: 'flex',
                      },
                    }}
                  >
                    <li>
                      <Label size="large">{lastUpdated(updatedAt)}</Label>
                    </li>
                  </Box>
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
                    <FigmaLink href={componentUrl} />
                  </Box>
                </Box>

                <H2>Playground</H2>

                <FigmaComponentPlayground thumbnails={thumbnails} properties={properties} />

                <H2>Props</H2>
                <FigmaPropertyTable properties={properties} />

                {properties.map((prop, index) => (
                  <div key={index}>
                    <H3>{prop.name}</H3>
                    <FigmaPropertyPreview thumbnails={thumbnails} property={prop.name} />
                  </div>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

import {Note, StatusLabel} from '@primer/gatsby-theme-doctocat'
import { LinkExternalIcon } from '@primer/octicons-react'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import { Box, Heading, Label, Link, StyledOcticon, Text } from '@primer/react'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import {graphql} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import { ComponentPageNav } from '../components/component-page-nav'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {LinkIcon} from '@primer/octicons-react'
import FigmaPropertyTable from '../components/FigmaPropertyTable'
import FigmaComponentPlayground from '../components/FigmaComponentPlayground'
import FigmaPropertyPreview from '../components/FigmaPropertyPreview'

export const query = graphql`
  query FigmaComponentPageQuery($figmaId: String!, $parentPath: String!) {
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
    figmaFile {
      fileUrl
    }
    figmaComponent(figmaId: {eq: $figmaId}) {
      name
      figmaId
      status
      updatedAt
      componentUrl: url
      thumbnails {
        nodeId
        url
        props
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

const sentenceCase = (str) => {
  return str?.toLowerCase().replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
}

const lastUpdated = (date) => { 
  return `updated ${new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}`
}

export default function FigmaComponentLayout({data}) {
  const { name, componentUrl, status, updatedAt, properties, thumbnails } = data.figmaComponent || {}
  const description = data.sitePage?.context.frontmatter.description || ''
  const title = data.sitePage?.context.frontmatter.title || name
  
  
  const tableOfContents = {
    items: [
      {url: '#playground', title: 'Playground'},
      {url: '#props', title: 'Props'},
    ],
  }

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
            includeFigma={data.sitePage.context.frontmatter.figmaId}
            current="figma"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: 4 }}>
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
            <Text sx={{display: 'inline-block', fontWeight: 'bold', pl: 3}} id="toc-heading">
              On this page
            </Text>
            <TableOfContents aria-labelledby="toc-heading" items={tableOfContents.items} />
          </Box>
          <Box>
            {/* @ts-ignore */}
            {!name ? 
              // NO component found in json
              <Note variant="warning">
                <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Work in progress</Text>
                We are currently transferring the Figma documentation for {title} from a different site to this page. To
                view the original documentation, please visit the{' '}
                <Link href={data.figmaFile.fileUrl}>Figma documentation for {title}</Link>.
              </Note>
              :
              // component found in json
              <>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Label size="large">{lastUpdated(updatedAt)}</Label>
                <StatusLabel status={sentenceCase(status)} />
                <Link href={componentUrl}>
                  <Box display={'flex'} alignItems={'center'} sx={{gap: 2}}>
                    <StyledOcticon icon={LinkIcon} />
                    Figma
                  </Box>
                </Link>
              </Box>
              
              <H2>Playground</H2>
              
              <FigmaComponentPlayground thumbnails={ thumbnails } properties = { properties } />

              <H2>Props</H2>
              <FigmaPropertyTable properties={ properties } />

              {properties.map(prop => <>
                <H3>{prop.name}</H3>
                    <FigmaPropertyPreview
                      thumbnails = { thumbnails }
                      property={prop.name}
                    />
              </>)}
    
              <Link
                sx={{display: 'inline-flex', gap: 1, alignItems: 'center'}}
                href={componentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
                <LinkExternalIcon />
              </Link>
            </>
          }
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}
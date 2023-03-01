import {AccessibilityLabel, Note, StatusLabel} from '@primer/gatsby-theme-doctocat'
import SourceLink from '@primer/gatsby-theme-doctocat/src/components/source-link'
import StorybookLink from '@primer/gatsby-theme-doctocat/src/components/storybook-link'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import {graphql} from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {StorybookEmbed} from '../components/storybook-embed'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'

export const query = graphql`
  query ReactComponentPageQuery($componentId: String!, $parentPath: String!) {
    primerReactVersion {
      version
    }
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
    reactComponent(componentId: {eq: $componentId}) {
      name
      status
      a11yReviewed
      stories
      props {
        name
        type
        description
        defaultValue
        required
        deprecated
      }
      subcomponents {
        name
        props {
          name
          type
          description
          defaultValue
          required
          deprecated
        }
      }
    }
    allReactComponentStory {
      nodes {
        storyId
      }
    }
  }
`

export default function ReactComponentLayout({data}) {
  const {name, status, a11yReviewed, props: componentProps, subcomponents, stories} = data.reactComponent
  const allStoryIds = data.allReactComponentStory.nodes.map(node => node.storyId)
  const importStatement = `import {${name}} from '@primer/react${status === 'draft' ? '/drafts' : ''}'`

  const tableOfContents = {
    items: [
      {url: '#import', title: 'Import'},
      {url: '#examples', title: 'Examples'},
      {url: '#props', title: 'Props'},
    ],
  }

  const title = data.sitePage?.context.frontmatter.title || name
  const description = data.sitePage?.context.frontmatter.description || ''

  const defaultStoryId = `components-${name.toLowerCase()}--default`
  const validStoryIds = Array.from(new Set([defaultStoryId, ...stories]))
    // Ensure that all story IDs are valid
    .filter(storyId => allStoryIds.includes(storyId))

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
            current="react"
          />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: 4}}>
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
          <Box sx={{minWidth: 0}}>
            {/* @ts-ignore */}
            <Note variant="warning">
              <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Work in progress</Text>
              We are currently transferring the React documentation for {name} from a different site to this page. To
              view the original documentation with code examples, please visit the{' '}
              <Link href={`https://primer.style/react/${name}`}>Primer React documentation for {name}</Link>.
            </Note>
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
                  <Label size="large">@primer/react@{data.primerReactVersion.version}</Label>
                </li>
                <li>
                  <StatusLabel status={sentenceCase(status)} />
                </li>
                <li>
                  <AccessibilityLabel a11yReviewed={a11yReviewed} short={false} />
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
                <SourceLink href={`https://github.com/primer/react/blob/main/src/${name}`} />
                {validStoryIds.length > 0 ? (
                  <StorybookLink href={`https://primer.style/react/storybook/?path=/story/${validStoryIds[0]}`} />
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
              <Box sx={{px: 3, py: 2}}>
                <Box
                  sx={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}
                >
                  <Text sx={{fontWeight: 'bold'}} id="toc-heading-narrow">
                    On this page
                  </Text>
                </Box>
              </Box>
              <Box sx={{borderTop: '1px solid', borderColor: 'border.muted'}}>
                <TableOfContents aria-labelledby="toc-heading-narrow" items={tableOfContents.items} />
              </Box>
            </Box>

            <H2>Import</H2>
            {/* @ts-ignore */}
            <Code className="language-javascript">{importStatement}</Code>

            <H2>Examples</H2>
            {validStoryIds.length > 0 ? (
              <StorybookEmbed
                framework="react"
                height={300}
                stories={validStoryIds.map((storyId: string) => ({id: storyId}))}
              />
            ) : (
              // If there are no stories, link to the component's page in the Primer React docs
              <Link
                sx={{display: 'inline-flex', gap: 1, alignItems: 'center'}}
                href={`https://primer.style/react/${name}#examples`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{name} examples</span>
                <LinkExternalIcon />
              </Link>
            )}

            <H2>Props</H2>
            <H3>{name}</H3>
            <PropsTable props={componentProps} />
            {subcomponents?.map(subcomponent => (
              <>
                <H3>{subcomponent.name}</H3>
                <PropsTable props={subcomponent.props} />
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

/** Convert a string to sentence case. */
function sentenceCase(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
}

// TODO: Make table responsive
function PropsTable({
  props,
}: {
  props: Array<{
    name: string
    type: string
    defaultValue: string
    required: boolean
    deprecated: boolean
    description: string
  }>
}) {
  if (props.length === 0) {
    return (
      <Box sx={{padding: 3, bg: 'canvas.inset', textAlign: 'center', color: 'fg.muted', borderRadius: 2}}>No props</Box>
    )
  }

  return (
    <Box sx={{overflow: 'auto'}}>
      <Table>
        <colgroup>
          <col style={{width: '25%'}} />
          <col style={{width: '15%'}} />
          <col style={{width: '60%'}} />
        </colgroup>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Default</th>
            <th align="left">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map(prop => (
            <tr key={prop.name}>
              <td valign="top">
                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                  <Text sx={{fontFamily: 'mono', fontSize: 1, whiteSpace: 'nowrap'}}>{prop.name}</Text>
                  {prop.required ? <Label>Required</Label> : null}
                  {prop.deprecated ? <Label variant="danger">Deprecated</Label> : null}
                </Box>
              </td>
              <td valign="top">{prop.defaultValue ? <InlineCode>{prop.defaultValue}</InlineCode> : null}</td>
              <td>
                <InlineCode>{prop.type}</InlineCode>
                <Box
                  sx={{
                    '&:not(:empty)': {
                      mt: 2,
                    },
                    color: 'fg.muted',
                    '& > :first-child': {
                      mt: 0,
                    },
                    '& > :last-child': {
                      mb: 0,
                    },
                  }}
                >
                  {/* @ts-ignore */}
                  <ReactMarkdown components={{a: Link, code: InlineCode}}>{prop.description}</ReactMarkdown>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

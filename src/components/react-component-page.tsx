import {AccessibilityLabel, Note, StatusLabel} from '@primer/gatsby-theme-doctocat'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import React, { PropsWithChildren } from 'react'
import {StorybookEmbed} from '../components/storybook-embed'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'
import StatusMenu from '../components/status-menu'
import ReactPropsTable from './react-props-table'

type ReactComponentPageProps = {
  // Data is the result of the ReactComponentInfo graphql fragment in react-component-layout.tsx
  data: any,
  showExamples?: boolean,
  showProps?: boolean
  showImport?: boolean,
  tocItems?: TocEntry[]
}

type TocEntry = {
  url: string,
  title: string,
}

export default function ReactComponentPage(props: PropsWithChildren<ReactComponentPageProps>) {
  const {data, showExamples = true, showProps = true, showImport = true, tocItems = []} = props
  const {name, status, a11yReviewed, props: componentProps, subcomponents, stories} = data.reactComponent
  const importStatement = `import {${name}} from '@primer/react${status === 'draft' ? '/drafts' : ''}'`

  const tableOfContents = {
    items: [...tocItems],
  }

  if (showImport) {
    tableOfContents.items.push({url: '#import', title: 'Import'})
  }

  if (showExamples) {
    tableOfContents.items.push({url: '#storybook-examples', title: 'Storybook Examples'})
  }

  if (showProps) {
    tableOfContents.items.push({url: '#props', title: 'Props'})
  }

  const title = data.sitePage?.context.frontmatter.title || name
  const description = data.sitePage?.context.frontmatter.description || ''

  const statusSet: Set<string> = new Set();
  for (const reactComponent of data.allReactComponent.nodes) {
    statusSet.add(reactComponent.status)
  }

  // this component has a dedicated page for its deprecated version
  if (data.deprecatedMdx?.id) statusSet.add("deprecated")
  if (data.draftMdx?.id) statusSet.add("draft")

  const statuses = [...statusSet]

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
            current="react"
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
              {statuses.length > 1 &&
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
                  <StatusMenu currentStatus={status} statuses={statuses} parentPath={`${data.sitePage.path}/react`} />
                </Box>
              }
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
                  <Heading as="h3" sx={{fontSize: 1, fontWeight: 'bold'}} id="toc-heading-narrow">
                    On this page
                  </Heading>
                </Box>
              </Box>
              <Box sx={{borderTop: '1px solid', borderColor: 'border.muted'}}>
                <TableOfContents aria-labelledby="toc-heading-narrow" items={tableOfContents.items} />
              </Box>
            </Box>

            {status === "deprecated" &&
              /* @ts-ignore */
              <Note variant="warning">
                <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>This component is deprecated</Text>
                <Text>Please consider using an alternative.</Text>
              </Note>
            }

            {showImport && <>
              <H2>Import</H2>
              {/* @ts-ignore */}
              <Code className="language-javascript">{importStatement}</Code>
            </>}

            {props.children}

            {showExamples && <>
              <H2>Storybook Examples</H2>
              {stories.length > 0 ? (
                <StorybookEmbed framework="react" height={300} stories={stories} />
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
            </>}

            {showProps && <>
              <H2>Props</H2>
              <H3>{name}</H3>
              <ReactPropsTable props={componentProps} />
              {subcomponents?.map(subcomponent => (
                <>
                  <H3>{subcomponent.name}</H3>
                  <ReactPropsTable props={subcomponent.props} />
                </>
              ))}
            </>}
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

import {AccessibilityLabel, Note, StatusLabel} from '@primer/gatsby-theme-doctocat'
import GithubSlugger from 'github-slugger'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import {sentenceCase} from 'change-case'
import {graphql} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'
import {LookbookEmbed} from '../components/lookbook-embed'
import RailsMarkdown from '../components/rails-markdown'

export const query = graphql`
  query RailsComponentPageQuery($componentId: String!, $parentPath: String!) {
    primerRailsVersion {
      version
    }

    sitePage(path: {eq: $parentPath}) {
      path
      context {
        frontmatter {
          title
          description
          reactId
          railsId
          figmaId
        }
      }
    }

    railsComponent(fully_qualified_name: {eq: $componentId}) {
      name: component
      railsId: fully_qualified_name
      description
      status
      a11y_reviewed
      short_name

      props: parameters {
        name
        type
        description
        default
      }

      slots {
        description
        name
        parameters {
          default
          description
          name
          type
        }
      }

      methods {
        name
        description
        parameters {
          default
          description
          name
          type
        }
      }

      previews {
        name
        preview_path
        inspect_path
      }

      subcomponents {
        name: component
        railsId: fully_qualified_name
        description
        status
        a11y_reviewed
        short_name

        props: parameters {
          name
          type
          description
          default
        }

        slots {
          description
          name
          parameters {
            default
            description
            name
            type
          }
        }

        methods {
          name
          description
          parameters {
            default
            description
            name
            type
          }
        }

        previews {
          name
          preview_path
          inspect_path
        }
      }
    }
  }
`

const baseUrl = 'https://primer.style/view-components'

function RailsComponentArguments({props, parentRailsId}) {
  if (props.length > 0) {
    return (
      <>
        <H2>Arguments</H2>
        <PropsTable props={props} parentRailsId={parentRailsId} />
      </>
    )
  } else {
    return <></>
  }
}

function RailsComponentSlots({slots, parentRailsId}) {
  if (slots.length > 0) {
    return (
      <>
        <H2>Slots</H2>
        {slots.map(slot => {
          return (
            <>
              <H3>
                <InlineCode>{slot.name}</InlineCode>
              </H3>
              {/* @ts-ignore */}
              <RailsMarkdown text={slot.description} parentRailsId={parentRailsId} />
              <PropsTable props={slot.parameters} parentRailsId={parentRailsId} />
            </>
          )
        })}
      </>
    )
  } else {
    return <></>
  }
}

function RailsComponentMethods({methods, parentRailsId}) {
  if (methods.length > 0) {
    return (
      <>
        <H2>Methods</H2>
        {methods.map(method => {
          return (
            <>
              <H3>
                <InlineCode>{method.name}</InlineCode>
              </H3>
              {/* @ts-ignore */}
              <RailsMarkdown text={method.description} parentRailsId={parentRailsId} />
              <PropsTable props={method.parameters} parentRailsId={parentRailsId} />
            </>
          )
        })}
      </>
    )
  } else {
    return <></>
  }
}

function RailsComponentPreviews({previews, showPreviews}) {
  if (showPreviews && previews.length > 0) {
    return (
      <>
        <H2>Examples</H2>
        <LookbookEmbed height={300} previews={previews} />
      </>
    )
  } else {
    return <></>
  }
}

function RailsComponent({data, showPreviews, parentRailsId}) {
  const {props, slots, methods, previews} = data

  return (
    <>
      <RailsComponentArguments props={props} parentRailsId={parentRailsId} />
      <RailsComponentPreviews previews={previews} showPreviews={showPreviews} />
      <RailsComponentSlots slots={slots} parentRailsId={parentRailsId} />
      <RailsComponentMethods methods={methods} parentRailsId={parentRailsId} />
    </>
  )
}

export default function RailsComponentLayout({data}) {
  const {name, short_name, a11y_reviewed, status, previews, slots} = data.railsComponent

  const title = data.sitePage?.context.frontmatter.title
  const description = data.sitePage?.context.frontmatter.description
  const railsUrl = `${baseUrl}/components/${status}/${short_name.toLowerCase()}`
  const reactId = data.sitePage.context.frontmatter.reactId
  const railsId = data.sitePage.context.frontmatter.railsId
  const figmaId = data.sitePage.context.frontmatter.figmaId

  const subcomponents = []
  const componentStack = [data.railsComponent]

  while (componentStack.length > 0) {
    const component = componentStack.pop()

    if (component.subcomponents) {
      subcomponents.push.apply(subcomponents, component.subcomponents)
      componentStack.push.apply(componentStack, component.subcomponents)
    }
  }

  const tableOfContents = {
    items: [
      {url: '#description', title: 'Description'},
      {url: '#arguments', title: 'Arguments'},
    ],
  }

  if (slots.length > 0) {
    tableOfContents.items.push({url: '#slots', title: 'Slots'})
  }

  if (previews.length > 0) {
    tableOfContents.items.push({url: '#examples', title: 'Examples'})
  }

  const slugger = new GithubSlugger()

  for (const subcomponent of subcomponents) {
    tableOfContents.items.push({
      url: `#${slugger.slug((subcomponent as any).name)}`,
      title: (subcomponent as any).name,
    })
  }

  const renderSubComponents = subcomponents => {
    if (subcomponents && subcomponents.length > 0) {
      return (
        <>
          {subcomponents.map(subcomponent => {
            return (
              <>
                <H2>{subcomponent.name}</H2>
                {/* @ts-ignore */}
                <RailsMarkdown text={subcomponent.description} />
                <RailsComponent {...{data: subcomponent, showPreviews: false, parentRailsId: railsId}} />
              </>
            )
          })}
        </>
      )
    }
  }

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
            includeReact={reactId}
            includeRails={railsId}
            includeFigma={figmaId}
            current="rails"
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
          <Box>
            {/* @ts-ignore */}
            <Note variant="warning">
              <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Work in progress</Text>
              We are currently transferring the Rails documentation for {name} from a different site to this page. To
              view the original documentation, please visit the{' '}
              <Link href={railsUrl}>Primer ViewComponents documentation for {name}</Link>.
            </Note>

            <Box sx={{display: 'flex', gap: 2, mb: 4}}>
              <Label size="large">v{data.primerRailsVersion.version}</Label>
              <StatusLabel status={sentenceCase(status)} />
              <AccessibilityLabel a11yReviewed={a11y_reviewed} short={false} />
            </Box>

            <H2>Description</H2>
            <RailsMarkdown text={data.railsComponent.description} parentRailsId={railsId} />

            <RailsComponent data={data.railsComponent} showPreviews={true} parentRailsId={railsId} />

            {renderSubComponents(subcomponents)}
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

// TODO: Make table responsive
function PropsTable({
  props,
  parentRailsId,
}: {
  props: Array<{
    name: string
    type: string
    default: string
    description: string
  }>
  parentRailsId: string
}) {
  if (props.length == 0) {
    return <></>
  }

  return (
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
              </Box>
            </td>
            <td valign="top">
              {prop.default ? <RailsMarkdown text={prop.default} parentRailsId={parentRailsId} /> : null}
            </td>
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
                <RailsMarkdown text={prop.description} parentRailsId={parentRailsId} />
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

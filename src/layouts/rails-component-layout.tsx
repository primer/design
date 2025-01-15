import {AccessibilityLabel, Note, StatusLabel} from '@primer/gatsby-theme-doctocat'
import GithubSlugger from 'github-slugger'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {H2, H3, H4} from '@primer/gatsby-theme-doctocat/src/components/heading'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import {sentenceCase} from 'change-case'
import {graphql, Link as GatsbyLink} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'
import {LookbookEmbed} from '../components/lookbook-embed'
import RailsMarkdown from '../components/rails-markdown'
import { RailsProvider } from '../components/rails-provider'
import StatusMenu from '../components/status-menu'

export const query = graphql`
  query RailsComponentPageQuery($componentId: String!, $parentPath: String!) {
    primerRailsVersion {
      version
    }

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

    allRailsComponent {
      nodes {
        railsId: fully_qualified_name
        status
      }
    }

    railsComponent(fully_qualified_name: {eq: $componentId}) {
      name: component
      railsId: fully_qualified_name
      description
      status
      a11y_reviewed
      short_name
      is_form_component
      accessibility_docs

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
        return_types
      }

      previews {
        name
        preview_path
      }

      subcomponents {
        name: component
        railsId: fully_qualified_name
        description
        status
        a11y_reviewed
        short_name
        accessibility_docs

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
      }
    }
  }
`

function RailsComponentArguments({props}) {
  if (props.length > 0) {
    return (
      <>
        <H2>Arguments</H2>
        <RailsPropsTable props={props} />
      </>
    )
  } else {
    return <></>
  }
}

function RailsComponentSlots({slots}) {
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
              <RailsMarkdown text={slot.description} />
              <RailsPropsTable props={slot.parameters} />
            </>
          )
        })}
      </>
    )
  } else {
    return <></>
  }
}

function RailsComponentMethods({methods}) {
  if (methods.length > 0) {
    return (
      <>
        <H2>Methods</H2>
        {methods.map(method => {
          return (
            <>
              <H3>
                <InlineCode>
                  {method.name}
                  {methodParameterList(method.parameters)}
                  {methodReturnTypes(method.return_types)}
                </InlineCode>
              </H3>
              {/* @ts-ignore */}
              <RailsMarkdown text={method.description} />
              <RailsComponentMethodParametersTable parameters={method.parameters} />
            </>
          )
        })}
      </>
    )
  } else {
    return <></>
  }
}

function methodReturnTypes(returnTypes) {
  if (returnTypes && returnTypes.length > 0) {
    return ' -> ' + returnTypes.join(' | ')
  } else {
    return ''
  }
}

function methodParameterList(parameters) {
  const params = parameters.map(param => {
    if (param.type) {
      return `${param.name}: ${param.type}`
    } else {
      return param.name
    }
  })

  if (parameters.length > 0) {
    return `(${params.join(', ')})`
  } else {
    return ''
  }
}

function RailsComponentMethodParametersTable({parameters}) {
  if (parameters.length > 0) {
    return <>
      <H4>Parameters</H4>
      <RailsPropsTable props={parameters} />
    </>
  } else {
    return <></>
  }
}

function RailsComponentPreviews({railsId, previews, showPreviews}) {
  if (showPreviews && previews.length > 0) {
    return (
      <>
        <H2>Examples</H2>
        <LookbookEmbed railsId={railsId} />
      </>
    )
  } else {
    return <></>
  }
}

function AccessibilityDocs({text}) {
  if (text) {
    return (
      <>
        <H2>Accessibility</H2>
        <RailsMarkdown text={text} />
      </>
    )
  } else {
    return <></>
  }
}

function RailsComponent({data, showPreviews}) {
  const {props, slots, methods, previews} = data

  return (
    <>
      <RailsComponentArguments props={props} />
      <RailsComponentPreviews railsId= {data.railsId} previews={previews} showPreviews={showPreviews} />
      <RailsComponentSlots slots={slots} />
      <RailsComponentMethods methods={methods} />
    </>
  )
}

export default function RailsComponentLayout({data}) {
  const {name, a11y_reviewed, status, previews, slots, methods, is_form_component, accessibility_docs} = data.railsComponent
  const allRailsComponents = data.allRailsComponent.nodes

  const title = data.sitePage?.context.frontmatter.title
  const description = data.sitePage?.context.frontmatter.description
  const reactId = data.sitePage.context.frontmatter.reactId
  const railsIds = data.sitePage.context.frontmatter.railsIds
  const figmaId = data.sitePage.context.frontmatter.figmaId
  const cssId = data.sitePage.context.frontmatter.cssId

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

  if (accessibility_docs) {
    tableOfContents.items.splice(1, 0, {url: '#accessibility', title: 'Accessibility'})
  }

  if (previews.length > 0) {
    tableOfContents.items.push({url: '#examples', title: 'Examples'})
  }

  if (slots.length > 0) {
    tableOfContents.items.push({url: '#slots', title: 'Slots'})
  }

  if (methods.length > 0) {
    tableOfContents.items.push({url: '#methods', title: 'Methods'})
  }

  const slugger = new GithubSlugger()

  for (const subcomponent of subcomponents) {
    tableOfContents.items.push({
      url: `#${slugger.slug((subcomponent as any).name, false)}`,
      title: (subcomponent as any).name,
    })
  }

  const statuses: string[] = []

  for (const railsComponent of allRailsComponents) {
    if (railsIds.indexOf(railsComponent.railsId) !== -1) {
      statuses.push(railsComponent.status)
    }
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
                <RailsComponent {...{data: subcomponent, showPreviews: false}} />
              </>
            )
          })}
        </>
      )
    }
  }

  const baseUrl = (() => {
    const slugMatch = data.sitePage.id.match(/\/components\/(\w+)\//)

    if (slugMatch) {
      return `/components/${slugMatch[1]}`
    }

    return data.sitePage.path;
  })()

  return (
    <RailsProvider>
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
              includeReact={reactId}
              includeRails={railsIds}
              includeFigma={figmaId}
              includeCSS={cssId}
              current="rails"
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
            <Box sx={{'flexGrow': 1, minWidth: 0}}>
              <Box sx={{display: 'flex', gap: 2, mb: 4}}>
                <Label size="large">v{data.primerRailsVersion.version}</Label>
                <StatusLabel status={sentenceCase(status)} />
                <AccessibilityLabel a11yReviewed={a11y_reviewed} short={false} />
                {statuses.length > 1 && <Box sx={{marginLeft: 'auto', marginTop: '-4px'}}>
                  <StatusMenu currentStatus={status} statuses={statuses} parentPath={`${baseUrl}/rails`} />
                </Box>}
              </Box>

              {is_form_component && <Note>
                <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Forms framework</Text>
                The <InlineCode>{name}</InlineCode> component is part of the <Link as={GatsbyLink} to="/ui-patterns/forms/rails">Primer forms framework</Link>.
                If you're building a form, please consider using the framework instead of this standalone component.
              </Note>}

              {status === "deprecated" &&
                /* @ts-ignore */
                <Note variant="warning">
                  <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>This component is deprecated</Text>
                  <Text>Please consider using an alternative.</Text>
                </Note>
              }

              <H2>Description</H2>
              <RailsMarkdown text={data.railsComponent.description} />

              <AccessibilityDocs text={data.railsComponent.accessibility_docs} />

              <RailsComponent data={data.railsComponent} showPreviews={true} />

              {renderSubComponents(subcomponents)}
            </Box>
          </Box>
        </Box>
      </BaseLayout>
    </RailsProvider>
  )
}

// TODO: Make table responsive
function RailsPropsTable({
  props
}: {
  props: Array<{
    name: string
    type: string
    default: string
    description: string
  }>
}) {
  if (props.length == 0) {
    return <></>
  }

  return (
    <Box sx={{overflow: 'auto'}}>
      <Table>
        <colgroup>
          <col style={{width: '25%'}} />
          <col style={{width: '15%'}} />
          <col style={{width: '15%'}} />
          <col style={{width: '60%'}} />
        </colgroup>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
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
                <InlineCode>{prop.type}</InlineCode>
              </td>
              <td valign="top">
                <Box
                  sx={{
                    '&:not(:empty)': {
                      mt: 0,
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
                  {prop.default ? <RailsMarkdown text={prop.default} /> : null}
                </Box>
              </td>
              <td>
                <Box
                  sx={{
                    '&:not(:empty)': {
                      mt: 0,
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
                  <RailsMarkdown text={prop.description} />
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

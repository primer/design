import {AccessibilityLabel, Note, StatusLabel} from '@primer/gatsby-theme-doctocat'
import { H2, H3 } from '@primer/gatsby-theme-doctocat/src/components/heading'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import { sentenceCase } from 'change-case'
import {graphql} from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'
import { LookbookEmbed } from '../components/lookbook-embed'

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
          figmaUrl: figma
        }
      }
    }

    railsComponent(component: {eq: $componentId}) {
      name: component
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

      previews {
        name
        preview_path
        inspect_path
      }
    }
  }
`

const baseUrl = "https://primer.style/view-components"

export default function RailsComponentLayout({data}) {
  const {name, short_name, a11y_reviewed, status, props, previews, slots} = data.railsComponent

  const title = data.sitePage?.context.frontmatter.title
  const description = data.sitePage?.context.frontmatter.description
  const railsUrl = `${baseUrl}/components/${status}/${short_name.toLowerCase()}`

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
            includeRails={data.sitePage.context.frontmatter.railsId}
            includeFigma={data.sitePage.context.frontmatter.figmaUrl}
            current="rails"
          />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: 4}}>
          <Box>
            {/* @ts-ignore */}
            <Note variant="warning">
              <Text sx={{display: 'block', fontWeight: 'bold', mb: 2}}>Work in progress</Text>
              We are currently transferring the Rails documentation for {name} from a different site to this
              page. To view the original documentation, please visit the{' '}
              <Link href={railsUrl}>
                Primer ViewComponents documentation for {name}
              </Link>
              .
            </Note>

            <Box sx={{display: 'flex', gap: 2, mb: 4}}>
              <Label size="large">v{data.primerRailsVersion.version}</Label>
              <StatusLabel status={sentenceCase(status)} />
              <AccessibilityLabel a11yReviewed={a11y_reviewed} short={false} />
            </Box>

            <Link
              sx={{display: 'inline-flex', gap: 1, alignItems: 'center'}}
              href={railsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
              <LinkExternalIcon />
            </Link>

            <H2>Arguments</H2>
            <PropsTable props={props} />

            <H2>Slots</H2>
            {slots.map( (slot) => {
              return(<>
                <H3><InlineCode>{slot.name}</InlineCode></H3>
                <PropsTable props={slot.parameters} />
              </>)
            })}

            <H2>Examples</H2>
            {previews.length > 0 ? (
              <LookbookEmbed
                height={300}
                previews={previews}
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
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

// TODO: Make table responsive
function PropsTable({
  props,
}: {
  props: Array<{
    name: string
    type: string
    default: string
    description: string
  }>
}) {
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
            <td valign="top">{prop.default ? <InlineCode>{prop.default}</InlineCode> : null}</td>
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
  )
}

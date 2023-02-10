import {AccessibilityLabel, StatusLabel} from '@primer/gatsby-theme-doctocat'
import Layout from '@primer/gatsby-theme-doctocat/src/components/layout'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import {Box, Label, Text, UnderlineNav} from '@primer/react'
import {graphql, Link as GatsbyLink} from 'gatsby'
import React from 'react'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'

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
        }
      }
    }
    reactComponent(componentId: {eq: $componentId}) {
      name
      status
      a11yReviewed
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
  }
`

export default function ReactComponentPage({data, children, ...props}: any) {
  const {name, status, a11yReviewed, props: componentProps, subcomponents} = data.reactComponent
  const importStatement = `import {${name}} from '@primer/react${status === 'draft' ? '/drafts' : ''}'`

  const tableOfContents = {
    items: [{url: '#props', title: 'Props'}],
  }

  const frontmatter = {
    title: data.sitePage.context.frontmatter.title,
    description: data.sitePage.context.frontmatter.description,
  }

  const pageContext = deepMerge(props.pageContext, {tableOfContents, frontmatter, contributors: []})

  // TODO: Polish design of this page. This is a proof-of-concept.
  return (
    <Layout {...deepMerge(props, {pageContext})}>
      <UnderlineNav sx={{mb: 4}}>
        <UnderlineNav.Link as={GatsbyLink} to={data.sitePage.path}>
          Overview
        </UnderlineNav.Link>
        <UnderlineNav.Link as={GatsbyLink} to={`${data.sitePage.path}/react`} selected>
          React
        </UnderlineNav.Link>
      </UnderlineNav>
      <Box sx={{display: 'flex', gap: 2, mb: 4}}>
        <Label size="large">v{data.primerReactVersion.version}</Label>
        <StatusLabel status={sentenceCase(status)} />
        <AccessibilityLabel a11yReviewed={a11yReviewed} short={false} />
      </Box>
      {/* @ts-ignore */}
      <Code className="language-javascript">{importStatement}</Code>
      <H2>Props</H2>
      <H3>{name}</H3>
      <PropsTable props={componentProps} />
      {subcomponents.map(subcomponent => (
        <>
          <H3>{subcomponent.name}</H3>
          <PropsTable props={subcomponent.props} />
        </>
      ))}
    </Layout>
  )
}

/** Convert a string to sentence case. */
function sentenceCase(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
}

/** Deeply merge two objects */
function deepMerge(obj1: any, obj2: any): any {
  let result = {...obj1}
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
        result[key] = deepMerge(result[key], obj2[key])
      } else {
        result[key] = obj2[key]
      }
    }
  }
  return result
}

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
  return (
    <Table>
      <colgroup>
        <col style={{width: '20%'}} />
        <col style={{width: '30%'}} />
        <col style={{width: '10%'}} />
        <col style={{width: '40%'}} />
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
                {prop.required ? <Label variant="accent">Required</Label> : null}
                {prop.deprecated ? <Label variant="danger">Deprecated</Label> : null}
              </Box>
            </td>
            <td valign="top">
              <Text as="pre" sx={{m: 0, fontFamily: 'mono', fontSize: 1, whiteSpace: 'pre-wrap'}}>
                {prop.type}
              </Text>
            </td>
            <td>
              <Text sx={{fontFamily: 'mono', fontSize: 1, whiteSpace: 'nowrap'}}>{prop.defaultValue}</Text>
            </td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

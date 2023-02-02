import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import DoctocatLayout from '@primer/gatsby-theme-doctocat/src/components/layout'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import {Box, Label, Spinner, Text} from '@primer/react'
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'
import React from 'react'

async function fetchPrimerReactData() {
  const json = await fetch('https://api.github.com/repos/primer/react/contents/generated/components.json').then(
    response => response.json(),
  )
  // TODO: Handle errors
  const content = atob(json.content)
  return JSON.parse(content)
}

function Page({children, ...props}: any) {
  const {id = ''} = props.pageContext.frontmatter
  // TODO: Fetch inital data at build time, then hydrate
  const queryResult = useQuery(['react-component-data'], fetchPrimerReactData)
  const componentData = queryResult.data?.components[id]
  const importStatement = `import {${componentData?.name}} from '@primer/react${
    componentData?.status === 'draft' ? '/drafts' : ''
  }'`

  const tableOfContents = {
    items: [
      {url: '#import', title: 'Import'},
      {url: '#props', title: 'Props'},
    ],
  }

  const frontmatter = {
    title: componentData?.name,
    status: sentenceCase(componentData?.status || ''),
    a11yReviewed: componentData?.a11yReviewed,
  }

  const pageContext = deepMerge(props.pageContext, {tableOfContents, frontmatter})

  return (
    <DoctocatLayout {...deepMerge(props, {pageContext})}>
      {queryResult.isLoading ? (
        <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
          <Spinner />
        </Box>
      ) : null}
      {queryResult.isError ? <pre>{JSON.stringify(queryResult.error, null, 2)}</pre> : null}
      {queryResult.isSuccess && componentData ? (
        <>
          <H2>Import</H2>
          {/* @ts-ignore */}
          <Code className="language-javascript">{importStatement}</Code>
          {/* TODO: Link to source code */}
          {/* TODO: Link to storybook */}
          <H2>Props</H2>
          <H3>{componentData.name}</H3>
          <PropsTable props={componentData.props} />
          {componentData.subcomponents.map(subcomponent => (
            <>
              <H3>{subcomponent.name}</H3>
              <PropsTable props={subcomponent.props} />
            </>
          ))}
        </>
      ) : null}
    </DoctocatLayout>
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

const queryClient = new QueryClient()

// TODO: Render provider at the root of the app
export function ReactComponentLayout(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Page {...props} />
    </QueryClientProvider>
  )
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

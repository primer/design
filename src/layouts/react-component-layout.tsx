import React from 'react'
import DoctocatLayout from '@primer/gatsby-theme-doctocat/src/components/layout'
import {AccessibilityLabel, StatusLabel} from '@primer/gatsby-theme-doctocat'
import {H1, H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {useQuery} from '@tanstack/react-query'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Box, Heading, Label, Text} from '@primer/react'

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
  return (
    <DoctocatLayout {...props}>
      {queryResult.isLoading ? <div>Loading...</div> : null}
      {queryResult.isError ? <pre>{JSON.stringify(queryResult.error, null, 2)}</pre> : null}
      {queryResult.isSuccess && componentData ? (
        <>
          <Heading as="h1" sx={{mb: 2}}>
            {componentData.name}
          </Heading>
          <Box sx={{display: 'flex', gap: 1, mb: 4}}>
            <StatusLabel status={sentenceCase(componentData.status)} />
            <AccessibilityLabel a11yReviewed={componentData.a11yReviewed} short={false} />
          </Box>
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

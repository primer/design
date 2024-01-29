import React from 'react'
import ReactMarkdown from 'react-markdown'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import { Box, Text, Label, Link } from '@primer/react'

// TODO: Make table responsive
export default function ReactPropsTable({
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
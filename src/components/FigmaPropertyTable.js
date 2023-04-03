import React from 'react'
import {Label, Text} from '@primer/react'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'

function propertyValues(property) {
  let values = property.values?.map((value, index) => {
    return (
      <React.Fragment key={index}>
        <InlineCode>{value}</InlineCode> 
      </React.Fragment>
    )
  })

  if (property.values?.length === 0) {
    values = <Text>-</Text>
  }

  return values
}

function propertyTypes(property) {
  let values

  if (property.type === 'VARIANT') {
    values = <Label>Variant</Label>
  }

  if (property.type === 'TEXT') {
    values = <Label variant="attention">Text</Label>
  }

  if (property.type === 'INSTANCE_SWAP') {
    values = <Label variant="accent">Instance swap</Label>
  }

  if (property.type === 'BOOLEAN') {
    values = <Label variant="success">Boolean</Label>
  }

  return values
}

export default function FigmaPropertyTable({properties}) {
  return (
    <article>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Values</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => {
            return (
              <tr key={index}>
                <td style={{whiteSpace: 'nowrap'}}>{property.name}</td>
                <td>{propertyTypes(property)}</td>
                <td>{propertyValues(property)}</td>
                <td>
                  <InlineCode>{property.defaultValue}</InlineCode>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </article>
  )
}

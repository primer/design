import React from 'react'
import {Link, Text, Label, StyledOcticon} from '@primer/react'
import {StatusLabel} from '@primer/gatsby-theme-doctocat'
import {AccessibilityInsetIcon} from '@primer/octicons-react'

function EmptyCell() {
  return <Text sx={{fontSize: 0, color: 'fg.subtle'}}>Not available</Text>
}

function AccessibilityLabel({a11yReviewed, size}) {
  if (a11yReviewed) {
    return (
      <Label
        size={size}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'done.subtle',
          fontWeight: 'normal',
          borderColor: 'transparent',
        }}
      >
        <StyledOcticon icon={AccessibilityInsetIcon} sx={{fill: 'done.fg'}} />
        Reviewed
      </Label>
    )
  } else {
    return (
      <Label
        size={size}
        sx={{
          backgroundColor: 'neutral.subtle',
          fontWeight: 'normal',
          borderColor: 'transparent',
        }}
      >
        Not reviewed
      </Label>
    )
  }
}

export default function StatusRows({components, type}) {
  const labelSize = 'large'

  if (type) {
    components = components.filter(
      component =>
        (component.implementations.react &&
          (component.implementations.react.status === type ||
            (component.implementations.react.a11yReviewed && type === 'Accessibility'))) ||
        (component.implementations.viewComponent &&
          (component.implementations.viewComponent.status === type ||
            (component.implementations.viewComponent.a11yReviewed && type === 'Accessibility'))),
    )
  }

  return (
    <>
      {components.map(component => (
        <tr key={component.id}>
          <th align="left" scope="row" style={{whiteSpace: 'nowrap'}}>
            {component.displayName}
          </th>
          <td align="center" style={{whiteSpace: 'nowrap'}}>
            {component.implementations.react ? (
              <Link href={component.implementations.react.url}>
                <StatusLabel size={labelSize} status={component.implementations.react.status} />
              </Link>
            ) : (
              <EmptyCell />
            )}
          </td>
          <td align="center" style={{whiteSpace: 'nowrap'}}>
            {component.implementations.react ? (
              <AccessibilityLabel a11yReviewed={component.implementations.react.a11yReviewed} size={labelSize} />
            ) : (
              <EmptyCell />
            )}
          </td>
          <td align="center" style={{whiteSpace: 'nowrap'}}>
            {component.implementations.viewComponent ? (
              <Link href={component.implementations.viewComponent.url}>
                <StatusLabel size={labelSize} status={component.implementations.viewComponent.status} />
              </Link>
            ) : (
              <EmptyCell />
            )}
          </td>
          <td align="center" style={{whiteSpace: 'nowrap'}}>
            {component.implementations.viewComponent ? (
              <AccessibilityLabel
                a11yReviewed={component.implementations.viewComponent.a11yReviewed}
                size={labelSize}
              />
            ) : (
              <EmptyCell />
            )}
          </td>
        </tr>
      ))}
    </>
  )
}

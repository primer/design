import componentMetadata from '@primer/component-metadata'
import {Box, themeGet, ActionList, ActionMenu, StyledOcticon, ThemeProvider, Spinner} from '@primer/react'
import {DotFillIcon, AccessibilityInsetIcon, ListUnorderedIcon} from '@primer/octicons-react'
import React from 'react'
import styled from 'styled-components'
import StatusRows from './status-rows'

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  a {
    color: currentColor;

    &:hover {
      text-decoration: none;
    }
  }

  th,
  td {
    padding: ${themeGet('space.2')} ${themeGet('space.3')};
    border-color: ${themeGet('colors.border.default')};
    border-style: solid;
    border-width: 0;
    border-left-width: 1px;
    border-top-width: 1px;
    font-weight: normal;
    vertical-align: top;
  }

  th {
    background-color: ${themeGet('colors.canvas.subtle')};
    font-weight: ${themeGet('fontWeights.bold')};
    vertical-align: middle;
  }

  thead tr:first-child > th:first-child {
    border-top-left-radius: 6px;
  }

  thead tr:first-child > th:last-child {
    border-top-right-radius: 6px;
  }

  tbody tr:last-child > th:first-child {
    border-bottom-left-radius: 6px;
  }

  tbody tr:last-child > td:last-child {
    border-bottom-right-radius: 6px;
  }

  tr:first-child th:last-child,
  td:last-child {
    border-right-width: 1px;
  }

  tr:last-child td,
  tbody tr:last-child th {
    border-bottom-width: 1px;
  }

  td {
    vertical-align: middle;
  }
`

const STATUS_COLORS = {
  alpha: 'severe.emphasis',
  beta: 'attention.emphasis',
  stable: 'success.emphasis',
  deprecated: 'danger.emphasis',
}

function getStatusColor(status) {
  return STATUS_COLORS[status.toLowerCase()] || 'fg.muted'
}

const initialFieldTypes = [
  {type: '', name: 'All components', icon: ListUnorderedIcon},
  {type: 'Accessibility', name: 'Reviewed for accessibility', icon: AccessibilityInsetIcon},
]

const statusFieldTypes = [
  {type: 'Stable', name: 'Stable'},
  {type: 'Beta', name: 'Beta'},
  {type: 'Alpha', name: 'Alpha'},
  {type: 'Draft', name: 'Draft'},
  {type: 'Deprecated', name: 'Deprecated'},
]

export function StatusTable() {
  const [components, setComponents] = React.useState([])
  const [selectedField, setSelectedField] = React.useState(initialFieldTypes[0])

  React.useEffect(() => {
    getComponents()
      .then(components => setComponents(components))
      .catch(error => console.error(error))
  }, [])

  return (
    <ThemeProvider colorMode="day" nightScheme="dark_dimmed">
      {components.length > 0 && (
        <Box sx={{paddingBottom: 4}}>
          <ActionMenu>
            <ActionMenu.Button aria-label="Show components">Show: {selectedField.name}</ActionMenu.Button>
            <ActionMenu.Overlay width="medium">
              <ActionList selectionVariant="single">
                <ActionList.Group>
                  {initialFieldTypes.map((field, index) => (
                    <ActionList.Item
                      key={index}
                      selected={field.type === selectedField.type}
                      onSelect={() => setSelectedField(field)}
                    >
                      <ActionList.LeadingVisual>
                        <StyledOcticon icon={field.icon} />
                      </ActionList.LeadingVisual>
                      {field.name}
                    </ActionList.Item>
                  ))}
                </ActionList.Group>
                <ActionList.Divider />
                <ActionList.Group title="Status">
                  {statusFieldTypes.map((field, index) => (
                    <ActionList.Item
                      key={index}
                      selected={field.type === selectedField.type}
                      onSelect={() => setSelectedField(field)}
                    >
                      <ActionList.LeadingVisual>
                        <StyledOcticon icon={DotFillIcon} color={getStatusColor(field.type)} />
                      </ActionList.LeadingVisual>
                      {field.name}
                    </ActionList.Item>
                  ))}
                </ActionList.Group>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
        </Box>
      )}
      {components.length > 0 ? (
        <Box
          sx={{
            overflow: 'auto',
          }}
        >
          <Table>
            {/* <colgroup>
              <col span="2" style={{textAlign: 'center'}} />
              <col span="2" style={{textAlign: 'center'}} />
            </colgroup> */}
            <thead>
              <tr>
                <th align="left">Component</th>
                <th>React status</th>
                <th>React accessibility</th>
                <th>Rails status</th>
                <th>Rails accessibility</th>
              </tr>
            </thead>
            <tbody>
              <StatusRows components={components} type={selectedField.type} />
            </tbody>
          </Table>
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Spinner />
        </Box>
      )}
    </ThemeProvider>
  )
}

async function getComponents() {
  const handleError = error => {
    console.error(error)
  }

  // Get component status data
  const viewComponents = await fetch(`https://primer.github.io/view_components/components.json`)
    .then(res => res.json())
    .catch(handleError)

  const reactComponents = await fetch(`https://primer.github.io/react/components.json`)
    .then(res => res.json())
    .catch(handleError)

  const implementations = {
    react: {
      url: 'https://primer.style/react',
      data: reactComponents,
    },
    viewComponent: {
      url: 'https://primer.style/view-components',
      data: viewComponents,
    },
  }

  const components = {}

  for (const [implementation, {url, data}] of Object.entries(implementations)) {
    for (const {id, path, status, a11yReviewed} of data) {
      if (!(id in components)) {
        components[id] = {
          id,
          displayName: idToDisplayName(id),
          description: '',
          implementations: {},
        }
      }

      components[id].implementations[implementation] = {
        status: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the first letter
        url: `${url}${path}`,
        a11yReviewed: a11yReviewed || false,
      }
    }
  }

  for (const component of Object.values(componentMetadata.components)) {
    if (component.id in components) {
      components[component.id].displayName = component.displayName
      components[component.id].description = component.description
    }
  }

  return Object.values(components).sort((a, b) => a.id.localeCompare(b.id))
}

// Capitalize the first letter of the id and replace _ with spaces
function idToDisplayName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ')
}

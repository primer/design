import React from 'react'
import {ActionMenu, Text, Box, ActionList, ToggleSwitch} from '@primer/react'

const makeNewState = (currentState = {}, newProps) => {
  // copy object
  const newState = {...currentState}
  // update current state with new prop values
  for (const [name, value] of Object.entries(newProps)) {
    newState[name] = value
  }

  return newState
}

const compareObjects = (a, b) => {
  let s = o =>
    Object.entries(o)
      .sort()
      .map(i => {
        if (i[1] instanceof Object) i[1] = s(i[1])
        return i
      })
  return JSON.stringify(s(a)) === JSON.stringify(s(b))
}

export default function FigmaComponentPlayground({properties, thumbnails}) {
  // short circut if no thumbnails
  if (!thumbnails) return null
  // filter props
  properties = properties?.filter(prop => ['VARIANT', 'BOOLEAN'].includes(prop.type))

  const [previewState, setPreviewState] = React.useState([])
  const [activeThumbnail, setActiveThumbnail] = React.useState(null)

  React.useEffect(() => {
    const defaultValues = Object.fromEntries(properties.map(property => [property.name, property.defaultValue]))
    setPreviewState(makeNewState({}, defaultValues))
    setActiveThumbnail(findThumbnail(previewState))
  }, [])

  const handleClick = (propertyName, value) => {
    const intermiedateState = makeNewState(previewState, {[propertyName]: value})
    const newThumbnail = findThumbnail(intermiedateState, propertyName, value)

    if (newThumbnail) {
      // convert newThumbnail.props to a map
      const newThumbnailProps = newThumbnail.props.reduce((acc, cur) => {
        acc[cur.name] = cur.value
        return acc
      }, {})

      if (compareObjects(newThumbnailProps, intermiedateState)) {
        // if the thumbnail props are the same as the intermediate state, set the preview state to the intermediate state
        setPreviewState(makeNewState(previewState, {[propertyName]: value}))
      } else {
        // if the thumbnail props are not the same as the intermediate state, set the preview state to the thumbnail props
        setPreviewState(makeNewState(intermiedateState, newThumbnailProps))
      }
      setActiveThumbnail(newThumbnail)
    } else {
      // if no thumbnail is found, set the preview state to the intermediate state (e.g Button)
      setPreviewState(makeNewState(previewState, intermiedateState))
      setActiveThumbnail(false)
    }
  }

  const findThumbnail = (state, propertyName, propertyValue) => {
    const curPreviewState = Object.entries(state)
    const thumbnail = thumbnails.find(thumbnail => {
      const thumbnailProps = thumbnail.props

      let isActive = curPreviewState.every(([prop, value]) => {
        return thumbnailProps.find(x => x.value === value && x.name === prop)
      })

      return isActive
    })

    if (!thumbnail) {
      return thumbnails.find(thumbnail => {
        const thumbnailProps = thumbnail.props

        return thumbnailProps.find(x => x.value === propertyValue && x.name === propertyName)
      })
    } else {
      return thumbnail
    }
  }

  const booleans = properties.filter(
    property =>
      property.type === 'BOOLEAN' ||
      (property.type === 'VARIANT' &&
        Array.isArray(property.values) &&
        property.values.length === 2 &&
        property.values.includes('true') &&
        property.values.includes('false')),
  )
  const filteredProperties = properties.filter(x => !booleans.includes(x))

  return (
    <Box display="grid" gridTemplateColumns={['1fr', null, null, null, '2fr 1fr']} gridGap={5}>
      <Box
        paddingY={10}
        bg="canvas.subtle"
        borderRadius={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        minHeight="30vh"
      >
        <Box display={'flex'} justifyContent="center">
          {activeThumbnail ? (
            <img width="50%" src={activeThumbnail.url} alt={' '} />
          ) : (
            <Text color={'fg.muted'} fontSize={'small'}>
              No preview available
            </Text>
          )}
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="start"
        flexDirection="column"
        sx={{gap: 2}}
        position="sticky"
        alignSelf={'start'}
        top={9}
      >
        {booleans.map((property, index) => {
          return (
            <Box key={index} alignItems={'center'} display={'flex'} width="100%" justifyContent={'space-between'}>
              <Text fontSize={'small'} fontWeight={'bold'}>
                {property.name}
              </Text>
              <ToggleSwitch
                size="small"
                defaultChecked={property.defaultValue === 'true'}
                aria-labelledby={property.name}
                checked={previewState[property.name] === 'true'}
                onClick={() => handleClick(property.name, previewState[property.name] === 'true' ? 'false' : 'true')}
              />
            </Box>
          )
        })}
        {filteredProperties.map((property, index) => {
          return (
            <Box key={index} alignItems={'center'} display={'flex'} width="100%" justifyContent={'space-between'}>
              <Text fontSize={'small'} fontWeight={'bold'}>
                {property.name}
              </Text>
              <ActionMenu>
                <ActionMenu.Button size="small" aria-label="Select field type">
                  {previewState[property.name]}
                </ActionMenu.Button>
                <ActionMenu.Overlay align="end">
                  <ActionList selectionVariant="single">
                    {property.values.map(value => (
                      <ActionList.Item
                        key={`${property.name}-${value}`}
                        selected={value === previewState[property.name]}
                        onSelect={() => handleClick(property.name, value)}
                      >
                        {value}
                      </ActionList.Item>
                    ))}
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

import React from 'react'
import {Heading, ActionMenu, Box, ActionList} from '@primer/react'

export default function FigmaComponentExamples({variants, components}) {
  const [myState, setState] = React.useState([])

  React.useEffect(() => {
    let newArr = []

    Object.entries(variants).map(variant => {
      newArr.push(variant[1][0])
    })

    setState(newArr)
  }, [])

  const handleClick = (index, value) => {
    let newArr = [...myState]
    newArr[index] = value
    setState(newArr)
  }

  return (
    <article>
      <Heading sx={{fontSize: 4, mb: 3, mt: 4}}>Examples</Heading>
      <Box
        display="flex"
        alignItems="start"
        sx={{
          gap: 4
        }}
      >
        {Object.entries(variants).map((variant, index) => {
          let variantIndex = index

          return (
            <Box alignItems={'flex-start'} display={'flex'} flexDirection="column" sx={{gap: 1}}>
              <ActionMenu key={index}>
                <ActionMenu.Button aria-label="Select field type">
                  {variant[0]}
                  : {myState[variantIndex]}
                </ActionMenu.Button>
                <ActionMenu.Overlay>
                  <ActionList selectionVariant="single">
                    {variant[1].map((name, index) => (
                      <ActionList.Item
                        key={index}
                        selected={name === myState[variantIndex]}
                        onSelect={() => handleClick(variantIndex, name)}
                      >
                        {name}
                      </ActionList.Item>
                    ))}
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            </Box>
          )
        })}
      </Box>

      <Box
        paddingY={10}
        borderColor="border.muted"
        bg="neutral.subtle"
        borderWidth={1}
        borderRadius={10}
        marginTop={3}
        borderStyle="solid"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {Object.entries(components).map((component, index) => {
          let variantNames = component[1].name.split(',')
          let variantTypes = variantNames.map(type => {
            return type.split('=')[1]
          })
          let isActive = variantTypes.every((type, index) => {
            return type === myState[index]
          })

          return (
            isActive && (
              <Box display={'flex'} justifyContent="center" key={index}>
                <img width="50%" src={component[1].thumbnail_url} alt={component[1].name} />
              </Box>
            )
          )
        })}
      </Box>
    </article>
  )
}

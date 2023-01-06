import React from 'react'
import FigmaPropertyPreview from './FigmaPropertyPreview'
import FigmaPropertyOverview from './FigmaPropertyOverview'
import FigmaComponentExamples from './FigmaComponentExamples'
import figmaData from 'figma-library-docgen/dist/primer-web.json'

const lowerCaseFirstCharacter = ([firstLetter, ...restOfWord]) => { 
  return firstLetter.toLowerCase() + restOfWord
}

const getComponentData = (componentName, status = "STABLE") => {

  const statusOrder = {
    STABLE: 1,
    DEPRECATED: 6
  }

  const componentsArray = Object.values(figmaData.components).filter(
    component => component.name.toLowerCase() === componentName.toLowerCase()
  ).sort((a, b) => {
    if(statusOrder[a.status] > statusOrder[b.status] ) {
      return 1
    }
    return -1
  })
  // find specific component
  let component = componentsArray[0]
  // no component found
  if (!component) {
    console.error(`Component '${componentName}' not found.`)
    return {}
  }
  // change component property names
  component.properties = component.properties.map(prop => {
    prop.name = lowerCaseFirstCharacter(prop.name)
    return prop
  })
  // change component thumbnail property names
  component.thumbnails = component.thumbnails.map(thumbnail => {
    const props = Object.entries(thumbnail.props)
      .map(item => [lowerCaseFirstCharacter(item[0]), item[1]])

    thumbnail.props = Object.fromEntries(props)

    return thumbnail
  })

  return component
}

export function PropertyPreview({component, property, setProperties, column, row}) {
  const {thumbnails} = getComponentData(component)
  return (
    thumbnails ? <FigmaPropertyPreview column={column} row={row} thumbnails={thumbnails} property={property} setProperties={setProperties} /> : ''
  )
}

export function PropertyOverview({component}) {
  const {properties} = getComponentData(component)
  return properties ? <FigmaPropertyOverview properties={properties} /> : ''
}

export function Examples({component}) {
  const {thumbnails, properties} = getComponentData(component)
  const filteredProps = properties?.filter(prop => ['VARIANT', 'BOOLEAN'].includes(prop.type))
  return thumbnails ? <FigmaComponentExamples thumbnails={thumbnails} properties={filteredProps} /> : ''
}
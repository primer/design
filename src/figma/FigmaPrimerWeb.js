import React from 'react'
import FigmaPropertyPreview from './FigmaPropertyPreview'
import FigmaPropertyOverview from './FigmaPropertyOverview'
import FigmaComponentExamples from './FigmaComponentExamples'
import figmaData from 'figma-library-docgen/dist/primer-web.json'

const lowerCaseFirstCharacter = ([firstLetter, ...restOfWord]) => { 
  return firstLetter.toLowerCase() + restOfWord
}

const getComponentData = (componentName) => {
  const componentsArray = Object.values(figmaData.components)
  // find specific component
  const component = componentsArray.find(component => component.name.toLowerCase() === componentName.toLowerCase())
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

export function PropertyPreview({component, property, setProperties}) {
  const {thumbnails} = getComponentData(component)
  return (
    <FigmaPropertyPreview thumbnails={thumbnails} property={property} setProperties={setProperties} />
  )
}

export function PropertyOverview({component}) {
  const {properties} = getComponentData(component)
  return <FigmaPropertyOverview properties={properties} />
}

export function Examples({component}) {
  const {thumbnails, properties} = getComponentData(component)
  const filteredProps = properties.filter(prop => prop.type === 'VARIANT')
  return <FigmaComponentExamples thumbnails={thumbnails} properties={filteredProps} />
}
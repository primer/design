import React from 'react'
import FigmaPropertyPreview from './FigmaPropertyPreview'
import FigmaPropertyOverview from './FigmaPropertyOverview'
import FigmaComponentExamples from './FigmaComponentExamples'
import figmaData from 'figma-library-docgen/dist/primer-web.json'

export const getComponentData = (componentName) => {
  const componentsArray = Object.values(figmaData.components)
  const component = componentsArray.find(component => component.name.toLowerCase() === componentName.toLowerCase())

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
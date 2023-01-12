import React from 'react'
import FigmaPropertyPreview from './FigmaPropertyPreview'
import FigmaOverview from './FigmaOverview'
import FigmaPropertyOverview from './FigmaPropertyOverview'
import FigmaComponentExamples from './FigmaComponentExamples'
import figmaData from '@primer/figma-library-docgen/dist/primer-web.json'

const lowerCaseFirstCharacter = ([firstLetter, ...restOfWord]) => {
  return firstLetter.toLowerCase() + restOfWord
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const getComponentData = componentName => {
  const statusOrder = {
    STABLE: 1,
    DEPRECATED: 6
  }

  const componentsArray = Object.values(figmaData.components)
    .filter(component => component.name.toLowerCase() === componentName.toLowerCase())
    .sort((a, b) => {
      if (statusOrder[a.status] > statusOrder[b.status]) {
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

  component.user = component.user
  component.status = capitalizeFirstLetter(component.status)
  component.updatedAt = component.updatedAt
  component.url = component.url
  component.thumbnailUrl = component.thumbnailUrl

  // change component property names
  component.properties = component.properties.map(prop => {
    prop.name = lowerCaseFirstCharacter(prop.name)
    prop.values = prop.values.sort()
    return prop
  })
  // change component thumbnail property names
  component.thumbnails = component.thumbnails.map(thumbnail => {
    const props = Object.entries(thumbnail.props).map(item => [lowerCaseFirstCharacter(item[0]), item[1]])

    thumbnail.props = Object.fromEntries(props)

    return thumbnail
  })

  return component
}

export function PropertyPreview({component, property, setProperties, column, hideLabels, labelPosition}) {
  const {thumbnails} = getComponentData(component)
  return thumbnails ? (
    <FigmaPropertyPreview
      column={column}
      hideLabels={hideLabels}
      thumbnails={thumbnails}
      property={property}
      labelPosition={labelPosition}
      setProperties={setProperties}
    />
  ) : (
    ''
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

export function Overview({component}) {
  const {user, status, updatedAt, url, thumbnailUrl, properties} = getComponentData(component)
  return user ? (
    <FigmaOverview properties={properties} url={url} updatedAt={updatedAt} status={status} user={user} />
  ) : (
    ''
  )
}

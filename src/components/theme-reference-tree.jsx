import React, {useState} from 'react'
import {Box, Text} from '@primer/react'

export default function ThemeReferenceTree({themeData}) {
  return (
    <Box mb={4} borderWidth={1} borderStyle="solid" borderColor="border.default" borderRadius={6} p={2} style={{fontSize: "14px"}}>
      <RecursiveTree property={themeData} propertyName="theme" isRootTreeItem={true} />
    </Box>
  )
}

const isColor = strColor => {
  return /^#[a-fA-F0-9]{3,6}$/.test(strColor)
}

const getLeadingVisual = property => {
  const propertyStr = property.toString()
  if (isColor(propertyStr)) {
    return (
      <Box
        bg={`${propertyStr}`}
        width={16}
        height={16}
        borderRadius={1}
        boxShadow="inset 0px 0px 0px 1px rgba(0,0,0,0.125)"
        sx={{float: "left", marginTop: "4px", marginRight: "4px"}}
      />
    )
  } else {
    return null
  }
}

const getPropertyType = property => {
  if (Array.isArray(property)) {
    return '[...]'
  }
  if (typeof property === 'object') {
    return '{...}'
  }
  return
}

function RecursiveTree({property, propertyName, isRootTreeItem = false}) {
  const [open, setOpen] = useState(false)
  const handleToggle = (event) => setOpen(event.currentTarget.open)
  const isLeafItem = typeof property === 'number' || typeof property === 'string' || typeof property === 'boolean'

  if (isLeafItem) {
    return (
      <div style={{overflow: "hidden", marginLeft: "0.5em"}}>
        {getLeadingVisual(property)}
        <Text fontWeight="bold">{propertyName}</Text> : <Text>{property && property.toString()}</Text>
      </div>
    )
  } else if (isRootTreeItem) {
    return Object.values(property).map((childProperty, index) => (
      <RecursiveTree
        key={index}
        property={childProperty}
        propertyName={Object.getOwnPropertyNames(property)[index]}
        isRootTreeItem={false}
      />
    ))
  }
  return (
    <details style={{padding: "0.5em 0.5em 0"}} onToggle={handleToggle} open={open}>
      <summary style={{fontWeight: "bold", margin: "-0.5em -0.5em 0", padding: "0.5em"}}>
        <Text>{propertyName}</Text> {!open && <Text className="property-type-indicator" color="fg.subtle">{getPropertyType(property)}</Text>}
      </summary>
      {Object.values(property).map((childProperty, index) => (
        <div style={{marginLeft: "0.75em"}}>
          <RecursiveTree
            key={index}
            property={childProperty}
            propertyName={Object.getOwnPropertyNames(property)[index]}
            isRootTreeItem={false}
          />
        </div>
      ))}
    </details>
  )
}

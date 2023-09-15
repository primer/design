import React, { useEffect } from 'react'
import { useScript } from 'usehooks-ts'

const baseUrl = ( () => {
  if (process.env["NODE_ENV"] == "production") {
    return 'https://primer.style/view-components/lookbook/'
  } else {
    return 'http://localhost:4000/lookbook/'
  }
})()

export function LookbookEmbed({railsId}) {
  const lookbookJs = useScript('https://view-components-storybook.eastus.cloudapp.azure.com/lookbook-assets/js/lookbook.js', {
    removeOnUnmount: false
  })

  useEffect(() => {
    if (window.Lookbook) {
      window.Lookbook.initEmbeds()
    }
  }, [lookbookJs])

  return (
    <lookbook-embed
      app={baseUrl}
      preview={`${railsId}Preview`}
      scenario="*"
      panels="source"
      actions="open"
      display-option-controls="false"
    />
  )
}

import React, { useEffect } from 'react'
import { useScript } from 'usehooks-ts'

const baseUrl = ( () => {
  if (process.env["NODE_ENV"] == "production") {
    return 'https://primer.style'
  } else {
    return 'http://localhost:4000'
  }
})()

const previewPath = ( () => {
  if (process.env["NODE_ENV"] == "production") {
    return '/view-components'
  } else {
    return ''
  }
})()

export function LookbookEmbed({railsId}) {
  const lookbookJs = useScript(`${baseUrl}/lookbook-assets/js/lookbook.js`, {
    removeOnUnmount: false
  })

  useEffect(() => {
    if (window.Lookbook) {
      window.Lookbook.initEmbeds()
    }
  }, [lookbookJs])

  return (
    <lookbook-embed
      app={`${baseUrl}${previewPath}/lookbook`}
      preview={`${railsId}Preview`}
      scenario="*"
      panels="source,params,assets"
      actions="inspect"
      display-option-controls="false"
    />
  )
}

import React, { useEffect } from 'react'
import { useScript } from 'usehooks-ts'

const baseUrl = ( () => {
  if (process.env["NODE_ENV"] == "production") {
    return 'https://primer.style'
  } else {
    return 'http://localhost:4000'
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
      app={`${baseUrl}/view-components/lookbook`}
      preview={`${railsId}Preview`}
      scenario="*"
      panels="source,params,assets"
      actions="open"
      display-option-controls="false"
    />
  )
}

import React, { useEffect } from "react"

/* This component scrolls to the element that has an ID matching
 * the value of the ?anchor query parameter. It is designed to
 * allow linking to a specific part of a page. This is important
 * because web servers like IIS and Apache do not include URL
 * fragments (i.e. the part after '#') when redirecting.
 */
export default function ScrollToAnchor() {
  useEffect(() => {
    const url = new URL(window.location.href)

    // only do our thing if the URL doesn't have a hash already
    if (url.hash.length === 0) {
      const anchor = url.searchParams.get('anchor')

      if (anchor) {
        // alter the URL by converting the anchor query param into
        // a hash
        url.searchParams.delete('anchor')
        url.hash = `#${anchor}`
        window.history.pushState(null, "", url)
        document.querySelector(`#${anchor}`)?.scrollIntoView()
      }
    }
  }, [])

  return null
}

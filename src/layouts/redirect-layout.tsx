import React from 'react'
import { navigate } from 'gatsby'

export default function RedirectLayout({pageContext}) {
  if (typeof window !== "undefined") {
    navigate(pageContext.location)
  }

  return <></>
}

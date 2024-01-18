import React from 'react'
import { navigate } from 'gatsby'

export default function RedirectLayout({pageContext}) {
  navigate(pageContext.location)
  return <></>
}

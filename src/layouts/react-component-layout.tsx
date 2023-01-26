import React from 'react'
import Layout from '@primer/gatsby-theme-doctocat/src/components/layout'

export function ReactComponentLayout({children, ...props}: any) {
  return (
    <Layout {...props}>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout>
  )
}

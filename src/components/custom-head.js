import React from 'react'
import Helmet from 'react-helmet'

export default function CustomHead() {
  return (
    <Helmet>
      <meta name="ha-url" content="https://collector.githubapp.com/primer/collect" />
      <script src="https://analytics.githubassets.com/hydro-marketing.min.js"></script>
    </Helmet>
  )
}
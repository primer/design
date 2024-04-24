'use strict'

const React = require('react')
const {default: Helmet} = require('react-helmet')

exports.wrapPageElement = ({element, props}) => {
  return (
    <>
      <Helmet>
        <meta name="ha-url" content="https://collector.githubapp.com/primer/collect" />
      </Helmet>
      {element}
      <script src="https://analytics.githubassets.com/hydro-marketing.min.js" />
    </>
  )
}

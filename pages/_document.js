import React from 'react'
import Document, {Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import {extractCritical} from 'emotion-server'
import {markdown} from '@primer/components/css'
import {getAssetPath, SITE_TITLE} from '../src'

export default class MyDocument extends Document {
  static getInitialProps({renderPage}) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    return {
      ...page,
      styles: (
        <>
          <Styles id="emotion-static" css={extractCritical(page.html).css} />
          <Styles id="primer" css={markdown} />
          {sheet.getStyleElement()}
        </>
      )
    }
  }

  render() {
    const {styles} = this.props

    return (
      <html lang="en">
        <head>
          <title>{SITE_TITLE}</title>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-126681523-1" />
          <script async href={getAssetPath('analytics.js')} />
          <meta charSet="utf8" />
          <link rel="icon" href={getAssetPath('favicon.png')} />
          <link rel="apple-touch-icon" href={getAssetPath('apple-touch-icon.png')} />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="og:title" content="Primer Components" />
          <meta name="og:url" content="https://primer.style/components/" />
          <meta name="description" content="Primer components built with React.js." />
          <meta
            name="og:image"
            content="https://user-images.githubusercontent.com/586552/46702062-ca82eb80-cbef-11e8-8c0b-4a9252dc04c6.png"
          />
          {styles}
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

// XXX this tricks styled-jsx/babel out of detecting this as a <style> element
const Style = 'style'

function Styles({css, ...rest}) {
  return <Style {...rest} dangerouslySetInnerHTML={{__html: css}} />
}

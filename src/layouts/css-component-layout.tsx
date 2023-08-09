import {AccessibilityLabel, Note, StatusLabel} from '@primer/gatsby-theme-doctocat'
import SourceLink from '@primer/gatsby-theme-doctocat/src/components/source-link'
import StorybookLink from '@primer/gatsby-theme-doctocat/src/components/storybook-link'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {HEADER_HEIGHT} from '@primer/gatsby-theme-doctocat/src/components/header'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {LinkExternalIcon} from '@primer/octicons-react'
import {Box, Heading, Label, Link, Text} from '@primer/react'
import {graphql} from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {StorybookEmbed} from '../components/storybook-embed'
import {BaseLayout} from '../components/base-layout'
import {ComponentPageNav} from '../components/component-page-nav'

export const query = graphql`
  query CssComponentPageQuery($componentId: String!, $parentPath: String!) {
    sitePage(path: {eq: $parentPath}) {
      path
      context {
        frontmatter {
          title
          description
          reactId
          railsIds
          figmaId
          cssId
        }
      }
    }
`

export default function CssComponentLayout({data}) {
  const {name, status, a11yReviewed, props: componentProps, subcomponents, stories} = data.cssComponent
  const importStatement = `import {${name}} from '@primer/css${status === 'draft' ? '/drafts' : ''}'`

  return (
    "Hello, world!"
  )
}

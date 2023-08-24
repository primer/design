import React from 'react'
import { Link } from '@primer/react'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import { withPrefix } from "gatsby"
import ReactMarkdown from 'react-markdown'
import Mustache from 'mustache'
import remarkGfm from 'remark-gfm'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import { H2, H3 } from '@primer/gatsby-theme-doctocat/src/components/heading'
import { useRails } from './rails-provider'

export default function RailsMarkdown({text}) {
  const { actions: { getRailsComponentInfo }} = useRails()

  const mustacheViewContext = {
    link_to_system_arguments_docs: `[System arguments](https://primer.style/view-components/lookbook/pages/system_arguments)`,
    link_to_typography_docs: `[Typography](${withPrefix('/foundations/typography')})`,
    link_to_accessibility: `[Accessibility](${withPrefix('/guides/accessibility/accessibility-at-github')})`,
    link_to_octicons: `[Octicons](${withPrefix('/foundations/icons')})`,

    link_to_component: () => {
      return (railsId, _render) => {
        const componentInfo = getRailsComponentInfo(railsId)

        if (componentInfo) {
          return `[${componentInfo.name}](${componentInfo.urlPath})`
        } else {
          return `\`${railsId}\``
        }
      }
    }
  }

  /* @ts-ignore */
  const markdown = Mustache.render(text || "", mustacheViewContext)

  /* @ts-ignore */
  return <ReactMarkdown components={{a: Link, code: CodeWrapper, table: Table, h2: H2, h3: H3}} remarkPlugins={[remarkGfm]}>
    {markdown}
  </ReactMarkdown>
}

function CodeWrapper({node, inline, className, children, ...props}) {
  if (inline) {
    return <InlineCode {...props}>{children}</InlineCode>
  }

  /* @ts-ignore */
  return <Code {...{className, ...props}}>{children[0]}</Code>
}

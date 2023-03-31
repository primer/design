import React, { useRef } from 'react'
import { Link } from '@primer/react'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import InlineCode from '@primer/gatsby-theme-doctocat/src/components/inline-code'
import { graphql, useStaticQuery } from "gatsby"
import ReactMarkdown from 'react-markdown'
import Mustache from 'mustache'
import GithubSlugger from 'github-slugger'
import remarkGfm from 'remark-gfm'
import Table from '@primer/gatsby-theme-doctocat/src/components/table'
import { H2, H3 } from '@primer/gatsby-theme-doctocat/src/components/heading'

export default function RailsMarkdown({text, parentRailsId}) {
  const data = useStaticQuery(graphql`
    query RailsPagesQuery {
      allSitePage {
        nodes {
          path
          context {
            frontmatter {
              railsId
            }
          }
        }
      }

      allRailsComponent {
        nodes {
          railsId: fully_qualified_name
          name: component
          subcomponents {
            railsId: fully_qualified_name
            name: component
          }
        }
      }
    }
  `)

  const findPageForRailsId = (railsId) => {
    for (const page of data.allSitePage.nodes) {
      if (page.context?.frontmatter?.railsId === railsId) {
        return page
      }
    }

    return null
  }

  const findParentComponentForRailsId = (railsId, components) => {
    if (!components) return null

    for (const component of components) {
      if (component.railsId === railsId) return component

      const found = findParentComponentForRailsId(railsId, component.subcomponents)
      if (found) return component
    }

    return null
  }

  const slugger = new GithubSlugger()

  const linkToParent = (parentComponent) => {
    if (!parentComponent) return null

    const parentPage = findPageForRailsId(parentComponent.railsId)
    if (!parentPage) return null

    return `[${parentComponent.name}](${parentPage.path}/rails)`
  }

  const linkToChild = (childComponent, parentComponent) => {
    if (!parentComponent) return null

    const parentPage = findPageForRailsId(parentComponent.railsId)
    if (!parentPage) return null

    return `[${childComponent.name}](${parentPage.path}/rails#${slugger.slug(childComponent.name)})`
  }

  const mustacheViewContext = {
    link_to_system_arguments_docs: "[System arguments](/foundations/system-arguments)",
    link_to_typography_docs: "[Typography](/foundations/typography)",
    link_to_accessibility: "[Accessibility](/guides/accessibility/accessibility-at-github)",

    link_to_component: () => {
      return (railsId, _render) => {
        const parentComponent = findParentComponentForRailsId(railsId, data.allRailsComponent.nodes)

        // No parent component means the component isn't a top-level component or a subcomponent of a
        // top-level component, i.e. it's not documented in this system at all; return the ID
        // instead of a link.
        if (!parentComponent) return railsId

        // We're dealing with a top-level component, so link to the parent.
        if (parentComponent.railsId === railsId) {
          return linkToParent(parentComponent)
        }

        // Otherwise, we must be dealing with a subcomponent, either of our parent or another parent
        const childComponent = parentComponent.subcomponents.find( (sub) => sub.railsId === railsId )

        if (childComponent) {
          return linkToChild(childComponent, parentComponent)
        }

        return railsId
      }
    }
  }

  const markdown = Mustache.render(text, mustacheViewContext)

  /* @ts-ignore */
  return <ReactMarkdown components={{a: Link, code: CodeWrapper, table: Table, h2: H2, h3: H3}} remarkPlugins={[remarkGfm]}>
    {markdown}
  </ReactMarkdown>
}

function CodeWrapper({node, inline, className, children, ...props}) {
  if (inline) {
    return <InlineCode {...props}>{children}</InlineCode>
  }

  return <Code {...{className, ...props}}>{children[0]}</Code>
}

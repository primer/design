import React from 'react'
import { createContext, useContext } from 'react';
import { graphql, useStaticQuery, withPrefix } from 'gatsby'
import GithubSlugger from 'github-slugger'

const slugger = new GithubSlugger()

export type RailsComponentInfo = {
  urlPath: string
  railsId: string
  name: string
  page: any
}

export type RailsActions = {
  getRailsComponentInfo: (railsId: string) => RailsComponentInfo | null
}

export const RailsContext = createContext({actions: {} as RailsActions, data: {}})

export const useRails = () => {
  return useContext(RailsContext)
}

export const RailsProvider = ({children}) => {
  const data = useStaticQuery(graphql`
    query RailsPagesQuery {
      allSitePage {
        nodes {
          path
          context {
            frontmatter {
              railsIds
              reactId
            }
          }
        }
      }

      allRailsComponent {
        nodes {
          railsId: fully_qualified_name
          name: component
          status
          a11y_reviewed
          description

          subcomponents {
            railsId: fully_qualified_name
            name: component
            status
            a11y_reviewed
            description
          }
        }
      }
    }
  `)

  const findParentComponentForRailsId = (railsId: string, components) => {
    if (!components) return null

    for (const component of components) {
      if (component.railsId === railsId) return component

      const found = findParentComponentForRailsId(railsId, component.subcomponents)
      if (found) return component
    }

    return null
  }

  const urlToParent = (parentComponent): string | null => {
    if (!parentComponent) return null

    const parentPage = findPageForRailsId(parentComponent.railsId)
    if (!parentPage) return null

    return `${withPrefix(parentPage.path)}/rails/${parentComponent.status}`
  }

  const urlToChild = (childComponent, parentComponent): string | null => {
    if (!parentComponent) return null

    const parentPage = findPageForRailsId(parentComponent.railsId)
    if (!parentPage) return null

    return `${withPrefix(parentPage.path)}/rails/${parentComponent.status}/#${slugger.slug(childComponent.name, false)}`
  }

  const findPageForRailsId = (railsId: string) => {
    for (const page of data.allSitePage.nodes) {
      if (page.context && page.context.frontmatter) {
        const railsIds = page.context.frontmatter.railsIds

        if (railsIds && railsIds.includes(railsId)) {
          return page
        }
      }
    }

    return null
  }

  const getRailsComponentInfo = (railsId: string): RailsComponentInfo | null => {
    const parentComponent = findParentComponentForRailsId(railsId, data.allRailsComponent.nodes)

    // No parent component means the component isn't a top-level component or a subcomponent of a
    // top-level component, i.e. it's not documented in this system at all; return null.
    if (!parentComponent) return null

    // We're dealing with a top-level component, so link to the parent.
    if (parentComponent.railsId === railsId) {
      const parentUrl = urlToParent(parentComponent)

      if (parentUrl) {
        return {
          urlPath: parentUrl,
          railsId: railsId,
          name: parentComponent.name,
          page: findPageForRailsId(railsId)
        }
      } else {
        return null
      }
    }

    // Otherwise, we must be dealing with a subcomponent, either of our parent or another parent
    const childComponent = parentComponent.subcomponents.find( (sub) => sub.railsId === railsId )

    if (childComponent) {
      return {
        urlPath: urlToChild(childComponent, parentComponent)!,
        railsId: childComponent.railsId,
        name: childComponent.name,
        page: findPageForRailsId(childComponent.railsId)
      }
    }

    return null
  }

  const value = {
    actions: {
      getRailsComponentInfo: getRailsComponentInfo
    },

    data: data
  }

  return (
    <RailsContext.Provider value={value}>
      {children}
    </RailsContext.Provider>
  )
}

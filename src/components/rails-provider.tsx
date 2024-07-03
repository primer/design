import React, {PropsWithChildren} from 'react'
import { createContext, useContext } from 'react';
import { graphql, useStaticQuery, withPrefix } from 'gatsby'
import GithubSlugger from 'github-slugger'
import { latestStatusFrom } from '../status-utils'
import {Link} from '@primer/react'
import {Link as GatsbyLink} from 'gatsby'

const slugger = new GithubSlugger()

export type RailsComponentInfo = {
  urlPath: string
  railsId: string
  name: string
  page: any
  mdxPage: any
}

export type RailsActions = {
  getRailsComponentInfo: (railsId: string) => RailsComponentInfo | null
  getLatestComponentPath: (name: string) => string | null
}

export const RailsContext = createContext({actions: {} as RailsActions, data: {}})

export const useRails = () => {
  return useContext(RailsContext)
}

export const RailsProvider = ({children}) => {
  const data = useStaticQuery(graphql`
    query RailsPagesQuery {
      allMdx {
        nodes {
          slug
          frontmatter {
            railsIds
          }
        }
      }

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

  const findMdxPageForRailsId = (railsId: string) => {
    for (const page of data.allMdx.nodes) {
      if (page.frontmatter) {
        const railsIds = page.frontmatter.railsIds

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
          page: findPageForRailsId(railsId),
          mdxPage: findMdxPageForRailsId(railsId)
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
        page: findPageForRailsId(childComponent.railsId),
        mdxPage: findMdxPageForRailsId(childComponent.railsId)
      }
    }

    return null
  }

  const statusesByName = {}

  for (const railsComponent of data.allRailsComponent.nodes) {
    if (!statusesByName[railsComponent.name]) {
      statusesByName[railsComponent.name] = []
    }

    statusesByName[railsComponent.name].push(railsComponent.status)
  }

  const getLatestComponentPath = (name: string): string | null => {
    if (!statusesByName[name]) return null

    const status = latestStatusFrom(statusesByName[name]) as string
    const statusConst = status.slice(0, 1).toUpperCase() + status.slice(1)
    const railsId = `Primer::${statusConst}::${name}`
    const componentInfo = getRailsComponentInfo(railsId)
    if (!componentInfo) return null

    return `/${componentInfo.mdxPage.slug}/rails/${status}`
  }

  const value = {
    actions: {
      getRailsComponentInfo: getRailsComponentInfo,
      getLatestComponentPath: getLatestComponentPath
    },

    data: data
  }

  return (
    <RailsContext.Provider value={value}>
      {children}
    </RailsContext.Provider>
  )
}

type RailsComponentLinkProps = {
  name: string
}

export const RailsComponentLink = (props: PropsWithChildren<RailsComponentLinkProps>) => {
  const { actions: railsActions } = useRails()

  if (railsActions.getLatestComponentPath) {
    const componentPath = railsActions.getLatestComponentPath(props.name)

    if (componentPath) {
      return <Link as={GatsbyLink} to={componentPath}>{props.children}</Link>
    } else {
      return props.children
    }
  } else {
    return props.children
  }
}

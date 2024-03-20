import {graphql} from 'gatsby'
import React from 'react'
import ReactComponentPage from '../components/react-component-page'

export const query = graphql`
  query ReactComponentLayoutQuery($componentId: String!, $parentPath: String!, $status: String!) {
    ...ReactComponentInfo
  }

  fragment ReactComponentInfo on Query {
    primerReactVersion {
      version
    }

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

    allReactComponent(filter: {componentId: {eq: $componentId}}) {
      nodes {
        status
      }
    }

    reactComponent(componentId: {eq: $componentId}, status: {eq: $status}) {
      name
      status
      a11yReviewed
      stories {
        id
        code
      }
      props {
        name
        type
        description
        defaultValue
        required
        deprecated
      }
      subcomponents {
        name
        props {
          name
          type
          description
          defaultValue
          required
          deprecated
        }
      }
    }

    deprecatedMdx: mdx(frontmatter: {reactId: {eq: $componentId}, reactStatus: {eq: "deprecated"}}) {
      id
    }

    draftMdx: mdx(frontmatter: {reactId: {eq: $componentId}, reactStatus: {eq: "draft"}}) {
      id
    }
  }
`

export default function ReactComponentLayout({data}) {
  return <ReactComponentPage data={data}/>
}

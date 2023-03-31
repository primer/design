import {Box, Heading, Text} from '@primer/react'
import { HEADER_HEIGHT } from '@primer/gatsby-theme-doctocat/src/components/header'
import {graphql} from 'gatsby'
import React from 'react'
import {BaseLayout} from '../components/base-layout'
import RailsMarkdown from '../components/rails-markdown'
import TableOfContents from '@primer/gatsby-theme-doctocat/src/components/table-of-contents'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import type { Text as MDText } from 'mdast'
import GithubSlugger from 'github-slugger'

export const query = graphql`
  query SystemArgumentsPageQuery {
    railsComponent(fully_qualified_name: {eq: "Primer::BaseComponent"}) {
      descriptionMd: description_md
      argsMd: args_md
    }
  }
`

export default function SystemArgumentsLayout({data}) {
  const {descriptionMd, argsMd} = data.railsComponent

  const tableOfContents = {
    items: [] as Array<{url: string, title: string}>
  }

  const argsAst = unified().use(remarkParse).parse(argsMd);
  const slugger = new GithubSlugger()

  argsAst.children.forEach( (child) => {
    if (child.type == 'heading' && child.depth == 2) {
      const title = (child.children[0] as MDText).value
      tableOfContents.items.push({
        url: `/foundations/system-arguments#${slugger.slug(title)}`,
        title: title
      })
    }
  })

  return (
    <BaseLayout title="System arguments" description="">
      <Box sx={{maxWidth: 1200, width: '100%', p: [4, 5, 6, 7], mx: 'auto'}}>
        <Heading as="h1">System arguments</Heading>
        <Box sx={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'start', gap: 4}}>
          <Box
            sx={{
              width: 220,
              flex: '0 0 auto',
              position: 'sticky',
              top: HEADER_HEIGHT + 24,
              maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - 24px)`,
              display: ['none', null, 'block'],
            }}
          >
            <Text sx={{display: 'inline-block', fontWeight: 'bold', pl: 3}} id="toc-heading">
              On this page
            </Text>
            <TableOfContents aria-labelledby="toc-heading" items={tableOfContents.items} />
          </Box>
          <Box>
            <RailsMarkdown text={descriptionMd} parentRailsId="Primer::BaseComponent"/>
            <RailsMarkdown text={argsMd} parentRailsId="Primer::BaseComponent"/>
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  )
}

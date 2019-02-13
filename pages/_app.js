import React from 'react'
import App, {Container} from 'next/app'
import {MDXProvider} from '@mdx-js/tag'
import Octicon, {Pencil} from '@githubprimer/octicons-react'
import {repository} from '../package.json'
import * as primer from '@primer/components'
import {SideNav, Header, IndexHero, Contributors} from '../src'
import root, {populateTree} from '../src/nav'

const {BaseStyles, BorderBox, Box, Flex, Link, Text} = primer
const DocLink = props => <Link nounderline {...props} />

const components = {
  ...primer,
  Contributors,
  a: Link
}

populateTree(require.context('.', true, /\/[^_]+\.(js|md)x?$/))

export default class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let page = {}

    if (Component.getInitialProps) {
      page = await Component.getInitialProps(ctx)
    }

    return {page}
  }

  render() {
    const {pathname} = this.props.router
    const {Component, page} = this.props
    // look up the meta key in the nav tree
    const node = root.first(node => node.path === pathname)
    const meta = (node ? node.meta : null) || {}

    return (
      <BaseStyles>
        <Container>
          <Header />
          <Flex display={['block', 'block', 'flex', 'flex']} flexDirection="row-reverse">
            <Box width="100%">
              {meta.hero ? <IndexHero /> : null}
              <Box color="gray.9" maxWidth={1012} width="100%" my={6} mx="auto" px={6} className="markdown-body">
                <MDXProvider components={components}>
                  <Component {...page} />
                </MDXProvider>
                {node.model.file && (
                  <Flex is={BorderBox} justifyContent='space-between' color="gray.5" border={0} borderTop={1} my={6} pt={1}>
                    <Contributors filePath={`pages${node.model.file}`} repoPath={repository}/>
                    <Text fontSize={1}>
                      <Text mr={2}>
                        <Octicon icon={Pencil} />
                      </Text>
                      <DocLink muted href={`https://github.com/${repository}/edit/master/pages${node.model.file}`}>
                        Edit this page
                      </DocLink>{' '}
                      on GitHub
                    </Text>
                  </Flex>
                )}
              </Box>
            </Box>
            <SideNav minHeight={['auto', 'auto', '100vh']} />
          </Flex>
        </Container>
      </BaseStyles>
    )
  }
}

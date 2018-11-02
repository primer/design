import React from 'react'
import App, {Container} from 'next/app'
import {MDXProvider} from '@mdx-js/tag'
import {BaseStyles, Box, Flex, Link} from '@primer/components'
import {SideNav, Header, IndexHero} from '../src'
import {populateTree} from '../src/nav'

populateTree(require.context('.', true, /\/[^_]+\.(js|md)x?$/))

const components = {
  a: Link
}

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

    return (
      <BaseStyles>
        <Container>
          <Header />
          <Flex display={['block', 'block', 'flex', 'flex']} flexDirection="row-reverse">
            <Box width="100%">
              {pathname === '/' ? <IndexHero /> : null}
              <Box color="gray.9" maxWidth={1012} width="100%" my={6} mx="auto" px={6} className="markdown-body">
                <MDXProvider components={components}>
                  <Component {...page} />
                </MDXProvider>
              </Box>
            </Box>
            <SideNav minHeight={['auto', 'auto', '100vh']} />
          </Flex>
        </Container>
      </BaseStyles>
    )
  }
}

import React from 'react'
import App, {Container} from 'next/app'
import {MDXProvider} from '@mdx-js/tag'
import {BaseStyles, Box, Flex, Link} from '@primer/components'
import {SideNav, Header, IndexHero} from '../src'
import Index from './index.mdx'

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
    const isIndex = pathname === '/' || pathname === '/components' || pathname === '/design/'

    return (
      <BaseStyles>
        <Container>
          <Header />
          <Flex display={['block', 'block', 'flex', 'flex']} flexDirection="row-reverse">
            <Box width="100%">
              {isIndex && <IndexHero />}
              <Box color="gray.9" maxWidth={1012} width={'100%'} my={6} mx={'auto'} px={6} className="markdown-body">
                <MDXProvider components={components}>{isIndex ? <Index /> : <Component {...page} />}</MDXProvider>
              </Box>
            </Box>
            <SideNav minHeight={['auto', 'auto', '100vh']} />
          </Flex>
        </Container>
      </BaseStyles>
    )
  }
}

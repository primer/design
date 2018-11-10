import React from 'react'
import Head from 'next/head'
import App, {Container} from 'next/app'
import {MDXProvider} from '@mdx-js/tag'
import Octicon, {Pencil} from '@githubprimer/octicons-react'
import {repository} from '../package.json'
import * as primer from '@primer/components'
import {SideNav, Header, IndexHero, SITE_TITLE} from '../src'
import root, {populateTree} from '../src/nav'

const {BaseStyles, BorderBox, Box, Flex, Link, Text} = primer
const editLinkBase = `https://github.com/${repository}/edit/master/pages`

const components = {
  ...primer,
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
    const node = root.first(node => node.path === pathname) || {meta: {}, model: {}}
    const {meta, model} = node

    return (
      <BaseStyles>
        <Head>
          <title>
            {SITE_TITLE}
            {meta.displayName ? ` / ${meta.displayName}` : null}
          </title>
        </Head>
        <Container>
          <Header />
          <Flex display={['block', 'block', 'flex', 'flex']} flexDirection="row-reverse">
            <Box width="100%">
              {meta.hero ? <IndexHero /> : null}
              <Box color="gray.9" maxWidth={1012} width="100%" my={6} mx="auto" px={6} className="markdown-body">
                <MDXProvider components={components}>
                  <Component {...page} />
                </MDXProvider>
                {model.file && (
                  <BorderBox color="gray.5" border={0} borderTop={1} my={6} pt={1}>
                    <Text fontSize={1}>
                      <Text mr={2}>
                        <Octicon icon={Pencil} />
                      </Text>
                      <Link color="inherit" href={`${editLinkBase}${model.file}`}>
                        Edit this page
                      </Link>{' '}
                      on GitHub
                    </Text>
                  </BorderBox>
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

import {Box, Breadcrumbs, Button, Heading, TabNav, Text, Link} from '@primer/react'
import {Container, Head, Header, Sidebar} from '@primer/gatsby-theme-doctocat'
import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {H2, H3} from '@primer/gatsby-theme-doctocat/src/components/heading'
import Paragraph from '@primer/gatsby-theme-doctocat/src/components/paragraph'
import copy from 'copy-to-clipboard'
import download from 'downloadjs'
import {Link as GatsbyLink} from 'gatsby'
import React from 'react'
import Icon from '../components/icon'
import IconViewer from '../components/icon-viewer'
import UIExamples16 from '../components/ui-examples-16'
import UIExamples24 from '../components/ui-examples-24'
import 'svg2pdf.js'

const toPascalCase = str =>
  (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('')

export default function IconPage({pageContext}) {
  const icon = {
    name: pageContext.name,
    keywords: pageContext.keywords,
    width: pageContext.width,
    height: pageContext.height,
    path: pageContext.svgPath,
  }
  const svg = getSvg(icon)
  const [pdf, setPdf] = React.useState(null)

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      getPdf(icon).then(blob => setPdf(blob))
    }
  }, [pageContext])

  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  const heightToRailsSizeParam = (height) => {
    if (height < 16) {
      return 'xsmall'
    } else if (height < 24) {
      return 'small'
    } else {
      return 'medium'
    }
  }

  const symbolize = (str) => {
    if (/^\w+$/.test(str)) {
      return `:${str}`
    } else {
      return `:"${str}"`
    }
  }

  return (
    <Box flexDirection="column" minHeight="100vh">
      <Head title={pageContext.name} />
      <Header />
      <Box display="flex" flex="1 1 auto" flexDirection="row" css={{zIndex: 0}}>
        <Box display={['none', null, null, 'block']}>
          <Sidebar />
        </Box>
        <Container>
          <Breadcrumbs>
            <Breadcrumbs.Item as={GatsbyLink} to="/foundations/icons/">
              Octicons
            </Breadcrumbs.Item>
            <Breadcrumbs.Item as={GatsbyLink} to={`/${icon.name}-${icon.height}`} selected>
              {icon.name}
            </Breadcrumbs.Item>
          </Breadcrumbs>
          <Heading as="h1" mt={2} mb={3}>
            {icon.name}
          </Heading>
          <TabNav
            sx={{
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            {pageContext.heights.map(height => (
              <TabNav.Link
                key={height}
                as={GatsbyLink}
                to={`/foundations/icons/${icon.name}-${height}`}
                selected={height === icon.height}
              >
                {height}
                px
              </TabNav.Link>
            ))}
          </TabNav>

          <IconViewer>
            <Icon width={icon.width} height={icon.height} path={icon.path} />
          </IconViewer>

          <Box display="grid" mt={3} gridGap={3} gridTemplateColumns={[null, 'repeat(3, 1fr)']}>
            <Button
              onClick={() => {
                copy(svg)
                setCopied(true)
              }}
            >
              {copied ? 'Copied' : 'Copy SVG'}
            </Button>
            <Button onClick={() => download(svg, `${pageContext.name}.svg`, 'image/svg+xml')}>Download SVG</Button>
            <Button disabled={!pdf} onClick={() => download(pdf, `${pageContext.name}.pdf`, 'application/pdf')}>
              Download PDF
            </Button>
          </Box>

          <H2>Usage</H2>
          <Paragraph>
            You can use this icon in{' '}
            <Link href="https://github.com/primer/octicons/tree/main/lib/octicons_react">React</Link>,{' '}
            <Link href="https://github.com/primer/octicons/tree/main/lib/octicons_gem">Ruby</Link>, or{' '}
            <Link href="https://github.com/primer/octicons/tree/main/lib/octicons_jekyll">Jekyll</Link>. Here are code
            examples for each:
          </Paragraph>

          <H3>React</H3>
          <Code className="language-jsx">{`<${toPascalCase(pageContext.name)}Icon size={${icon.height}} />`}</Code>

          <H3>ViewComponent</H3>
          <Code className="language-erb">{`<%= render(Primer::Beta::Octicon.new(${symbolize(pageContext.name)}, size: ${symbolize(heightToRailsSizeParam(icon.height))})) %>`}</Code>

          <H3>Jekyll</H3>
          <Code className="language-liquid">{`{% octicon ${pageContext.name} height:${icon.height} %}`}</Code>

          <H2>UI examples</H2>
          <UIExamples
            size={icon.height}
            icon={props => <Icon width={icon.width} height={icon.height} path={icon.path} {...props} />}
          />
        </Container>
      </Box>
    </Box>
  )
}

function UIExamples({size, icon}) {
  switch (size) {
    case 16:
      return <UIExamples16 icon={icon} />
    case 24:
      return <UIExamples24 icon={icon} />
    default:
      return <Text>No examples available</Text>
  }
}

const getSvg = icon =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.width} ${icon.height}" width="${icon.width}" height="${icon.height}">${icon.path}</svg>`

const getSvgElement = icon => {
  const tempSvg = document.createElement('div')
  tempSvg.innerHTML = getSvg(icon)
  return tempSvg.querySelector('svg')
}

const getPdf = icon => {
  return import('jspdf')
    .then(jspdf => {
      const doc = new jspdf.jsPDF()
      return doc.svg(getSvgElement(icon), {
        x: 0,
        y: 0,
        width: icon.width,
        height: icon.height,
      })
    })
    .then(doc => doc.output('blob', `${icon.name}.pdf`))
}

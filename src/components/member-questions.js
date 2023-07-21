import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Text, Link, Box, Heading} from '@primer/react'

const MemberMarkdown = ({source, colorName}) => {
  const link = props => (
    <Link sx={{color: colorName}} {...props}>
      {props.children}
    </Link>
  )

  const paragraph = props => (
    <Text as="p" fontSize={3} mt={0} mb={3} {...props}>
      {props.children}
    </Text>
  )

  const trimmedSource = source.replace(/\n */g, '\n')
  return <ReactMarkdown className="markdown" children={trimmedSource} components={{a: link, p: paragraph}} />
}

const MemberInfo = ({member, colorName}) => {
  const color = colorName === 'orange' ? 'severe.fg' : 'accent.fg'

  const questionProps = {
    as: 'p',
    fontSize: 3,
    fontWeight: 'bold',
    mt: 7,
    mb: 2,
  }

  return (
    <Box flex="1">
      <header>
        <Heading>{member.name}</Heading>
        <Text sx={{color: 'fg.subtle'}}>{member.title}</Text>
        <Text sx={{color: 'fg.muted'}}>{' • '}</Text>
        <Link sx={{mt: 2, color: color, hoverColor: color, fontSize: 2}} href={`https://github.com/${member.handle}`}>
          @{member.handle}
        </Link>
      </header>
      <Text {...questionProps}>What drew you into design systems?</Text>
      <MemberMarkdown source={member.questionOne} colorName={color} />
      <Text {...questionProps}>Who have you learned from or been inspired by?</Text>
      <MemberMarkdown source={member.questionTwo} colorName={color} />
      <Text {...questionProps}>Favorite tools</Text>
      <MemberMarkdown source={member.favoriteTools} colorName={color} />
      {member.cssFeature ? (
        <>
          <Text {...questionProps}>Favorite CSS feature</Text>
          <MemberMarkdown source={member.cssFeature} colorName={color} />
        </>
      ) : null}
    </Box>
  )
}

MemberInfo.defaultProps = {
  colorName: 'accent.fg',
}

export default MemberInfo

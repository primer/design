import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Text, Heading, Link, Box, StyledOcticon} from '@primer/react'
import {MarkGithubIcon} from '@primer/octicons-react'

const MemberMarkdown = ({source, colorName}) => {
  const link = props => (
    <Link sx={{color: colorName}} {...props}>
      {props.children}
    </Link>
  )

  const trimmedSource = source.replace(/\n */g, '\n')
  return <ReactMarkdown className="markdown" children={trimmedSource} components={{a: link}} />
}

const MemberInfo = ({member, colorName}) => {
  const color = colorName === 'orange' ? 'severe.fg' : 'accent.fg'
  return (
    <Box width={[1, 1, 1, 1]} id={member.handle}>
      <Text as="p" fontSize={3} fontWeight="bold" mt={7} mb={0}>
        What drew you into design systems?
      </Text>
      <Text fontSize={3} mt={0}>
        <MemberMarkdown source={member.questionOne} colorName={color} />
      </Text>
      <Text as="p" fontSize={3} fontWeight="bold" mt={7} mb={0}>
        Who have you learned from or been inspired by?
      </Text>
      <Text fontSize={3} mt={0}>
        <MemberMarkdown source={member.questionTwo} colorName={color} />
      </Text>
      <Text as="p" fontSize={3} fontWeight="bold" mt={7} mb={0}>
        Favorite tools
      </Text>
      <Text fontSize={3} mt={0}>
        <MemberMarkdown source={member.favoriteTools} colorName={color} />
      </Text>
      {member.cssFeature ? (
        <>
          <Text as="p" fontSize={3} fontWeight="bold" mt={7} mb={0}>
            Favorite CSS feature
          </Text>
          <Text color={`${colorName}.1`} fontSize={3} mt={0}>
            <MemberMarkdown source={member.cssFeature} colorName={color} />
          </Text>
        </>
      ) : null}
    </Box>
  )
}

MemberInfo.defaultProps = {
  colorName: 'accent.fg',
}

export default MemberInfo

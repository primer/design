import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Text, Link, Box} from '@primer/react'

const MemberMarkdown = ({source, colorName}) => {
  const link = props => (
    <Link sx={{color: colorName}} {...props}>
      {props.children}
    </Link>
  )

  const paragraph = props => (
    <Text as="p" fontSize={3} mt={1} mb={3} {...props}>
      {props.children}
    </Text>
  )

  const trimmedSource = source.replace(/\n */g, '\n')
  return <ReactMarkdown className="markdown" children={trimmedSource} components={{a: link, p: paragraph}} />
}

const MemberInfo = ({member, colorName}) => {
  const color = colorName === 'orange' ? 'severe.fg' : 'accent.fg'
  return (
    <Box id={member.handle} mt={5}>
      <Text as="p" fontSize={3} fontWeight="bold" mt={7} mb={0}>
        What drew you into design systems?
      </Text>
      <MemberMarkdown source={member.questionOne} colorName={color} />
      <Text as="p" fontSize={3} fontWeight="bold" mt={7} mb={0}>
        Who have you learned from or been inspired by?
      </Text>
      <MemberMarkdown source={member.questionTwo} colorName={color} />
      <Text as="p" fontSize={3} fontWeight="bold" mt={7} mb={0}>
        Favorite tools
      </Text>
      <MemberMarkdown source={member.favoriteTools} colorName={color} />
      {member.cssFeature ? (
        <>
          <Text as="p" fontSize={3} fontWeight="bold" mt={7} mb={0}>
            Favorite CSS feature
          </Text>
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

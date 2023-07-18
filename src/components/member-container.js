import React, {useState} from 'react'
import {Box, Heading, Link, Text} from '@primer/react'
import MemberQuestions from './member-questions'
import AvatarShape from './avatar-shape'

export default function Member(props) {
  const [hover, setHover] = useState(false)

  const {member, isOdd, shape, ...rest} = props
  const colorName = member.color || 'blue'
  const color = colorName === 'orange' ? 'severe.fg' : 'accent.fg'
  const avatarImage = hover ? member.gif : member.avatar

  return (
    <Box
      display="flex"
      pb={12}
      justifyContent="flex-end"
      alignItems={['center', 'center', 'center', 'initial', 'initial']}
      flexDirection="column"
      as="article"
      id={member.handle}
    >
      <header style={{textAlign: 'center'}}>
        <AvatarShape
          shape={shape}
          src={avatarImage}
          bg={color}
          hover={hover}
          name={member.name}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        />
        <Heading>{member.name}</Heading>
        <Text sx={{color: 'fg.subtle'}}>{member.title}</Text>
        <Text sx={{color: 'fg.muted'}}>{' • '}</Text>
        <Link sx={{mt: 2, color: color, hoverColor: color, fontSize: 2}} href={`https://github.com/${member.handle}`}>
          @{member.handle}
        </Link>
      </header>
      <MemberQuestions member={member} colorName={colorName} />
    </Box>
  )
}

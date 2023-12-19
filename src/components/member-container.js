import React, {useState} from 'react'
import {Box} from '@primer/react'
import MemberQuestions from './member-questions'
import AvatarShape from './avatar-shape'

const direction = isOdd =>
  isOdd
    ? ['column-reverse', 'column-reverse', 'column-reverse', 'row-reverse', 'row-reverse']
    : ['column-reverse', 'column-reverse', 'column-reverse', 'row', 'row']

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
      flexDirection={direction(isOdd)}
      as="article"
      id={member.handle}
      sx={{gap: [0, 0, 0, 8, 8]}}
    >
      <MemberQuestions member={member} colorName={colorName} />
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
    </Box>
  )
}

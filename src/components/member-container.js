import React, {useState} from 'react'
import {Box} from '@primer/react'
import MemberQuestions from './member-questions'
import AvatarShape from './avatar-shape'
import {ReactComponent as DotsSVG} from '../images/dots.svg'

const Dots = ({shape}) => {
  const css = {
    position: 'absolute',
    height: '92px',
    width: '168px',
  }
  return <DotsSVG shape={shape} style={Object.assign(css, shapeStyles[shape])} />
}

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
    >
      <MemberQuestions member={member} colorName={colorName} />
      <Box mb={[6, 8, 8, 0, 0]} style={{flexShrink: 0, position: 'relative'}}>
        <Box
          sx={{color: color}}
          display={'flex'}
          mr={isOdd ? [0, 0, 0, 12, 12] : 0}
          ml={isOdd ? 0 : [0, 0, 12, 12, 12]}
        >
          <Dots shape={shape} />
          <AvatarShape
            shape={shape}
            src={avatarImage}
            bg={color}
            hover={hover}
            name={member.name}
            href={`https://github.com/${member.handle}`}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          />
        </Box>
      </Box>
    </Box>
  )
}

const shapeStyles = {
  hexagon: {
    top: '230px',
    left: '130px',
    transform: 'rotate(180deg)',
  },
  square: {
    top: '250px',
    left: '75px',
  },
  circle: {
    top: '236px',
    left: '181px',
    transform: 'rotate(180deg)',
  },
  diamond: {
    top: '245px',
    left: '65px',
  },
}

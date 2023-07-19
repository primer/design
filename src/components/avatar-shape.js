import React from 'react'
import styled from 'styled-components'
import {Box} from '@primer/react'
import PropTypes from 'prop-types'

const Image = styled('img')`
  object-fit: cover;
  width: 280px;
  height: 280px;
  overflow: hidden;
  border-radius: 8px;
  filter: grayscale(1);
  ${({$hover}) => $hover && `filter: grayscale(0);`}
`

const AvatarShape = props => (
  <Box
    sx={{
      position: ['relative', 'relative', 'relative', 'sticky', 'sticky'],
      top: [0, 0, 0, 10, 10],
      display: 'flex',
      alignSelf: ['initial', 'initial', 'initial', 'start', 'start'],
      marginBottom: [5, 5, 5, 0, 0],
    }}
  >
    <Image src={props.src} $hover={props.hover} alt={props.name} {...props} />
  </Box>
)

AvatarShape.defaultProps = {
  hover: false,
}

AvatarShape.propTypes = {
  hover: PropTypes.bool,
}

export default AvatarShape

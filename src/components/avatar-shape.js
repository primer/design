import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Image = styled('img')`
  object-fit: cover;
  width: 280px;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  filter: grayscale(1);
  margin-bottom: 16px;
  ${({$hover}) => $hover && `filter: grayscale(0);`}
`

const AvatarShape = props => <Image src={props.src} $hover={props.hover} alt={props.name} {...props} />

AvatarShape.defaultProps = {
  hover: false,
}

AvatarShape.propTypes = {
  hover: PropTypes.bool,
}

export default AvatarShape

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TRANSITION_STYLE = '0.8s ease'

const Image = styled('img')`
  object-fit: cover;
  width: 240px;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 6px;
  transition: filter ${TRANSITION_STYLE};
  filter: grayscale(1);
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

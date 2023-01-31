import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Box, Link, themeGet} from '@primer/react'
import {color} from 'styled-system'
import {ReactComponent as Circle} from '../images/svg/circle.svg'
import {ReactComponent as Hexagon} from '../images/svg/hexagon.svg'
import {ReactComponent as Square} from '../images/svg/square.svg'
import {ReactComponent as Diamond} from '../images/svg/diamond.svg'

const TRANSITION_STYLE = '0.8s ease'

const Shape = styled(({className, shape}) => {
  const shapes = {
    hexagon: Hexagon,
    circle: Circle,
    square: Square,
    diamond: Diamond,
  }
  const Tag = shapes[shape]
  return <Tag className={className} />
})`
  position: relative;
  width: 100%;
  height: auto;
  fill: none;
`

const Image = styled('img')`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: filter ${TRANSITION_STYLE};
  filter: grayscale(1);
  ${({$hover}) => $hover && `filter: grayscale(0);`}
`

const A = styled(Box)`
  position: relative;
  display: inline-block;
  clip-path: url('#clip-${props => props.shape}');
  &:after {
    content: '';
    transition: opacity ${TRANSITION_STYLE};
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top left, ${themeGet('colors.blue.4')}, transparent),
      radial-gradient(ellipse at bottom right, ${themeGet('colors.orange.4')}, transparent),
      linear-gradient(to right, ${themeGet('colors.orange.5')} 50%, transparent),
      linear-gradient(to left, ${themeGet('colors.blue.6')} 50%, transparent);
    mix-blend-mode: multiply;
    opacity: 0;
  }
  &:hover:after {
    opacity: 1;
  }
`

const ShapeOutline = styled(Link)`
  padding: 2px;
  position: relative;
  background: transparent !important;
  display: block;
  &:before {
    content: '';
    clip-path: url('#clip-${props => props.shape}');
    ${color};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

const AvatarShape = props => (
  <ShapeOutline shape={props.shape} bg={props.bg} {...props}>
    <A className={props.className} shape={props.shape}>
      <Image src={props.src} $hover={props.hover} />
      <Shape shape={props.shape} />
    </A>
  </ShapeOutline>
)

AvatarShape.defaultProps = {
  bg: 'blue.4',
  hover: false,
}

AvatarShape.propTypes = {
  shape: PropTypes.oneOf(['hexagon', 'square', 'circle', 'diamond']),
  hover: PropTypes.bool,
}

export default AvatarShape

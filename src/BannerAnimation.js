import React from 'react'
import dynamic from 'next/dynamic'
import animation from './BannerAnimation.json'

const ReactBodymovin = dynamic(() => import('react-bodymovin'), {
  ssr: false
})

const bodymovinOptions = {
  loop: true,
  autoplay: true,
  prerender: true,
  animationData: animation
}

const BannerAnimation = props => <ReactBodymovin options={bodymovinOptions} {...props} />

export default BannerAnimation

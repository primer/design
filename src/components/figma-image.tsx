import React from 'react'
import styled from 'styled-components'
import {parseFigmaNodeUrl} from '@primer/figma-images/src/utils'
import {LinkButton, StyledOcticon} from '@primer/react'
import {PencilIcon} from '@primer/octicons-react'

type FigmaImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  caption?: string
}

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
`

const StyledLinkButton = styled(LinkButton)`
  position: absolute;
  top: 16px;
  right: 16px;
  opacity: 0;
`

const StyledFigure = styled.figure`
  position: relative;
  width: 100%;
  margin: 0;

  &:hover ${StyledLinkButton} {
    opacity: 1;
  }
`

const StyledCaption = styled.figcaption``

const FigmaImageDir = '/images/figma'
export const FigmaImage: React.FC<FigmaImageProps> = ({src, caption, ...props}) => {
  // check for missing prop
  if (src === undefined) throw new Error('src is required on FigmaImage component')
  // get real image url
  const {nodeId, fileId} = parseFigmaNodeUrl(src)
  const imagePath = `${FigmaImageDir}/${fileId}-${nodeId}.png`
  // return image component
  return (
    <StyledFigure className="FigmaImage">
      <StyledImg src={imagePath} {...props} />
      <StyledLinkButton variant="default" href={src} target="_blank">
        <StyledOcticon icon={PencilIcon} sx={{mr: 2}} size="small" />
        Edit in Figma
      </StyledLinkButton>
      {caption && <StyledCaption>{caption}</StyledCaption>}
    </StyledFigure>
  )
}

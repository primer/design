import React from 'react';
import {parseFigmaNodeUrl} from '@primer/figma-images/src/utils';
import { Link, StyledOcticon } from '@primer/react';
import {PencilIcon} from '@primer/octicons-react'

type FigmaImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  caption?: string
}

const cssStyles = {
  width: "100%",
  margin: "0",
  "& img": {
    maxWidth: "100%"
  }
}

const FigmaImageDir = '/images/figma';

export const FigmaImage: React.FC<FigmaImageProps> = ({src, caption, ...props}) => {
  // check for missing prop
  if(src === undefined) throw new Error("src is required on FigmaImage component");
  // get real image url
  const {nodeId, fileId} = parseFigmaNodeUrl(src);
  const imagePath = `${FigmaImageDir}/${fileId}-${nodeId}.png`
  // return image component
  return (<figure className="FigmaImage" style={cssStyles}>
    <img src={imagePath} {...props}/>
    <figcaption>
      {caption}
       <Link sx={{fontSize: '12px'}} className="link" href={src}><StyledOcticon icon={PencilIcon} sx={{mr: 2}} size="small"/>Edit in Figma</Link>
    </figcaption>
  </figure>)
}
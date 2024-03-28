import React from 'react'
import CustomVideoPlayer from '../../CustomVideoPlayer'
import KeyboardKey from '../../KeyboardKey'
import ImageBox from './components/ImageBox'
import StorybookEmbed from '../../components/storybook-embed'
import {ChildPages} from '../../components/child-pages'
import DoctocatTable from '@primer/gatsby-theme-doctocat/src/components/table'
import {Box} from '@primer/react'

// Override the default table component with a custom one that supports overflow
// TODO: Upsream this to @primer/gatsby-theme-doctocat
const Table = props => (
  <Box sx={{overflow: 'auto'}}>
    <DoctocatTable {...props} />
  </Box>
)

export default {table: Table, CustomVideoPlayer, ImageBox, KeyboardKey, StorybookEmbed, ChildPages}

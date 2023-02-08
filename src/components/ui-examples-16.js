import {
  Box,
  Button,
  Text,
  Timeline,
  UnderlineNav
} from '@primer/react'
import React from 'react'

export default function UIExamples16({icon: Icon}) {
  return (
    <Box borderColor="border.default" borderWidth={1} borderStyle="solid" borderRadius={6} p={3}>
      <Box display={"grid"} gridGap={3} sx={{justifyItems: 'start'}}>
        <Text>
          <Icon />
          <Text ml={2} contentEditable>
            Inline text
          </Text>
        </Text>
        <Text>
          <Icon />
          <Text ml={2} fontSize={1} contentEditable>
            Small inline text
          </Text>
        </Text>
        <Timeline>
          <Timeline.Item>
            <Timeline.Badge>
              <Icon />
            </Timeline.Badge>
            <Timeline.Body>
              <Text color="text.gray.8" contentEditable spellCheck="false">
                Monalisa created one hot potato
              </Text>
            </Timeline.Body>
          </Timeline.Item>
        </Timeline>
        <Box display={"flex"} flexWrap={'wrap'} sx={{gap: 2}}>
          <Button>
            <Icon />
            <Text ml={2} contentEditable>
              Button
            </Text>
          </Button>
          <Button variant="primary">
            <Icon />
            <Text ml={2} contentEditable>
              Button
            </Text>
          </Button>
          <Button variant="danger">
            <Icon />
            <Text ml={2} contentEditable>
              Button
            </Text>
          </Button>
          <Button variant="outline">
            <Icon />
            <Text ml={2} contentEditable>
              Button
            </Text>
          </Button>
        </Box>
        <UnderlineNav sx={{width: '100%'}}>
          <UnderlineNav.Link href="#" selected onClick={event => event.preventDefault()}>
            <Icon />
            <Text ml={2} contentEditable>
              Home
            </Text>
          </UnderlineNav.Link>
        </UnderlineNav>
      </Box>
    </Box>
  )
}

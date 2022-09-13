import React, {useState} from 'react'
import {ActionMenu, ActionList, Link, Box} from '@primer/react'

const baseUrls = {
  react: 'https://primer.style/react/storybook/',
  css: 'https://primer.style/css/storybook/'
}

export function StorybookEmbed({framework = 'react', componentId, stories}) {
  const [colorScheme, setColorScheme] = useState('light')
  const base = baseUrls[framework]
  const [story, setStory] = React.useState(Object.keys(stories)[0])
  const options = {
    id: `${componentId}--${story}`,
    shortcuts: false,
    singleStory: true,
    panel: false,
    globals: `colorScheme:${colorScheme}`,
    viewMode: 'story'
  }

  const url = `${base}/iframe.html?${new URLSearchParams(options)}`

  return (
    <>
      <Box
        backgroundColor={'canvas.inset'}
        borderRadius="2"
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        borderColor={'border.default'}
        borderStyle="solid"
        borderWidth={1}
        borderBottomWidth={0}
        display="flex"
        alignItems="center"
        marginBottom={0}
        padding={3}
        sx={{
          gap: 2
        }}
      >
        <ActionMenu>
          <ActionMenu.Button>Demo: {stories[story].name}</ActionMenu.Button>

          <ActionMenu.Overlay>
            <ActionList selectionVariant="single">
              {Object.entries(stories).map(([key, {name}]) => (
                <ActionList.Item key={key} selected={key === story} onSelect={() => setStory(key)}>
                  {name}
                </ActionList.Item>
              ))}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
        <ActionMenu>
          <ActionMenu.Button>Theme: {colorScheme}</ActionMenu.Button>

          <ActionMenu.Overlay>
            <ActionList selectionVariant="single">
              <ActionList.Item selected={colorScheme === 'light'} onSelect={() => setColorScheme('light')}>
                light
              </ActionList.Item>
              <ActionList.Item
                selected={colorScheme === 'light_high_contrast'}
                onSelect={() => setColorScheme('light_high_contrast')}
              >
                light_high_contrast
              </ActionList.Item>
              <ActionList.Item
                selected={colorScheme === 'light_colorblind'}
                onSelect={() => setColorScheme('light_colorblind')}
              >
                light_colorblind
              </ActionList.Item>
              <ActionList.Item selected={colorScheme === 'dark'} onSelect={() => setColorScheme('dark')}>
                dark
              </ActionList.Item>
              <ActionList.Item selected={colorScheme === 'dark_dimmed'} onSelect={() => setColorScheme('dark_dimmed')}>
                dark_dimmed
              </ActionList.Item>
              <ActionList.Item
                selected={colorScheme === 'dark_high_contrast'}
                onSelect={() => setColorScheme('dark_high_contrast')}
              >
                dark_high_contrast
              </ActionList.Item>
              <ActionList.Item
                selected={colorScheme === 'dark_colorblind'}
                onSelect={() => setColorScheme('dark_colorblind')}
              >
                dark_colorblind
              </ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
        <Link
          href={`${base}?path=/story/${componentId}--${story}&${new URLSearchParams({globals: options.globals})}`}
          target="_blank"
          sx={{marginLeft: 'auto'}}
        >
          View in Storybook
        </Link>
      </Box>
      <Box
        as="iframe"
        borderRadius="2"
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        borderColor={'border.default'}
        borderStyle="solid"
        borderWidth={1}
        title="storybook-preview"
        id="storybook-preview-iframe"
        src={url}
        width="100%"
        height="260"
      ></Box>
    </>
  )
}

export default StorybookEmbed

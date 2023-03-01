import React from 'react'
import {ActionMenu, ActionList, Link, Box, ThemeProvider, theme} from '@primer/react'
import {LinkExternalIcon} from '@primer/octicons-react'
import {sentenceCase} from 'change-case'

const baseUrls = {
  react: 'https://primer.style/react/storybook',
  css: 'https://primer.style/css/storybook',
}

const colorSchemes = Object.keys(theme.colorSchemes)

type StorybookEmbedProps = {
  framework?: 'react' | 'css'
  stories: Array<{id: string}>
  height?: string | number
}

export function StorybookEmbed({framework = 'react', stories, height = 250}: StorybookEmbedProps) {
  const baseUrl = baseUrls[framework]
  const [selectedColorScheme, setSelectedColorScheme] = React.useState(colorSchemes[0])
  const [selectedStory, setSelectedStory] = React.useState(stories[0])
  const options = {
    id: selectedStory.id,
    globals: framework === 'css' ? `theme:${selectedColorScheme}` : `colorScheme:${selectedColorScheme}`,
  }
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const iframeUrl = `${baseUrl}/iframe.html?${new URLSearchParams(options)}`
  const storybookUrl = `${baseUrl}?path=/story/${selectedStory.id}&${new URLSearchParams({
    globals: options.globals,
  })}`

  // Prevent iframe from affecting browser history
  // Reference: https://stackoverflow.com/questions/27341498/how-to-prevent-iframe-affecting-browser-history
  React.useEffect(() => {
    iframeRef.current?.contentWindow?.location.replace(iframeUrl)
  }, [iframeUrl])

  return (
    // @ts-ignore
    <ThemeProvider>
      <div>
        <Box
          backgroundColor={'canvas.inset'}
          borderRadius={2}
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          borderColor={'border.default'}
          borderStyle="solid"
          borderWidth={1}
          borderBottomWidth={0}
          display="flex"
          alignItems="center"
          marginBottom={0}
          padding={2}
          sx={{
            gap: 3,
            justifyContent: 'space-between',
            overflow: 'auto',
          }}
        >
          <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
            {stories.length > 1 ? (
              <ActionMenu>
                <ActionMenu.Button>Demo: {getStoryName(selectedStory.id)}</ActionMenu.Button>
                <ActionMenu.Overlay width="medium">
                  <ActionList selectionVariant="single">
                    {stories.map(story => (
                      <ActionList.Item
                        key={story.id}
                        selected={story.id === selectedStory.id}
                        onSelect={() => setSelectedStory(story)}
                      >
                        {getStoryName(story.id)}
                      </ActionList.Item>
                    ))}
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            ) : null}

            <ActionMenu>
              <ActionMenu.Button>Theme: {sentenceCase(selectedColorScheme)}</ActionMenu.Button>
              <ActionMenu.Overlay>
                <ActionList selectionVariant="single">
                  {colorSchemes.map(colorScheme => (
                    <ActionList.Item
                      key={colorScheme}
                      selected={colorScheme === selectedColorScheme}
                      onSelect={() => setSelectedColorScheme(colorScheme)}
                    >
                      {sentenceCase(colorScheme)}
                    </ActionList.Item>
                  ))}
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </Box>

          <Link
            href={storybookUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mr: 2,
              fontSize: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              whiteSpace: 'nowrap',
            }}
          >
            View in Storybook
            <LinkExternalIcon />
          </Link>
        </Box>
        <Box
          as="iframe"
          ref={iframeRef}
          sx={{
            mb: 3,
            borderRadius: 2,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderColor: 'border.default',
            borderStyle: 'solid',
            borderWidth: 1,
          }}
          title="storybook-preview"
          id="storybook-preview-iframe"
          width="100%"
          height={height}
        />
      </div>
    </ThemeProvider>
  )
}

function getStoryName(id: string) {
  const parts = id.split('--')
  return sentenceCase(parts[parts.length - 1])
}

export default StorybookEmbed

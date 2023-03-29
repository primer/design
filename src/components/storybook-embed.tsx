import Code from '@primer/gatsby-theme-doctocat/src/components/code'
import {FoldIcon, LinkExternalIcon, UnfoldIcon} from '@primer/octicons-react'
import {ActionList, ActionMenu, Box, Button, Link, theme, ThemeProvider} from '@primer/react'
import {sentenceCase} from 'change-case'
import React from 'react'

const baseUrls = {
  react: 'https://primer.style/react/storybook',
  css: 'https://primer.style/css/storybook',
}

const colorSchemes = Object.keys(theme.colorSchemes)

type StorybookEmbedProps = {
  framework?: 'react' | 'css'
  baseUrl?: string
  stories: Array<{id: string; code?: string}>
  height?: string | number
}

export function StorybookEmbed({
  framework,
  baseUrl = baseUrls[framework || ''],
  stories,
  height = 250,
}: StorybookEmbedProps) {
  const [selectedColorScheme, setSelectedColorScheme] = React.useState(colorSchemes[0])
  const [selectedStory, setSelectedStory] = React.useState(stories[0])
  const options = {
    id: selectedStory.id,
    globals: framework === 'react' ? `colorScheme:${selectedColorScheme}` : `theme:${selectedColorScheme}`,
  }
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const iframeUrl = `${baseUrl}/iframe.html?${new URLSearchParams(options)}`
  const storybookUrl = `${baseUrl}?path=/story/${selectedStory.id}&${new URLSearchParams({
    globals: options.globals,
  })}`
  const [isShowingCode, setIsShowingCode] = React.useState(false)

  // Prevent iframe from affecting browser history
  // Reference: https://stackoverflow.com/questions/27341498/how-to-prevent-iframe-affecting-browser-history
  React.useEffect(() => {
    iframeRef.current?.contentWindow?.location.replace(iframeUrl)
  }, [iframeUrl])

  return (
    // @ts-ignore
    <ThemeProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 3,
          borderRadius: 2,
          borderColor: 'border.default',
          borderStyle: 'solid',
          borderWidth: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          backgroundColor={'canvas.inset'}
          borderColor={'border.default'}
          borderStyle="solid"
          borderWidth={0}
          borderBottomWidth={1}
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
            {selectedStory.code ? (
              <Button
                aria-expanded={isShowingCode}
                aria-controls={`${selectedStory.id}-code`}
                onClick={() => setIsShowingCode(!isShowingCode)}
                leadingIcon={isShowingCode ? FoldIcon : UnfoldIcon}
              >
                {isShowingCode ? 'Hide code' : 'Show code'}
              </Button>
            ) : null}
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
          sx={{border: 0, margin: 0}}
          ref={iframeRef}
          title="storybook-preview"
          id="storybook-preview-iframe"
          width="100%"
          height={height}
        />
        {selectedStory.code && isShowingCode ? (
          <Box
            id={`${selectedStory.id}-code`}
            sx={{
              pre: {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                margin: 0,
              },
            }}
          >
            {/* @ts-ignore */}
            <Code className="language-jsx">{selectedStory.code}</Code>
          </Box>
        ) : null}
      </Box>
    </ThemeProvider>
  )
}

function getStoryName(id: string) {
  const parts = id.split('--')
  return sentenceCase(parts[parts.length - 1])
}

export default StorybookEmbed

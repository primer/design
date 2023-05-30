import React from 'react'
import {ActionMenu, ActionList, Link, Box, ThemeProvider} from '@primer/react'
import {LinkExternalIcon} from '@primer/octicons-react'

const baseUrl = ( () => {
  if (process.env["NODE_ENV"] == "production") {
    return 'https://primer.style/view-components'
  } else {
    return 'http://localhost:4000'
  }
})()

const colorSchemes = [
  {id: "light", name: "Light default"},
  {id: "light_colorblind", name: "Light colorblind"},
  {id: "light_high_contrast", name: "Light high contrast"},
  {id: "dark", name: "Dark default"},
  {id: "dark_dimmed", name: "Dark Dimmed"},
  {id: "dark_high_contrast", name: "Dark high contrast"},
  {id: "dark_colorblind", name: "Dark colorblind"},
]

type LookbookEmbedProps = {
  previews: Array<{name: string, preview_path: string, inspect_path: string}>,
  height?: string | number
}

export function LookbookEmbed({previews, height = 250}: LookbookEmbedProps) {
  const [selectedColorScheme, setSelectedColorScheme] = React.useState(colorSchemes[0])
  const [selectedPreview, setSelectedPreview] = React.useState(previews[0])
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const iframeUrl = `${baseUrl}/lookbook/preview/${selectedPreview.preview_path}?${new URLSearchParams({
    _display: JSON.stringify({theme: selectedColorScheme.id}),
  })}`
  const inspectUrl = `${baseUrl}/lookbook/inspect/${selectedPreview.preview_path}?${new URLSearchParams({
    _display: JSON.stringify({'theme': selectedColorScheme.id}),
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
            gap: 2,
          }}
        >
          {previews.length > 1 ? (
            <ActionMenu>
              <ActionMenu.Button>Demo: {selectedPreview.name}</ActionMenu.Button>
              <ActionMenu.Overlay width="medium">
                <ActionList selectionVariant="single">
                  {previews.map(preview => (
                    <ActionList.Item
                      key={preview.name}
                      selected={preview.name === selectedPreview.name}
                      onSelect={() => setSelectedPreview(preview)}
                    >
                      {preview.name}
                    </ActionList.Item>
                  ))}
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          ) : null}

          <ActionMenu>
            <ActionMenu.Button>Theme: {selectedColorScheme.name}</ActionMenu.Button>
            <ActionMenu.Overlay>
              <ActionList selectionVariant="single">
                {colorSchemes.map(colorScheme => (
                  <ActionList.Item
                    key={colorScheme.id}
                    selected={colorScheme.id === selectedColorScheme.id}
                    onSelect={() => setSelectedColorScheme(colorScheme)}
                  >
                    {colorScheme.name}
                  </ActionList.Item>
                ))}
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>

          <Link
            href={inspectUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mr: 2,
              ml: 'auto',
              fontSize: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            View in Lookbook
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
          title="lookbook-preview"
          id="lookbook-preview-iframe"
          width="100%"
          height={height}
        />
      </div>
    </ThemeProvider>
  )
}
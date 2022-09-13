import React, {useState} from 'react'
import {ActionMenu} from '@primer/react'

export default function StoryMenu() {
  const [lightMode, setLightMode] = useState(false)

  const link = document.getElementById('select-story').value
  document.getElementById('storybook-preview-iframe').src = link + '&shortcuts=false&singleStory=true&showPanel=false'

  return (
    <ActionMenu>
      <ActionMenu.Button>Menu</ActionMenu.Button>

      <ActionMenu.Overlay>
        <ActionList>
          <ActionList.Item onSelect={() => setLightMode(prevMode => !prevMode)}>Default</ActionList.Item>
          <ActionList.Item>Primary</ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
    // src={lightMode ? '/media/cat1.jpg' : '/media/cat3.jpg'}
  )
}

// &globals=theme:light_high_contrast
// &globals=theme:light_colorblind
// &globals=theme:dark
// &globals=theme:dark_dimmed
// &globals=theme:dark_high_contrast
// &globals=theme:dark_colorblind

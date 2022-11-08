# ActionBar
Type: Regular
[React](#) | [Rails](#) | [Figma](https://www.figma.com/file/GCvY3Qv8czRgZgvl1dG6lp/Primer-Web?node-id=17042%3A65285)

## Overview

### Description
An action bar contains a collection of horizontally aligned icon buttons.

### Usage
Use an action bar to render multiple icon buttons in a row. Buttons can be split into groups by adding a divider. When there is not enough space, buttons that don’t fit will be added to an overflow menu.

### Anatomy

#### Buttons
- An action bar should only contain icon buttons with the invisible variant (no border/background).
- Use only invisible icon buttons in an action bar.
- Don’t use other variants or components in an action bar.

##### Button states
	- Buttons in action bars are solely used for triggering actions. Consider using a [segmented control](~https://primer.style/design/components/segmented-control~) when a button should have a selected state.
	- Buttons in action bars have a hover and pressed state, and a focused state when using a keyboard to navigate.
	- Don’t add a selected state or any other information like a notification dot or a counter.

#### Dividers
- Dividers can be added to visually group related buttons.
- Use a divider between buttons.
- Don’t use a divider at the beginning or end of the action bar.

#### Overflow menu
When the buttons don’t fit in the available space, an overflow button (“kebab” icon) is added at the end of the action bar signaling that there are more actions available. Clicking on the overflow button opens a menu with the remaining actions that didn’t fit.
- Sorting
	- Buttons that don’t fit are added to the top of the menu. This means that the last button in the action bar will also be the last button when inside the menu.
	- Demo
	 - Overflow button appears when there is not enough space and resizing the action bar updates the overflow menu.

#### Tooltips
- When hovering over a button, a tooltip will appear that describes the action.
- Describe what action will be taken when clicking on the button.
- Don’t use a tooltip in action bars to convey a current state.

### Best practices
#### Spacing
	- Make sure to add extra spacing around the action bar.
	- Extra padding of 8px is added when nesting an action bar in a box component.
	- Avoid having the action bar touch something else. Even though the action bar buttons have no borders in their resting state, when hovering/pressing a button it will show a background color.

### Options
#### Size
Action bars can have 3 different sizes:
	- Small (28px)
	- Medium (32px) (default)
	- Large (40px)

### Layout
Action bars can be used inline next to other content or also full width taking up the entire space.

## Related Components
- [ActionList](~https://primer.style/design/components/action-list~)

## Accessibility


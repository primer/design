# Action bar
Type: Regular

[React](#) | [Rails](#) | [Figma](https://www.figma.com/file/GCvY3Qv8czRgZgvl1dG6lp/Primer-Web?node-id=17042%3A65285)

## Overview

### Description
An action bar contains a collection of horizontally aligned icon buttons.

### Usage
Use an action bar to render multiple icon buttons in a row. Buttons can be split into groups by adding a divider. When there is not enough space, buttons that don’t fit will be added to an overflow menu.

### Anatomy

![image](https://user-images.githubusercontent.com/586552/200724198-39defdb1-d653-469d-b875-f6f90b7d71a0.png)

### Best practices
#### Buttons
An action bar should only contain icon buttons with the invisible variant (no border/background).

`DO` Use only invisible icon buttons in an action bar
![image](https://user-images.githubusercontent.com/586552/200722583-48b3f80e-6832-480c-a916-ae48401c3990.png)
 
`DON'T` Don't use other variants or components in an action bar.
![image](https://user-images.githubusercontent.com/378023/193506488-44543352-f513-469e-8783-5d1cc7f44eaf.png)
 
#### Button states
Buttons in action bars are solely used for triggering actions. Consider using a [segmented control](~https://primer.style/design/components/segmented-control~) when a button should have a selected state.
 
`DO` Buttons in action bars should have a hover and pressed state, and a focused state when using a keyboard to navigate.
![image](https://user-images.githubusercontent.com/586552/200724597-b4431ab8-dcca-4511-b399-4bab9775d4bb.png)

`DON'T` Don't add a selected state or any other information like a notification dot or a counter.
![image](https://user-images.githubusercontent.com/586552/200724641-25cfa774-0fae-4ea1-860c-529322c40e1b.png)

#### Dividers
Dividers can be added to visually group related buttons.

`DO` Use a divider between buttons.
![image](https://user-images.githubusercontent.com/586552/200728895-327e1144-951e-4363-ba60-658b0b524d26.png)

`DON'T` Don’t use a divider at the beginning or end of the action bar.
![image](https://user-images.githubusercontent.com/586552/200728920-a13b1834-4a3e-4578-ae64-25a648ea8c64.png)


#### Overflow menu
If the buttons don’t fit in the available space, an overflow button (“kebab” icon) can be added at the end of the action bar signaling that there are more actions available. Clicking on the overflow button opens a menu with the remaining actions that didn’t fit.

![image](https://user-images.githubusercontent.com/378023/193507064-4efe3f63-7b30-4656-8304-3dea3e3f1e03.png)

##### Sorting
Buttons that don’t fit are added to the top of the menu. This means that the last button in the action bar will also be the last button when inside the menu.

![image](https://user-images.githubusercontent.com/378023/188835345-0cfd3376-1658-496f-a78b-f5977aa2198c.png)

[.MOV DEMO](https://user-images.githubusercontent.com/378023/188359460-bc88bac8-9c69-4aea-8ce0-bc427bedc3a3.mov)

Overflow button appears when there is not enough space and resizing the action bar updates the overflow menu.

#### Tooltips
When hovering over a button, a tooltip will appear that describes the action.
 
`DO` Describe what action will be taken when clicking on the button.
![image](https://user-images.githubusercontent.com/586552/200725003-654abdfd-b2ad-444a-aec2-5685845f6f66.png)

`DON'T` Don't use a tooltip in action bars to convey a current state.
![image](https://user-images.githubusercontent.com/378023/193506979-07aa35d2-48f5-4b09-aa3e-c575be0e578e.png)

#### Spacing
- Make sure to add extra spacing around the action bar.
- 8px of extra padding is added when nesting an action bar in a box component.
- Avoid having the action bar touch something else. Even though the action bar buttons have no borders in their resting state, when hovering/pressing a button it will show a background color.

### Options
#### Size
![image](https://user-images.githubusercontent.com/378023/193507132-f3ad4632-e257-4301-bd48-0669f4347ddc.png)

Action bars can have 3 different sizes:
- Small (28px)
- Medium (32px) (default)
- Large (40px)

#### Layout
Action bars can be used inline next to other content or also full width taking up the entire space.
![image](https://user-images.githubusercontent.com/586552/200727326-0e20a620-5104-4fb1-87f0-541414b93a67.png)


## Related components
- [Action list](~https://primer.style/design/components/action-list~)




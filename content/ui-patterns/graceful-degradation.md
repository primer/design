---
title: Graceful degradation (new name TBD)
description: How to preserve functionality and quality user experience when critical services are unavailable.
---

<!-- TODO: Reconsider the title of this document. "Graceful degradation" usually refers to legacy browser support -->

<!-- TODO: Write a separate document with guidelines about how to craft helpful error message content and UI -->

<Note>These guidelines focus on cases where there is a service outage. They are not intended as general design guidance for error handling.</Note>

When there is a failure that prevents the user from seeing or interacting with something, we aim to provide as good of a user experience as possible. Instead of blocking an entire page from rendering, we should give users as much functionality as possible.

We should communicate that there is an problem and guide users around that problem as much as possible. We should not try to conceal or downplay that something is wrong. Ideally we can strike a balance and give the user just the right amount of context without overwhelming them with error messages.

## Global system notification

<!-- TODO: iterate on global system notification design and guidelines -->

![Image of a page with a banner at the top explaining an error]()

<!-- TODO: determine if the "warning" variant is the right path forward -->

If there is an outage or some other critical error that will break a normal workflow, show a [flash](/components/flash) at the top of the page. Default to using the "warning" variant of the flash. Having a global banner helps set the expectation that some parts of the usual UI might be missing or broken.

Explain what's wrong and, if possible, link to a page with more detailed information. For example, if there's a database outage, we could link to the [GitHub status page](https://www.githubstatus.com/).

In addition to a global banner, we should inform users about availability issues in context. The following guidelines discuss how to handle outages in the context of the affected UI.

## Unavailable content

If part of the UI cannot be rendered or would be rendered without critical information, default to not rendering it at all. However, it may be replaced with an error message if it would be disorienting to suppress rendering altogether. Before making a decision about how to handle UI with unavailable content, check if it already has guidelines on handling errors or empty states.

### Hiding or removing UI

You can hide the UI if it's not critical to core workflows and it wouldn't be confusing the render the rest of the page without that UI. For example: it's ok to hide the reactions button.

Examples of UI that might result in a disorienting experience if removed:

- The comment box
- The "review" button on PRs
- Submit buttons on forms

Never suppress rendering of the global site navigation or any of the items in it.

### Replacing with a blankslate component

![Two images: 1. comment box; 2. blankslate in place of comment box]()

If the affected area is large enough, replace the affected UI with a [blankstate](/components/blankslate) component that explains why the expected UI isn't there.

### Replacing with a message

![Two images: 1. Image of Memex table with populated content cells; 2. Image of Memex table with missing content message in cells]()

Smaller parts of the UI that cannot be accurately rendered but are too important to exclude entirely can often be replaced with a short error message.

DO/DON'T example:
DO: Render an error message in place of the content ![Image of Memex table with missing content message in cells]()
DON'T: Don't attempt to render UI that is missing critical information ![Image of Memex table with "undefined of undefined"]()

<!-- TODO: I'm not sure if `fg.warning` should be used by default. It could be very loud. -->

By default, show a warning icon before the message and color the icon and the message with `fg.warning`. If the page is likely to have many pieces of content.

<!-- TODO: come up with a realistic example of a lot of error messages being rendered in a small area -->

Rendering too many error messages in a small area will be jarring and over-emphasize that something is wrong. If there's an area of the page that is mostly unavailable, either supress rendering entirely, or replace the entire area with a [blankslate]() component if it is too critical to not be rendered.

DO/DON'T example:
DO: Replace an area with a lot of broken parts with a blankslate ![Image TBD]()
DON'T: Don't render a bunch of error messages in a small area ![Image TBD]()

### Handling counter label with unavailable count

When the data required to calculate a count is unavailable, default to hiding the number. If the count is shown inside of an interactive element, a tooltip explaining the missing count may be displayed on focus and hover.

<!-- TODO: Decide if we need to come up with a pattern for replacing numbers in an unavailable count. -->
<!-- If it would be confusing to hide the count, then replace the count with a warning icon. -->

## Unavailable actions

### Components to support error messages from broken controls

#### Dialog

If a user tries to activate a control that is non-functional, the default response should be to show a [dialog](/components/dialog) that explains what's wrong. After the dialog is closed, re-render the affected interactive elements to indicate that there is a problem.

#### Tooltip

Before a user tries to activate a non-functional control, a [tooltip](/components/tooltip) with additional context may be displayed on hover or focus. The tooltip is optional, and should not contain any information that is critical to the user's workflow.

### Handling inert [buttons](/components/button)

To maintain accessibility, buttons may not be disabled if the user can't do anything to enable them. For more info, see the guidance on [disabling links and buttons](https://accessibility-playbook.github.com/link-and-button-guidance#disabling-links-and-buttons) from GitHub's Accessibility Playbook (only available to GitHub staff).

#### Removing inert buttons

If removing the button would not cause users distress or confusion, remove it it. Don't remove buttons that are critical to a user's workflow—it may be disorienting.

DO/DON'T example:

- DO: Hide non-critical buttons ![Comment react button hidden]()
- DON'T: Don't hide buttons that users expect to see ![New issue button hidden]()

#### Indicate a button is inert or broken

<!-- TODO: If the inert button design is accepted, update this content -->
<!-- TODO: Decide whether this should be added to the component API, or use the existing Button API. If so, maybe its it's own component that composes Button+Tooltip+Dialog. -->

![A default button and an inert button]()

![A video of a "broken" button that shows a tooltip and opens an error dialog when activated]()
If a button is too critical to be omitted, indicate that something is wrong with the button by adding a leading icon. Optionally, you can also show a tooltip on the button to provide more context.

If the user still tries to click the button, the button should open a dialog that explains why the action cannot be completed and give them a path forward if possible.

DO/DON'T example:

- DO: Indicate that a button is not functional ![A button with an icon that indicates it's broken]()
- DON'T: Don't disable a button ![A disabled button]()

### Handling inert [action menu](/components/action-menu) items

![Three examples: 1. An action menu that works just fine; 2. An action menu with some items disabled; 3. An action menu with all items disabled]()

Show the menu items, but disable them and show a message explaining why they're disabled.

If an action menu contains menu items that are very closely related (for example: the action menu for adding a file to a repo) and we can detect that none of the menu items are available, then indicate a problem on the button that triggers the action menu. Use an icon in the button to indicate that something is wrong, and (optionally) show a tooltip on hover or focus.

<!--
It's unclear if we'll have any use cases for the following components,
so I'm leaving them out until we do.

### Tabs

### Form controls

### Links

### Segmented controls

### Toggle switches
-->

<!--
TODO: uncomment this section when/if we add loading state guidelines

## Waiting for a timeout

There could be cases where we're waiting for data to load before determining that it's unavailable. In this case, refer to Primer's general loading state guidelines or the component-specific loading state guidelines (if the component has loading states).
-->

## Entire page fails to load

If an error is critical enough to prevent the entire page from loading, fall back to showing a default error page. For example, the HTTP 500 server error page.

## CLI

It's confusing and frustrating when a command silently fails. If a command fails, immediately return an error message or wait for a timeout to expire and then return an error message.

## Accessibility

Never disable an interactive control that is non-functional due to availability issues.

A common (but inaccessible) pattern is to show a tooltip with more information when a user hovers an error message or a disabled button. However, tooltips may only be used on focusable elements.

<!-- TODO: determine if there are more a11y considerations that need to be documented -->

## Related links

- [Blankslate](/components/blankslate)
- [Dialog](/components/dialog)
- [Tooltip](/components/tooltip)
- [Messaging]()
- [Empty states]()
- [Error message content]()
- [Loading states]()

<!--
Potential new patterns we'll need:

- Button/IconButton "inert" state
- ActionList.Item "inert" state
  - Items w/ just a title
  - Items w/ title + description
- Label, CounterLabel, StatusLabel unavailable state
- Simple error message text (warning icon + text)
-->

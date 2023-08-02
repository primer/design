---
title: Error message content
---

**_Super early WIP. Basically just a stub file._**

## Offering a path to recover from the error

If it's possible for the user to recover from the error, explain what went wrong and nudge them towards a path to recover from the error.

For example:

## Offering an alternative path forward

Try to push the user forward using an alternative path until they truly hit a dead end for completing their task. Only offer an alternative path forward that can help the user complete their task, resolve the error, or get more context on the error.

DO/DON'T example
DO: link to [GitHubStatus](https://www.githubstatus.com/)
DON'T: link to the notifications page

---

<!-- TODO: Reconsider the title of this document. "Graceful degradation" usually refers to legacy browser support -->

<!-- TODO: Write a separate document with guidelines about how to craft helpful error message content and UI -->

<Note>These guidelines focus on cases where there is a system error such as a database outage. They are not intended as general design guidance for error handling.</Note>

When there is a failure that prevents the user from seeing or interacting with something, we aim to provide as good of a user experience as possible. Instead of blocking an entire page from rendering, we should give users as much functionality as possible.

We should communicate that there is an problem and guide users around that problem as much as possible. We should not try to conceal or downplay that something is wrong. Ideally we can strike a balance and give the user just the right amount of context without overwhelming them with error messages. A page with too many error messages could communicate an unnecessarily reactionary and negative tone.

## Global system notification

<!-- TODO: iterate on global system notification design and guidelines -->

<img width="456" alt="Image of a page with a banner at the top explaining an error" src="https://github.com/primer/react/assets/2313998/80b52dc9-0214-440d-8419-afec7ea21da4" />

<!-- TODO: determine if the "warning" variant is the right path forward -->

If there is a critical system error that will break a normal workflow, show a [flash](/components/flash) at the top of the page above the global navigation. Having a global banner helps set the expectation that some parts of the usual UI might be missing or broken. Default to using the "warning" variant of the flash.

Explain what's wrong and, if possible, link to a page with more detailed information. For example, if there's a database outage, we could link to the [GitHub status page](https://www.githubstatus.com/).

In addition to a global banner, we should inform users about availability issues in context. The following guidelines discuss how to handle outages in the context of the affected UI.

## Degraded page content

If part of the UI cannot be rendered or would be rendered without critical information, default to not rendering it at all. However, it may be replaced with an error message if it would be disorienting to suppress rendering altogether. Before making a decision about how to handle UI with unavailable content, check if it already has guidelines on handling errors or empty states.

### Removing UI

You can remove affected UI if it's not critical to core workflows and it wouldn't be confusing the render the rest of the page without that UI. For example: it's ok to hide the reactions button.

Examples of UI that might result in a disorienting experience if removed:

- The comment box on issues and pull requests
- The "New issue" button on the issues page
- Submit buttons on forms

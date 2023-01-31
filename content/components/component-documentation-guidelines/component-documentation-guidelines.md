# Component documentation guidelines

## Principles

Primer documentation should express the voices and contributions of different people, but for it to be useful it’s important to be consistent in tone and structure.

### Concise but friendly

A large proportion of readers want to find an answer that helps them complete a task, so don't waste their time

### Universally understood

Avoid using phrases or referencing examples that are only familiar internally at GitHub. Assume readers are either members of the public or new to GitHub.

### Production quality

Code examples should promote what we'd like to see used in production. While examples might be simpler than what we'd use in production, the code should promote best practices and follow our principles and accessibility standards.

Consider the core elements needed to properly document a component and its usage within Primer UI.

## Documenting components

When documenting components, consider the core elements needed to convey its main purpose and proper usage within the UI.

See our full [documentation guidelines here](https://primer.style/contribute/documentation/).

### Types of components

- **Regular**: Standard components used to build Primer UI. See [ActionList](https://primer.style/design/components/action-list).
- **Internal**: Components used by other components that do not exist on their own. See [Overlay](https://primer.style/react/Overlay).
- **Behavioral**: Components with no real anatomy or structure, rather behaviors. See [Truncate](https://primer.style/react/Truncate).

### Component documentation structure

#### Description

The description appears directly under the title of the component. It may be automatically pulled from component-metadata, and can be edited as needed.

- What is this component, and how would you describe it to someone who has never used it before? This description should be as concise and shouldn't include usage information, which is covered below this section.
- Release status
- Accessibility status

#### Usage

- When to use
- Best practices
- Do/Don't examples

#### Options

- Different sizes, typography options, layout variations, spac
  ing, etc
- Different applications of the component in context

#### Anatomy

- Describe the elements that make up the component, including typography, spacing, and styles. This can also include sub components, if there are any. See [Action list](https://primer.style/design/components/action-list#anatomy).

#### Interactions

- If there are specific behaviors or interactions that the consumer of this documentation should be aware of, it's important to document that. Is it clickable or static, does it have any specific interactions based on state? Are there multiple types of behavior, and when does each get applied? See [Autocomplete](https://primer.style/design/components/autocomplete#sort-and-filter-behavior).

#### Accessibility

- Any component-specific accessibility considerations should be documented. This could include keyboard navigation, touch targets, and any specific usage guidelines with regards to assistive technology. See [Segmented control](https://primer.style/design/components/segmented-control#accessibility).

#### Related components and patterns

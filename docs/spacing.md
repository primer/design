# Spacing

Careful spacing is key for the user to understand connections and hierarchies between elements, and for an interface to feel pleasant.

## Scale

Primer follows a base-8 scale, as it allows for significant flexibility when defining a variety of spacing values within an interface.

`[list of spacing utilities]`

For very small components where 8 pixel spacing is too large, you can use 4 pixels. 

## Responsive breakpoints

You can define different spacing values for different breakpoints, so the interface can better adapt to the available space.

`[Example: component with larger margin around it in large screen, vs smaller margin in small screen]`

In code, margins can be defined per breakpoint, where different breakpoints have a different margin applied.

`[Example: mb-sm-2 mb-md-3 mb-lg-4]`

## Applying spacing

The general rule when using Primer is to apply spacing in increments of 8 pixels, as provided by the spacing utilities. 

In some cases, for very small components and in denser areas of the UI, you can use 4 pixels.

`[Example: text and icon button]`

Primer components have inner spacing built-in, so in most cases you’ll only need to consider vertical spacing between components.

Do/Don’t: Using custom values?

## Relationships

Elements that are close together are perceived as being related or part of the same group, while elements that are far apart from each other feel unrelated.

`[Examples: cancel, save buttons; repo top nav buttons]`

Alignment
- Do / Don’t

## Hierarchy

Do: Add more white space around components that are more important.

`[Examples: titles]`

Note: Editorial content can have more generous spacing.

`[Examples: first use cards, new features cards]`

## Consistency

Do: Apply the same spacing values to similar components.

`[Example: all items in the sidebar have the same vertical distance]`

## Density

`[Examples: ]`

## Optical adjustments

Icons

Inline spacing

## Common spacing values

Small components usually have 8px between them. In some cases, for very small buttons, you can use 4px.

`[Example: buttons side by side, labels, icon+text]`

The most common value when stacking components vertically is 16px.

`[Example: issue header above first comment, sidebar, stacked boxes]`

## Learn more about spacing
If you’d like to read more about spacing in UI design, we recommend:

- [Elements of design](https://www.invisionapp.com/design-defined/elements-of-design/)
- [Design principles – Gestalt, white space and perception](https://manifesto.co.uk/design-principles-gestalt-white-space-perception/)
- The Principle of spacing in UI design, [Part 1](https://medium.com/dwarves-design/the-principle-of-spacing-in-ui-design-part-1-3354d0d65e51) and [Part 2](https://medium.com/dwarves-design/the-principle-of-spacing-part-2-e3cf31b909fa)

## Related

- [Primer CSS - Support - Spacing](https://primer.style/css/support/spacing)
- [Primer CSS - Utilities - Padding](https://primer.style/css/utilities/padding)
- [Primer CSS - Utilities - Margin](https://primer.style/css/utilities/margin)
- [Primer CSS - Utilities - Borders](https://primer.style/css/utilities/borders)
- [Primer Primitives - Spacing](https://github.com/primer/primitives/blob/master/primitives/spacing.ts)

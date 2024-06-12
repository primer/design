# Spacing

Careful spacing is key for the user to understand connections and hierarchies between elements, and for an interface to feel pleasant.

## Scale

Primer follows a base-8 scale, as it allows for significant flexibility when defining a variety of spacing values within an interface. 

The possible values are: 0, 4, 8, 16, 24, 32, 40, 48

For very small components where 8 pixel spacing is too large, you can use 4 pixels. 

## Responsive breakpoints

You can define different spacing values for different breakpoints, so the interface can better adapt to the available space.

`[Example: component with larger margin around it in large screen, vs smaller margin in small screen]`

In code, margins can be defined per breakpoint, where different breakpoints have a different margin applied. For example, applying the classes `mb-sm-2`, `mb-md-3`, and `mb-lg-4` to one component would translate into: `margin-bottom: 8px` in small screens (`mb-sm-2`), `margin-bottom: 16px` in medium screens (`mb-md-3`), and `margin-bottom: 24px` in large screens(`mb-lg-4`).

## Applying spacing

The general rule when using Primer is to apply spacing in increments of 8 pixels, as provided by the spacing utilities. 

In some cases, for very small components and in denser areas of the UI, you can use 4 pixels.

`[Example: text and icon button]`

Primer components have padding built-in, so in most cases you’ll only need to consider vertical spacing *between* components.

In some cases, the spacing values inside components don't follow the values in the scale, but the total size of the component should always follow the scale.

`[Example: the padding inside a button may be 3px or 5px but the total height is 32px]`

**Do:**
- Use the spacing values available in Primer.

**Don’t:**
- Don't apply custom spacing values.

## Relationships

Elements that are close together are perceived as being related or part of the same group, while elements that are far apart from each other feel unrelated.

`[Examples: cancel, save buttons; repo top nav buttons]`

## Alignment

As a general rule, elements should align to other elements' outer box, and not try to align to the content inside a box.

`[Example: text outside and above a table/list should align to the edge of the table (and not to the content within the rows]`

## Hierarchy

**Do:** Add more white space around components that are more important.

`[Examples: titles]`

Note: Editorial content can have more generous spacing.

`[Examples: first use cards, new features cards]`

## Consistency

**Do:** Apply the same spacing values to similar components.

`[Example: all items in the sidebar have the same vertical distance]`

## Density

Some screens and flows require a denser layout, with smaller elements and less space between components, depending on the type of action users most often take. In these cases, use the smaller values of the spacing scale.

`[Examples: high density screen, or part of screen]`

## Optical adjustments

In some cases, optical adjustments may break from the scale.

`[Example: avatar on commits in repo landing page align optically with file icons below]`

## Common spacing values

Small components usually have 8px between them. In some cases, for very small buttons, you can use 4px.

`[Example: buttons side by side, labels, icon+text]`

The most common value when stacking components vertically is 16px.

`[Example: issue header above first comment, sidebar, stacked boxes]`

Generally, Primer elements have "squished" padding, where the vertical padding is smaller than the horizontal padding.

`[Example: squished padding element, like a button.]`

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

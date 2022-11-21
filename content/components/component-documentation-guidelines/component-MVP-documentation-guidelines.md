# Component documentation MVP guides

## Description
One of the strategies to help Primer documentation become self-serve is to accurately represent the breadth of patterns and components we have available through our documentation. 

To do this, we are increasing our coverage to include 100% of available-for-use components temporarily in the primer/design repository. Executing on this plan requires us to be practical and concise in terms of the depth of the documentation. In order to ensure we can reach 100% coverage, we're using an MVP approach. 

## Principles for this approach 
- Accurate
- Informative but concise
- Visible

## MVP documentation approach
Aside from components we deem to be high touch and therefore requiring more in-depth documentation, the majority of components that are missing usage guidelines will be documented with the following minimum requirements:

Description
- brief text describing what the component is
- link to available implementations
- image, if applicable

Usage
- proper usage guides
- visual examples, such as an image or gif demonstrating what the component is

## Add more documentation if it's readily available
If more information (than required above) is easily accessible and doesn't require a huge time investment to include, it should be added to to MVP documentation. Some examples of this include listing out related components, cross-linking to Accessibility guidelines, and more. 

Take a look at the [Component documentation guides](../component-documentation-guides.md) for an full overview of content recommendations and how to write them. 

---- 

### Tips and tricks

- A great starting off point is to consolidate existing documentation for the component that's already available. Places to look:
  - Figma ([Primer Web file](https://www.figma.com/file/GCvY3Qv8czRgZgvl1dG6lp/Primer-Web?node-id=179%3A3870))
  - [CSS documentation](https://primer.style/css/)
  - [React documentation](https://primer.style/react/)
  - [Rails documentation](https://primer.style/view-components/)
  - [Interface guidelines component documentation](https://primer.style/design/components)
  - [Interface guidelines UI pattern documentation](https://primer.style/design/ui-patterns)
  - [Interface guidelines Accessibility documentation](https://primer.style/design/accessibility)
  - Related components that may have guidelines applicable to your component 
  - Take a look at an existing component that was documented using this approach, such as [Action menu](../action-menu.mdx) 

#### Recommendations for tackling this work quickly and efficiently
- Work in pairs or with a small group. Dedicate 1-2 components per person, with each person in the group is responsible for reviewing the others' PRs.  
- Timebox each component to x hour(s) for writing, x hour(s) for reviewing, and x hour(s) for writing revisions.
- If you get stuck or a component clearly needs more thorough documentation in order to be accurate, swap it out for another component and add it to the backlog of components that need more thorough documentation. 

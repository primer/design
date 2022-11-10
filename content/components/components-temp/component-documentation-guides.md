# Component documentation guidelines


## Documentation principles
Primer documentation should express the voices and contributions of different people, but for it to be useful it’s important to be consistent in tone and structure. 

### Concise but friendly
A large proportion of readers want to find an answer that helps them complete a task, so don't waste their time 

### Universallly understood
Avoid using phrases or referencing examples that are only familiar internally at GitHub. Assume readers are either members of the public or new to GitHub. 

### Production quality
Code examples should promote what we'd like to see used in production. While examples might be simpler than what we'd use in production, the code should promote best practices and follow our principles and accessibility standards.

Consider the core elements needed to properly document a component and its usage within Primer UI. 


## Documenting components
Consider the core elements needed to properly document a component and its usage within Primer UI. 

### Types of components 
#### Regular
Standard components used to build Primer UI

#### Internal
Components used by other components that do not exist on their own. 

#### Behavioral
Components with no real anatomy or structure, rather behaviors

### Component documentation structure
#### Description
What is this component, and how would you describe it to someone who has never used it before? Briefly describe it's main purpose. 

#### Usage (Overview)
- When to use
- Best practices
- Do/Don't examples

#### Options
- Different sizes, typography options, layout variations, spacing, etc
- Different applications of the component in context

#### Anatomy 
Describe the elements that make up the component, including typography, spacing, and styles. This can also include sub components, if there are any (as an example, the sub components are PageLayout include x,y,and z). 

#### Interactions
If there are specific behavior or interactivity that the consumer of this documentation should be aware, it's important to document that. Is it clickable or static, does it have any specific interactions based on state? Are there multiple types of behavior, and when does each get applied? 

#### Accessibility
- Usge
- Keyboard navigation
- Touch targets
- Any specific usage guidelines with regards to assistive technology 

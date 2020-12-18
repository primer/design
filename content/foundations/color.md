# Primer color system
Primer’s color system is built based on a functional model. The system is composed of a suite of functional variables that serve backgrounds, borders and foregrounds based on their purpose or meaning. 

## Color scale
Main Primer color scale.

![light-mode-scale](https://user-images.githubusercontent.com/6951037/102642133-8095d880-415d-11eb-80fb-71b089e27025.png)


## Color modes
Currently Primer supports two color modes. 

**Light mode**
![Screen Shot 2020-12-10 at 10 47](https://user-images.githubusercontent.com/6951037/102642256-b63ac180-415d-11eb-979a-c3cf5ae2949b.png)

**Dark mode**
![Screen Shot 2020-12-10 at 10 46](https://user-images.githubusercontent.com/6951037/102642291-bf2b9300-415d-11eb-9713-c4d488876bdb.png)


## Functional model

### Types 

- `-bg`: Base layer
- `-border`: Create boundaries between blocks 
- `-text`: Words
- `-icons`: Supporting symbols 
- `-states`: Interaction feedback

### Anatomy
Primer’s functional system has two types of variable structure: 🖼

Global functional: -property + -category + - state
Component or app-level: -component name + -property +-state or category

// Note 🚨 Include different formats for the different implementations here? 🚨
// Note 🚨 Pending discussion about code format before making the image 🚨

## Foundations 

### Backgrounds
![backgrounds-overview](https://user-images.githubusercontent.com/6951037/102642846-93f57380-415e-11eb-9acd-289cb3bed02f.png)

Backgrounds are based on elevation, elements closer to the surface are lighter than those which are farther. Different color modes use elevation in different ways but in all of them the lightests is the closest.


#### Canvas inset (level -1) 
`bg-canvas-inset` 

Canvas inset is layer -1. Use for content feed and depth

![backgrounds-canvas-inset](https://user-images.githubusercontent.com/6951037/102642833-90fa8300-415e-11eb-8844-b55b930d25f5.png)

#### Canvas (level 0)
`bg-canvas`

Canvas is the level 0 across the whole product. There is typically only one of these per page. In most instances, this background is already applied to the markup that you’re working on.
![backgrounds-canvas](https://user-images.githubusercontent.com/6951037/102642841-92c44680-415e-11eb-8d99-c987967f48d3.png)


#### Primary (level 1)
`bg-primary`

A primary surface is the focal point of an interface. Most of the work happens on this surface.

![backgrounds-primary](https://user-images.githubusercontent.com/6951037/102642840-922bb000-415e-11eb-8f90-ecbae42c3b65.png)


#### Secondary (level 2)
`bg-secondary`

Second level of elevation. 
// Note 🚨 In color modes where details are more difficult to distinguish, secondary backgrounds are the same color as primary backgrounds. Use tertiary background to achieve more contrast between backgrounds. Use the background only to establish some contrast on the canvas. 🚨

![backgrounds-secondary](https://user-images.githubusercontent.com/6951037/102642838-922bb000-415e-11eb-952e-24d0e8fe87db.png)

#### Tertiary +3
`bg-tertiary`

The tertiary backgrounds achieves ideal contrast against primary background. Use this background to create resting areas where secondary or supporting information is displayed or as a visual anchor to improve ‘scannability’. For example, table headers or code snippets.

![backgrounds-tertiary](https://user-images.githubusercontent.com/6951037/102642836-91931980-415e-11eb-933b-a86e5051c40a.png)


#### Overlay + 4
`bg-overlay`
Use overlay background for elements positioned above all levels (absolute closest). For example, dropdowns, dialogs, select menus or popovers.

![backgrounds-overlay](https://user-images.githubusercontent.com/6951037/102642832-8fc95600-415e-11eb-9b43-d3b6524a8793.png)

---

### Borders

![borders-overview](https://user-images.githubusercontent.com/6951037/102643035-eb93df00-415e-11eb-8151-84e1c4d01be9.png)

#### Primary
`border-primary`

Primary borders are for grouping elements. For example the border around cards or box components.

![borders-primary](https://user-images.githubusercontent.com/6951037/102643029-ea62b200-415e-11eb-9cfc-d816ae65a4eb.png)

#### Secondary
`border-secondary`

Secondary borders are supporting lines that separate or divide content like sections or list items.

![borders-secondary](https://user-images.githubusercontent.com/6951037/102643034-eafb4880-415e-11eb-933a-8abb9cd3d018.png)

```
💡 Accessibility recommendations. 
Some high contrast modes in browsers or systems remove backgrounds and rely only on borders to create boundaries. Use the full bundle to make sure these components look correct. Here’s an example.
```

// Note 🚨 Pending finding a screenshot from GH on a firefox browser that has high-contrast on 🚨

### Text and icons

**Primary**
`text-primary`
`icon-primary`

Primary text and icons are the most visible foregrounds. The most common use of `text-primary`is default text like paragraphs, headings and labeling text. `icon-primary` is typically used as supporting symbol for text. Don't use text variables for icons, they have different accessibility requirements.

**Secondary**
`text-primary`
`icon-primary`

Use secondary text for words or paragraphs that provide secondary information or not a critical part of a primary workflow. 

**Tertiary**
`text-tertiary`
`icon-tertiary`

// Note 🚨 *Legacy and will be deprecated soon.* For muted text or disabled use `text-disabled` or `text-placeholder` instead. 

**Disabled and placeholder**
`text-disabled`
`text-placeholder`


**Links**
`text-link`

Links are clickable highlighted text.

### States
Functional group for interaction states. Each state has its own background, border, icon and text variable.States also have two levels of hierarchy. Primary and secondary. Primary is for most important interactions and cues. For example the selected state for pagination uses `-selected-primary` because it provides context about a whole view. Secondary states are for less important interactions. 

// (Can't think of an example right now)

States are used for patterns such as navigation, pagination, selectable list items, etc. 

**Hover**
Used for: secondary navigation, pagination, selectable boxes, dropdowns, autocompletes… 
Explain differences between primary and secondary 

**Selected**

## Feedback

There are four feedback categories. Info, success, warning and danger. Each category has a bundle of styles and some variations. 

**Prefixes**
`-bg, -border, -text, -icon`

**Feedback categories (suffixes)**

`-info`: Neutral messaging and providing additional information.
`-danger`: Error or destructive actions.
`-warning`: Pending actions or non-blocking but critical events.
`-success`: Completion or action resulted in expected outcome.


💡 Feedback Don't rely on feedback colors on their own. Always use icons and text to support. This is an example of alerts, a component using color and icons to convey feedback categories. Other components that use feedback colors are [forms](https://primer.style/css/components/forms) and [flash banners](https://primer.style/css/components/alerts#with-action-button).

![feedback-example](https://user-images.githubusercontent.com/6951037/102643519-b045e000-415f-11eb-9bc3-d44193ebf12b.png)



```
💡 Accessibility requirement. 
Feedback colors should never be relied on on their own to convey the category or severity of the feedback. Use text and icons when possible to provide context. Here are some examples of icons that can be used for different types of feedback. 
```

## Glossary

**Functional variable**
Color abstractions that are defined by meaning. For example: --color-state-selected. 

**Color mode**
Themes based on a given accessibility or contextual requirement. For example light mode (default mode for GitHub) or dark mode.

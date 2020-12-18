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

- `-bg`: Base layer. 
- `-border`: Create boundaries between blocks 
- `-text`: Words
- `-icons`: Supporting symbols 
- `-states`: Interaction feedback

### Anatomy
Primer’s functional system has two types of variable structure: 🖼

Global functional: -property + -category + - state
Component or app-level: -component name + -property +-state or category

🚨 Include different formats for the different implementations here?

## Foundations 

### Backgrounds
![](https://i.imgur.com/zejflmn.png)

Backgrounds are based on elevation, elements closer to the surface are lighter than those which are farther. Different color modes use elevation in different ways but in all of them the lightests is the closest.


#### Canvas inset -1 

`bg-canvas-inset` 
Canvas inset is ground -1. Use for content feed and depth

![](https://i.imgur.com/0ZDDLNW.png)

#### Canvas 0

`bg-canvas`
Canvas is the level 0 across the whole product. There is typically only one of these per page. In most instances, this background is already applied to the markup that you’re working on.

![](https://i.imgur.com/TaHmDlQ.png)


#### Primary + 1

`bg-primary`
Focal point and primary surface. Most of the work happens on this surface.

![](https://i.imgur.com/rBDjmQs.png)


#### Secondary +2

`bg-secondary`
Second level of elevation. 🚨[Temporary?] In color modes where details are more difficult to distinguish, secondary backgrounds are the same color as primary backgrounds. Use tertiary background to achieve more contrast between backgrounds. Use the background only to establish some contrast on the canvas.

![](https://i.imgur.com/laa81su.png)


#### Tertiary +3

`bg-tertiary`
Ideal contrast level with primary background. Use this background to create resting areas where secondary or supporting information is displayed or as a signal to improve ‘scannability’ . For example, table headers or code snippets.

![](https://i.imgur.com/3nwdhoi.png)


#### Overlay + 4

`bg-overlay`
Elements that are positioned above all levels (absolute closest). For example, dropdowns, dialogs, select menus or popovers.

![](https://i.imgur.com/PCz23Mk.png)

---


### Borders

![](https://i.imgur.com/4AhdFyl.png)


#### Primary

`border-primary`
Primary borders are used to group elements. For example the border around cards or box components. 

![](https://i.imgur.com/a2vjD26.png)




#### Secondary
`border-secondary`
Secondary borders are supporting lines that separate content like sections or list items.

![](https://i.imgur.com/w4m4UBX.png)
 


```
💡 Accessibility recommendations. 
Some high contrast modes in browsers or systems remove backgrounds and rely only on borders to create boundaries. Use the full bundle to make sure these components look correct. Here’s an example. (example)
```

### Text and icons
Historically, we’ve been using 

**Primary**
`text-primary`
`icon-primary`

Highest contrast foregrounds. The most common use of `text-primary`is default text like paragraphs, headings and labeling text. `icon-primary` is typically used as supporting cue for text. Don't use text variables to color icons as that may result in a hierarchy imbalance. 

**Secondary**
`text-primary`
`icon-primary`


**Tertiary**
`text-tertiary`
`icon-tertiary`

*Legacy and will be deprecated soon.* For muted text or disabled use `text-disabled` or `text-placeholder` instead. 

**Disabled and placeholder**
`text-disabled`
`text-placeholder`

**Links**
`text-link`

Clickable highlighted text

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

`-info` neutral messaging and providing additional information.
`-danger` error or destructive actions.
`-warning` pending actions or non-blocking but critical events.
`-success` completion or action resulted in expected outcome.


💡 Feedback Don't rely on feedback colors on their own. Always use icons and text to support. This is an example of alerts, a component using color and icons to convey feedback categories. Other components that use feedback colors are [forms](https://) and [flash banners](https://). 

![](https://i.imgur.com/hurYyzZ.png)


```
💡 Accessibility requirement. 
Feedback colors should never be relied on on their own to convey the category or severity of the feedback. Use text and icons when possible to provide context. Here are some examples of icons that can be used for different types of feedback. 
```

## Glossary

**Functional variable**
Color abstractions that are defined by meaning. For example: --color-state-selected. 

**Color mode**
Themes based on a given accessibility or contextual requirement. For example light mode (default mode for GitHub) or dark mode.

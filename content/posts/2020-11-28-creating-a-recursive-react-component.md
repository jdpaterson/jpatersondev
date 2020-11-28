---
template: post
title: Creating a Recursive React Component
slug: creating-a-recursive-react-component
draft: true
date: 2020-11-28T16:01:07.871Z
description: I recently had the need to create a recursive React component. I
  want to show it to you.
category: Front-End Development
tags:
  - react
  - front-end development
  - recursive
  - react recursive
  - javascript
  - typescript
---
I recently had the need to create a react component that allows the user to navigate through a javascript object in the UI, similar to functionality present in the browser dev-tools:

![A javascript object displaying in the browser dev-tools](/media/capture.png "Dev Tools object navigation")

Ok well, turns out I didn't NEED to create this component, [it already exists](https://github.com/mac-s-g/react-json-view), but I had already started writing it by the time I found that package, and I really just needed one specific functionality anyway, aaand I saw a chance to write a "recursive" React component, which I think is a cool thing to do, so I forged on!

tl;dr; you can check out the component [here](https://github.com/jdpaterson/react-collapse-object) , I was even feeling ambitious so I published it to NPM, go ahead and `npm install react-collapse-object` and bump up my npm weekly downloads counter if you're feeling gratuitous.

Aaanyway, enough about me, what I want to show today is how the functional design of React naturally lends itself to creating recursive components. It shan't take long, so let's get to it. 

What we are building, is a component that, when it is passed a JS object as a prop, it will render something that displays the root level of that object, and when the user clicks, the object will collapse and the user can then see the next level of properties of the object, and if the user clicks on one of those properties, if they are themselves objects or arrays, then they will collapse and display the next level properties, and so on, and so forth, until finally there are no child elements left to click. <- see? Recursion be the only suitable solution here. Also, if the property is NOT an object or an array, I need the user to be able to select the field, and the path to that selection will be stored in a state, with which I can then do what I want (ie print the list of all selected fields).

Ok so here is the parent component, 

```typescript
const CollapseObject: React.FunctionComponent<TCollapseObject> = (props) => {
  /* First, I store the collapse state in a central location, rather than having each Collapse component maintaining its own state of whether it is collapsed or not. 
      Initially I did have it so that each Collapse component maintains its own collapsed state, but this caused some issues when the entire component was re-rendering (like, after a selection had been made), and all of the components that re-rendered then defaulted to their original non-collapsed state. Maybe there is another way around this but I decided to 'control' all of the child components from here /*
  const [collapseState, setCollapseState] = useState({})
  /* Next we initialize the selection state */
  const [selectionState, setSelectionState] = useState({})

  /* Now, we render the recursive component. I also allow for custom renderers as props, for numbers, strings etc... so that the user can customize how they want the UI to display, that should still work, but I won't be demoing that today */
  return (
    <>
      <CollapseObjectParser
        collapseState={collapseState}
        setCollapseState={setCollapseState}
        onBoolean={props.onBoolean || defaultOnBoolean}
        onNumber={props.onNumber || defaultOnNumber}
        onString={props.onString || defaultOnString}
        onUndefined={props.onUndefined || defaultOnUndefined}
        path={[]}
        selectionState={selectionState}
        setSelectionState={setSelectionState}
        value={props.value}
        valueKey={props.valueKey || ""}
      />
{/* Finally, we just have a button which, when clicked passes the selectionState into an anonymous function */} 
      <Button
        m={3}
        onClick={() => props.onSubmit ? props.onSubmit(selectionState) : defaultSubmit(selectionState)}
      >
        GET SELECTED
      </Button>
    </>
  )
}
```

Ok so that's the parent component, but we're here to see the recursive piece dangit! 

![South Park impatient villagers with torches and pitchforks](/media/south-park-villagers.gif "South Park Villagers")

Woah woah, easy. 

\
The juicy bits come [here:](https://github.com/jdpaterson/react-collapse-object/blob/master/src/components/CollapseObject/index.tsx)

```
const CollapseObjectParser: React.FunctionComponent<TCollapseObjectParser> = (props) => {
  const { collapseState, setCollapseState } = props
  const isCollapsed = !!collapseState[props.path.join('.')]
  const {
    onBoolean,
    onNumber,
    onString,
    onUndefined,
    value,
  } = props
  const newPath = [...props.path].filter((isVal) => isVal || isVal === 0)

/* Here is our switch...case function, shh... quiet now... the recursion lies within... */
   switch (typeof(value)) {
    case 'object':
      if(Array.isArray(value)) {
        return (
          /* Not this one... */
          <Collapse
            isCollapsed={isCollapsed}
            onCollapse={() => {
              setCollapseState({
              ...collapseState,
              [newPath.join('.')]: !isCollapsed
              })
            }}
            title={String(props.valueKey)}
          >
            {
              props.value.map(
                (arrItem:unknown, index:number) => (
                  /* Here it is! We render the <CollapseObjectParser /> component, which... is THIS component! Isn't that so cool!? Well I think so. So what will happen is we will render this component as a child of itself, and when the child renders, it will come through this same switch...case function, which will then determine what to render in the next iteration, it could be another CollapseObjectParser, or it could be one of the other values. Huzzah! We've done it! */
                  <CollapseObjectParser
                    key={uuid()}
                    { ...props }
                    value={arrItem}
                    valueKey={index}
                    path={[...newPath, String(props.valueKey)]}
                  />
                )
              )
            }
          </Collapse>
        )
      } else {
        return (
          <Collapse
            isCollapsed={isCollapsed}
            onCollapse={() => {
              setCollapseState({
                ...collapseState,
                [newPath.join('.')]: !isCollapsed
              })
            }}
            title={`${props.valueKey ? props.valueKey : '{}'}: {${Object.keys(props.value).join(', ')}}`}
          >
            {
              Object.entries(props.value).map(
                ([key, value]) => (
{/* Look familiar ? */}
                  <CollapseObjectParser
                    key={uuid()}
                    { ...props }
                    value={value}
                    valueKey={key}
                    path={[...newPath, String(props.valueKey)]}
                  />
                )
              )
            }
          </Collapse>
        )
      }
    case 'string':
      return onString(props)
    case 'number':
      return onNumber(props)
    case 'boolean':
      return onBoolean(props)
    default:
      return onUndefined(props)
  }
}
```


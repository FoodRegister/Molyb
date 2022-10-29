
# Molyb

Molyb is the JavaScript framework used in the Food Register project. It comes with a few utils, like a just in time tailwind compilation directly on the client (Not every tailwind features are implemented, and certain features are added for the project purposes).

# Framework usage

We don't use anything like Babel or other tools right now but it might be implemented in the future, but for the moment, we expose a few tools.

## createElement

The createElement takes 4 arguments, the type, the props, the tailwind classes and the childrens, which can be DOM nodes or text, it returns a DOM Node.

## createIcon

Generates a Google font icon with a text, and classes as argument

## createUnsafeText

Creates an element while setting the innerHTML instead of innerText

## createInput and createButton

creates either an input or a button using preconfigured color theme from Food Register

## Component

A component comes with an _render method that you can override to create a component, it needs to return a DOM Node, and takes into the super constructor the parent, on which the child will be updated when the render method is called.

### Proxy

The component uses a proxy to rerender when a state is modified, you can load it using this.loadProxy or kill it using this.killProxy. It is disabled by default

### Animations and Component

To allow animation using tailwind, you will need to use a cached component, this means you will need to always render the same component, without modifying it otherwise your animation will be reset at each state modification, but you can change the style of the cached component during the _render method, which is the way intended. If you check the Food Register components in the dev tools, you can see we use a _first_render method to create the DOM nodes and then apply modifications in the _render method.

### Components in createElement

To pass a component in createElement, you first have to render it to pass it in the array by doing component.render(). You can also say whether you want to get the cache or not.

# Tailwind

To use tailwind, you juste have to use one of the variants of createElement and add your classes in the third parameter. If you want to add a tailwind feature, you can and you just have to go in the tailwind.js file and add a function _tailwind_$name or edit the existing to change the behaviour of the "$name" tailwind attribute.

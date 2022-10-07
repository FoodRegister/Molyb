
# Molyb

Javascript framework used in the Food Register project

# JSX Transpilation

TODO do custom transpilation of jsx syntax to detect what needs to be recalculated at every state modification.

from function

```
function component() {
    state   st;
    state[] et;

    return <div><p>{st}</p>{et}</div>;
}
```

to

```
function component() {
    function _render_st() {}
    function _render_et() {}

    let element = ...;

    return element;
}

# State Renderer



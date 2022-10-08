
import { createElement } from "./molyb/element"
import { renderAdd } from "./molyb/renderer";

//const Molyb
export const Molyb = {
    createElement: createElement,
    render: (element, root=undefined) => {
        renderAdd(root, element)
    }
};

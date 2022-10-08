
import { renderAdd } from "molyb/renderer.jsx"

export function createElement(type, props, ...childrens) {
    return new MolybElement(type, props, ...childrens);
}

class MolybElement {
    constructor (type, props, ...childrens) {
        this.type = type;
        this.props = props;
        this.childrens = childrens;
    }

    render (container) {
        if (this?.__element) return this.__element;

        this.__element = document.createElement(this.type);
        if (container) container.appendChild(this.__element);

        for (let children of this.childrens) {
            renderAdd(this.__element, children)
        };
    }
}


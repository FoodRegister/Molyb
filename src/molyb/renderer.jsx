
import { MolybElement } from "molyb/element";

const RENDER_COUNT = 20;
const renderStack  = [];

let renderRequested = false;

function requestRender() {
    renderRequested = true;

    queueMicrotask(__render)
}

function __render () {
    let count = 0;

    while (count < RENDER_COUNT && renderStack.length != 0) {
        const [container, element] = renderStack.splice(0, 1)[0];
        
        if (! (element instanceof MolybElement)) {
            if (container) container.append(element)
        } else element.render(container);

        count += 1;
    }

    renderRequested = false;
    if (renderStack.length != 0) requestRender();
}

export function renderAdd (container, children) {
    

    renderStack.push([container, children])

    if (!renderRequested) queueMicrotask(__render)
};

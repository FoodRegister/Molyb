
import { Molyb, useDefaultConfig } from '../../molyb/molyb.js';

function createHelloWorldComponent () {
    return <h1>Hello, <span className="red">World</span> !</h1>;
}

useDefaultConfig(document.body);

Molyb.document.appendChild(createHelloWorldComponent());


import { Molyb, useWorkerConfig } from '../../molyb/molyb.js';
import { WorkerTransceiver } from '../../vdom/virtualdom/bridge/channels/transceiver.js';

let transceiver = new WorkerTransceiver();

function createHelloWorldComponent () {
    return <h1>Hello, <span className="red">World</span> !</h1>;
}

useWorkerConfig(transceiver, "worker");

Molyb.document.appendChild(createHelloWorldComponent());

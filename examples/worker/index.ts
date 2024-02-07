
import { DOMMutationPatcher } from '../../vdom/virtualdom/mutations/patch/dom.js';
import { WindowTransceiver } from '../../vdom/virtualdom/bridge/channels/transceiver.js';
import { WorkerDOMBridge } from '../../vdom/virtualdom/bridge/worker.js';
import { DOMSubscribable } from '../../vdom/virtualdom/events/dom.js';

let worker = new Worker("./worker.js", { type: "module" });
let transceiver = new WindowTransceiver(worker);

let patcher = new DOMMutationPatcher(document.body);
let _bridge = new WorkerDOMBridge(transceiver, "worker", patcher, new DOMSubscribable());

console.log(_bridge);

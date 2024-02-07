import { Node } from "../vdom/virtualdom/virtual/tree/node.js";
import { Props } from "./types.js";
import { DocumentType } from "../vdom/virtualdom/virtual/document.js";
import { VirtualBridge } from "../vdom/virtualdom/bridge/abstract.js";
import { IntegralMutationEngine } from "../vdom/virtualdom/virtual/mutations/integer.js";
import { EventEngine } from "../vdom/virtualdom/virtual/events/target.js";
import { DOMMutationPatcher } from "../vdom/virtualdom/mutations/patch/dom.js";
import { BridgeEngine } from "../vdom/virtualdom/virtual/events/bridge.js";
import { createClassicalBridge } from "../vdom/virtualdom/bridge/classical.js";
import { DOMSubscribable } from "../vdom/virtualdom/events/dom.js";
import { WorkerTransceiver } from "../vdom/virtualdom/bridge/channels/transceiver.js";
import { WorkerVirtualBridge } from "../vdom/virtualdom/bridge/worker.js";
import { Component } from "./component.js";

class _Molyb {
    private document_: DocumentType<number>;
    useBridge (bridge: VirtualBridge<number>, evtEngine: EventEngine<number>) {
        let mutEngine = new IntegralMutationEngine(bridge);

        this.document_ = new DocumentType(mutEngine, evtEngine, "localhost");
    }
    createElement (tag: string | { new(props: Props):  Component }, props: Props, ...childrens: (undefined | string | Node<number, DocumentType<number>>)[]): undefined | Node<number, DocumentType<number>> {
        if (!(typeof tag === "string" || tag instanceof String))
            return new tag(props).render(false);
        
        tag = tag as string;
        let element = this.document_.createElement(tag);
        
        if (props !== null && props !== undefined) {
            if (props.className !== undefined) element.className = props.className;

            if (props.onclick !== undefined) element.addEventListener("click", props.onclick);
        }

        for (let child of childrens) {
            if (child === undefined) continue ;
            if (!(child instanceof Node))
                child = this.document_.createTextElement(child.toString());

            element.appendChild(child);
        }

        return element;
    }
    get document () {
        return this.document_;
    }
}

export const Molyb = new _Molyb();

export function useDefaultConfig (body: Element) {
    let patcher     = new DOMMutationPatcher(body);
    let eventEngine = new BridgeEngine<number>();
    let [ virtualBridge, _ddmBridge ] = createClassicalBridge(eventEngine, patcher, new DOMSubscribable());
    eventEngine.useBridge(virtualBridge);

    Molyb.useBridge(virtualBridge, eventEngine);
}

export function useWorkerConfig (transceiver: WorkerTransceiver, channel: string) {
    let engine = new BridgeEngine<number>();
    let bridge = new WorkerVirtualBridge(transceiver, channel, engine);

    engine.useBridge(bridge);

    Molyb.useBridge(bridge, engine);
}

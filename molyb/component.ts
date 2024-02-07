import { DocumentType } from "../vdom/virtualdom/virtual/document.js";
import { Node } from "../vdom/virtualdom/virtual/tree/node.js";

export abstract class Component {
    private component: Node<number, DocumentType<number>> | undefined;

    private isDataCached  : boolean;
    private isInitialized : boolean;

    abstract init   (): void;
    abstract update (): Node<number, DocumentType<number>> | undefined; 

    constructor () {
        this.component     = undefined;
        this.isInitialized = false;
        this.isDataCached  = false;
    }

    render (useCache?: boolean) {
        if (useCache === undefined) useCache = true;

        if (!this.isInitialized) {
            this.isInitialized = true;
            this.init();
        }

        let newComponent = this.component;
        if (!useCache || !this.isDataCached) newComponent = this.update();

        let parent = this.component?.parentElement;
        if (parent !== undefined && this.component !== undefined && newComponent !== undefined)
            parent?.replaceChild(newComponent, this.component);
        
        this.component = newComponent;

        return this.component;
    }
}


import { Component } from '../../molyb/component.js';
import { Molyb, useDefaultConfig } from '../../molyb/molyb.js';
import { DocumentType } from '../../vdom/virtualdom/virtual/document.js';
import { Node } from '../../vdom/virtualdom/virtual/tree/node.js';

class ButtonComponent extends Component {
    name  : string;
    count : number;

    init()   : void {}
    update() : Node<number, DocumentType<number>> | undefined {
        let component = this;

        return <div>
            <button onclick={ () => {
                component.count ++;

                this.render(false);
             } }>{ this.name }</button>
            <span>You clicked { this.count } times !</span>
        </div>
    }

    constructor (props: { name: string }) {
        super();

        this.name  = props.name;
        this.count = 0;
    }
}

class MainComponent extends Component {
    init(): void {}
    update(): Node<number, DocumentType<number>> | undefined {
        return <div>
            <ButtonComponent name="Button 1"></ButtonComponent>
            <ButtonComponent name="Button 2"></ButtonComponent>
        </div>
    }
}

useDefaultConfig(document.body);

Molyb.document.appendChild( <MainComponent></MainComponent> );
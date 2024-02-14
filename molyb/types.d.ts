import { Node } from "../vdom/virtualdom/virtual/tree/node";
import { EventListener } from "../vdom/virtualdom/virtual/events/types";
import { DocumentType } from "../vdom/virtualdom/virtual/document";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

export type Props = undefined | null | {
    className?: string,
    onclick  ?: EventListener<number>
    src      ?: string
};

import {v4 as uuid} from 'uuid';

export default abstract class Component {
    public readonly root: HTMLElement;
    protected id: string;

    protected constructor(rootElement: HTMLElement) {
        this.root = rootElement;

        this.id = uuid();
    }

    public createElement<ElementType extends HTMLElement = HTMLElement>(htmlSource: string): ElementType {
        const domParser = new DOMParser();
        let parsedSource = htmlSource;
        const idAttrRegex = /id="[^"]+"/g;
        const ids = htmlSource.matchAll(idAttrRegex);
        for (const id of ids) {
            const idAttr = id[0];
            const idValue = idAttr.substring(idAttr.indexOf('"') + 1, idAttr.lastIndexOf('"'));
            parsedSource = parsedSource.replace(idAttr, `id="${idValue}-${this.id}"`);
        }
        const newDocument = domParser.parseFromString(parsedSource, 'text/html');
        return newDocument.body.firstChild as ElementType;
    }
}

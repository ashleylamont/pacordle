import Component from "./component";
import menuBar from './MenuBar.html?raw';

export default class MenuBar extends Component {
  // private _menuBar: HTMLElement;
  // private _menuBarTitle: HTMLElement;

  constructor(rootElement: HTMLElement) {
    super(rootElement);

    const menuBarEl = this.createElement(menuBar);
    rootElement.append(menuBarEl);
  }

  public setTitle(title: string): this {
    document.getElementById(`title-${this.id}`)!.innerHTML = title;
    return this;
  }
}

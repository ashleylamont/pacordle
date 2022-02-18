import Component from './Component';
import overlay from './Overlay.html?raw';

export default class Overlay extends Component {
  private readonly overlayElement: HTMLElement;

  constructor(root: HTMLElement, title: string, content: string) {
    super(root);

    this.overlayElement = this.createElement(overlay);

    this.overlayElement.querySelector(`#title-${this.id}`)!.innerHTML = title;
    this.overlayElement.querySelector(`#content-${this.id}`)!.innerHTML = content;

    this.overlayElement.querySelector(`#close-${this.id}`)!.addEventListener('click', () => this.close());

    this.root.append(this.overlayElement);
  }

  public close() {
    this.overlayElement.remove();
  }
}

import Component from "./Component";
import cell from './Cell.html?raw';
import {GuessResult} from "../Game";
import {startAnimation} from "../animation_util";

export default class Cell extends Component {
  public content: string = '';
  private readonly cell: HTMLElement;

  constructor(rootElement: HTMLElement) {
    super(rootElement);

    this.cell = this.createElement(cell);
    rootElement.append(this.cell);
  }

  public setContent(content: string): this {
    this.content = content.charAt(0).toUpperCase();
    if(this.cell.innerText !== this.content) {
      if (this.content) {
        startAnimation(this.cell, 'pulseBig', 0.15);
        this.cell.classList.add('border-gray-500');
        this.cell.classList.remove('border-gray-300');
      } else {
        startAnimation(this.cell, 'pulseSmall', 0.15);
        this.cell.classList.add('border-gray-300');
        this.cell.classList.remove('border-gray-500');
      }
    }
    this.cell.innerText = this.content;
    return this;
  }

  public setResult(result: GuessResult): void {
    this.cell.classList.remove('border-2', 'bg-white');
    this.cell.classList.add('text-white');
    switch (result) {
      case GuessResult.Correct:
        this.cell.classList.add('bg-correct');
        break;
      case GuessResult.Present:
        this.cell.classList.add('bg-present');
        break;
      case GuessResult.Absent:
        this.cell.classList.add('bg-absent');
        break;
      case GuessResult.Unevaluated:
        this.cell.classList.add('bg-red-200');
        break;
    }
  }
}

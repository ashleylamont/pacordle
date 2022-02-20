import Component from './Component';

export default class Keyboard extends Component {
  public readonly keyEls: Record<string, HTMLElement>;

  constructor(rootEl: HTMLElement, keyHandler: (key: string) => void) {
    super(rootEl);

    const keys = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '⌫'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '⮐'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    this.keyEls = {};

    const keyboard = document.createElement('div');
    keyboard.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'gap-1', 'mb-2');

    keys.forEach((keyboardRow) => {
      const keyboardRowEl = document.createElement('div');
      keyboardRowEl.classList.add('flex', 'flex-shrink', 'justify-center', 'items-center', 'gap-1');
      keyboardRow.forEach((key) => {
        const keyEl = document.createElement('div');
        keyEl.classList.add('bg-gray-300', 'w-7', 'h-8', 'rounded', 'text-center', 'text-gray-700', 'font-bold', 'align-middle', 'leading-8', 'cursor-pointer', 'hover:bg-gray-400');
        keyEl.textContent = key;
        keyEl.addEventListener('click', () => {
          keyHandler(key);
        });
        keyboardRowEl.appendChild(keyEl);
        this.keyEls[key] = keyEl;
      });
      keyboard.appendChild(keyboardRowEl);
    });

    this.root.appendChild(keyboard);
  }
}

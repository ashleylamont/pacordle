import Component from "./Component";
import Cell from "./Cell";
import grid from './Grid.html?raw';
import Game from "../Game";

export default class Grid extends Component {
  private readonly grid: Cell[][];
  private currentCell: number = 0;
  private game: Game;

  constructor(rootEl: HTMLElement, game: Game) {
    super(rootEl);
    this.game = game;

    this.root.append(this.createElement(grid));
    const gridTarget = document.getElementById(`grid-container-${this.id}`);

    this.grid = [];
    for (let i = 0; i < 6; i++) {
      this.grid[i] = [];
      const rowEl = document.createElement("div");
      rowEl.classList.add("flex-shrink", "flex", "flex-row", "justify-center", "gap-1");
      gridTarget?.append(rowEl);
      for (let j = 0; j < 5; j++) {
        this.grid[i][j] = new Cell(rowEl);
      }
    }
  }

  public addCharacter(character: string): void {
    this.grid[~~(this.currentCell/5)][this.currentCell%5].setContent(character);
    this.currentCell++;
    if(this.currentCell%5 === 0) {
      // Evaluate row
      let guess = '';
      for(let i = 0; i < 5; i++) {
        guess += this.grid[~~((this.currentCell-1)/5)][i].content;
      }
      const result = this.game.evaluateGuess(guess);
      for (let i = 0; i < 5; i++) {
        this.grid[~~((this.currentCell-1)/5)][i].setResult(result[i]);
      }
    }
  }

  public removeCharacter(): void {
    if(this.currentCell%5>0) {
      this.currentCell--;
      this.grid[~~(this.currentCell / 5)][this.currentCell % 5].setContent('');
    }
  }
}

import Component from "./Component";
import Cell from "./Cell";
import grid from './Grid.html?raw';
import Game from "../Game";
import type {Course} from "../Game";
import courses from '../academic_codes_shuffled.json';
import allowedWords from "../AllowedWords";
import {startAnimation} from "../animation_util";

const words = allowedWords;
courses.forEach((course: Course) => {
  words.push(course.AcademicPlanCode.toLowerCase());
});

export default class Grid extends Component {
  private readonly grid: Cell[][];
  private currentCell: number = 0;
  private game: Game;
  private rowFull: boolean = false;
  private rows: HTMLElement[] = [];

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
      this.rows.push(rowEl);
      for (let j = 0; j < 5; j++) {
        this.grid[i][j] = new Cell(rowEl);
      }
    }
  }

  public finishLine(): void {
    if(this.rowFull) {
      // Evaluate row
      let guess = '';
      for(let i = 0; i < 5; i++) {
        guess += this.grid[~~((this.currentCell-1)/5)][i].content;
      }
      if(words.includes(guess.toLowerCase())) {
        const result = this.game.evaluateGuess(guess);
        for (let i = 0; i < 5; i++) {
          this.grid[~~((this.currentCell-1)/5)][i].setResult(result[i]);
        }
        this.rowFull = false;
      }else{
        console.warn(`${guess} is not a valid word`);
        const row = this.rows[~~((this.currentCell-1)/5)];
        console.log(row);
        startAnimation(row, 'headShake', 0.5);
      }
    }

  }

  public addCharacter(character: string): void {
    if(!this.rowFull){
      this.grid[~~(this.currentCell/5)][this.currentCell%5].setContent(character);
      this.currentCell++;
      if(this.currentCell%5 === 0) {
        this.rowFull = true;
      }
    }
  }

  public removeCharacter(): void {
    if(this.currentCell%5>0 || this.rowFull) {
      this.currentCell--;
      this.grid[~~(this.currentCell / 5)][this.currentCell % 5].setContent('');
      this.rowFull = false;
    }
  }
}

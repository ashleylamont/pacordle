import { Fireworks } from 'fireworks-js';
import Component from './Component';
import Cell from './Cell';
import grid from './Grid.html?raw';
import type { Course } from '../Game';
import Game, { GuessResult } from '../Game';
import courses from '../academic_codes_shuffled.json';
import allowedWords from '../AllowedWords';
import startAnimation from '../startAnimation';
import Overlay from './Overlay';

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

  private gameOver: boolean = false;

  constructor(rootEl: HTMLElement, game: Game) {
    super(rootEl);
    this.game = game;

    this.root.append(this.createElement(grid));
    const gridTarget = document.getElementById(`grid-container-${this.id}`);

    this.grid = [];
    for (let i = 0; i < 6; i++) {
      this.grid[i] = [];
      const rowEl = document.createElement('div');
      rowEl.classList.add('flex-shrink', 'flex', 'flex-row', 'justify-center', 'gap-1');
      gridTarget?.append(rowEl);
      this.rows.push(rowEl);
      for (let j = 0; j < 5; j++) {
        this.grid[i][j] = new Cell(rowEl);
      }
    }
  }

  public finishLine(): void {
    if (this.gameOver) return;

    if (this.rowFull) {
      // Evaluate row
      let guess = '';
      for (let i = 0; i < 5; i++) {
        guess += this.grid[~~((this.currentCell - 1) / 5)][i].content;
      }
      if (words.includes(guess.toLowerCase())) {
        this.handleGuess(guess);
      } else {
        console.warn(`${guess} is not a valid word`);
        const row = this.rows[~~((this.currentCell - 1) / 5)];
        startAnimation(row, 'headShake', 0.5);
      }
    }
  }

  private handleGuess(guess: string) {
    const result = this.game.evaluateGuess(guess);
    let victory = true;
    for (let i = 0; i < 5; i++) {
      if (result[i] !== GuessResult.Correct) victory = false;

      this.grid[~~((this.currentCell - 1) / 5)][i].setResult(result[i]);
    }
    if (victory) {
      this.gameOver = true;
      console.log('Victory!');
      // Show fireworks
      const container = document.getElementById('fireworks-container');

      if (container) {
        const fireworks = new Fireworks(container);

        fireworks.setOptions({
          opacity: 1,
          speed: 0.1,
        });

        fireworks.start();

        const overlay = new Overlay(
          this.root,
          'You win!',
          `You guessed ${this.game.targetWord}! 
        The degree was a ${this.game.targetCourse.Duration} year 
        ${this.game.targetCourse.CareerText} program called 
        ${this.game.targetCourse.ProgramName}!`,
        );
        console.log(overlay);
      } else {
        console.warn('Could not find container to show fireworks');
      }
    }
    this.rowFull = false;

    if (this.currentCell >= this.grid.length * 5) {
      console.log('Game over');
      this.gameOver = true;

      const overlay = new Overlay(
        this.root,
        'You lose!',
        `You were looking for ${this.game.targetWord}! 
        The degree was a ${this.game.targetCourse.Duration} year 
        ${this.game.targetCourse.CareerText} program called 
        ${this.game.targetCourse.ProgramName}!`,
      );
      console.log(overlay);
    }
  }

  public addCharacter(character: string): void {
    if (this.gameOver) return;

    if (!this.rowFull) {
      this.grid[~~(this.currentCell / 5)][this.currentCell % 5].setContent(character);
      this.currentCell += 1;
      if (this.currentCell % 5 === 0) {
        this.rowFull = true;
      }
    }
  }

  public removeCharacter(): void {
    if (this.gameOver) return;

    if (this.currentCell % 5 > 0 || this.rowFull) {
      this.currentCell -= 1;
      this.grid[~~(this.currentCell / 5)][this.currentCell % 5].setContent('');
      this.rowFull = false;
    }
  }
}

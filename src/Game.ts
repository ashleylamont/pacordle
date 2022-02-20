import courses from './academic_codes_shuffled.json';
import Keyboard from './components/Keyboard';

export interface Course {
  AcademicPlanCode: string;
  ProgramName: string;
  CareerText: string;
  Duration: number;
}

export enum GuessResult {
  Correct,
  Present,
  Absent,
  Unevaluated,
}

export default class Game {
  public readonly targetWord: string;

  public readonly targetCourse: Course;

  private keyboard: Keyboard | null = null;

  constructor() {
    const dayNumber = ~~(Date.now() / 86_400_000);
    const course = courses[dayNumber % courses.length];
    this.targetWord = course.AcademicPlanCode;
    this.targetCourse = course;
    console.log(`Target word: ${this.targetWord}`);
  }

  public evaluateGuess(guess: string): GuessResult[] {
    const result: GuessResult[] = [];
    if (guess.length !== 5) {
      throw new Error('Guess must be 5 characters long');
    }

    const charFreq: Record<string, number> = {};
    for (let i = 0; i < 5; i++) {
      const char = this.targetWord[i];
      if (!charFreq[char]) {
        charFreq[char] = 0;
      }
      charFreq[char] += 1;
      result.push(GuessResult.Unevaluated);
    }

    // First pass, find direct matches or missing characters
    for (let i = 0; i < 5; i++) {
      const guessChar = guess[i];
      const targetChar = this.targetWord[i];

      if (guessChar === targetChar) {
        result[i] = GuessResult.Correct;
        charFreq[guessChar] -= 1;
      } else if (!charFreq[guessChar]) {
        result[i] = GuessResult.Absent;
      }
    }

    // Second pass, find present characters
    for (let i = 0; i < 5; i++) {
      const guessChar = guess[i];
      if (result[i] === GuessResult.Unevaluated && charFreq[guessChar]) {
        result[i] = GuessResult.Present;
      } else if (result[i] === GuessResult.Unevaluated) {
        result[i] = GuessResult.Absent;
      }
    }

    if (this.keyboard) {
      // Check results to see if keyboard needs to be updated
      for (let i = 0; i < 5; i++) {
        const letter = guess[i].toUpperCase();
        const key = this.keyboard.keyEls[letter];

        let currentState: GuessResult = GuessResult.Unevaluated;
        if (key.classList.contains('bg-correct')) {
          currentState = GuessResult.Correct;
        } else if (key.classList.contains('bg-present')) {
          currentState = GuessResult.Present;
        } else if (key.classList.contains('bg-absent')) {
          currentState = GuessResult.Absent;
        }

        const newState = result[i];

        if (newState < currentState) {
          key.classList.remove('bg-gray-300', 'bg-correct', 'bg-present', 'bg-absent', 'text-gray-700');
          console.log('Setting key', letter, 'to', newState, key);
          key.classList.add('text-gray-100');
          switch (newState) {
            case GuessResult.Correct:
              key.classList.add('bg-correct');
              break;
            case GuessResult.Present:
              key.classList.add('bg-present');
              break;
            case GuessResult.Absent:
              key.classList.add('bg-absent');
              break;
              // skip default
          }
        }
      }
    }

    return result;
  }

  public setKeyboard(keyboard: Keyboard) {
    this.keyboard = keyboard;
  }
}

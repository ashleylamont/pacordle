import courses from './academic_codes_shuffled.json';

export interface Course {
  AcademicPlanCode:    string;
  ProgramName:         string;
  CareerText:          string;
  Duration:            number;
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

  constructor() {
    const dayNumber = ~~(Date.now()/86_400_000);
    const course = courses[dayNumber % courses.length];
    this.targetWord = course.AcademicPlanCode;
    this.targetCourse = course;
    console.log(`Target word: ${this.targetWord}`);
  }

  public evaluateGuess(guess: string): GuessResult[] {
    let result: GuessResult[] = [];
    if(guess.length !== 5) {
      throw new Error('Guess must be 5 characters long');
    }

    const charFreq: Record<string, number> = {};
    for(let i = 0; i < 5; i++) {
      const char = this.targetWord[i];
      if(!charFreq[char]) {
        charFreq[char] = 0;
      }
      charFreq[char]++;
      result.push(GuessResult.Unevaluated);
    }

    // First pass, find direct matches or missing characters
    for(let i = 0; i < 5; i++){
      const guessChar = guess[i];
      const targetChar = this.targetWord[i];

      if(guessChar === targetChar){
        result[i] = GuessResult.Correct;
        charFreq[guessChar]--;
      } else if(!charFreq[guessChar]) {
        result[i] = GuessResult.Absent;
      }
    }

    // Second pass, find present characters
    for(let i = 0; i < 5; i++){
      const guessChar = guess[i];
      if(result[i] === GuessResult.Unevaluated && charFreq[guessChar]) {
        result[i] = GuessResult.Present;
      }else if(result[i] === GuessResult.Unevaluated) {
        result[i] = GuessResult.Absent;
      }
    }

    return result;
  }
}

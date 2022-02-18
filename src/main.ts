import './style.scss';
import 'animate.css';
import MenuBar from './components/MenuBar';
import Grid from './components/Grid';
import Game from './Game';
import Overlay from './components/Overlay';

const app = document.querySelector<HTMLDivElement>('#app')!;
new MenuBar(app).setTitle('PACordle');
const game = new Game();
const grid = new Grid(app, game);
const overlay = new Overlay(app, 'Welcome to PACordle!', 'Did you ever wish Wordle '
    + 'could be worse? Well now it is! PACordle is like Wordle, but all the answers are degree '
    + 'codes from ANU Programs and Courses, so it\'s stupid hard to guess 😆. Good luck!');
console.log(overlay);

// Add fireworks container.
const fireworksContainer = document.createElement('div');
fireworksContainer.id = 'fireworks-container';
app.appendChild(fireworksContainer);

document.addEventListener('keydown', (e) => {
  if (e.code.startsWith('Key')) {
    grid.addCharacter(e.key);
  } else if (e.code === 'Backspace') {
    grid.removeCharacter();
  } else if (e.key === 'Enter') {
    grid.finishLine();
  }
});

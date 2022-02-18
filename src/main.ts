import './style.scss'
import MenuBar from "./components/MenuBar";
import Grid from "./components/Grid";
import Game from "./Game";

const app = document.querySelector<HTMLDivElement>('#app')!
new MenuBar(app).setTitle('PACordle');
const game = new Game();
const grid = new Grid(app, game);

document.addEventListener('keydown', (e) => {
    if (e.code.startsWith('Key')){
      grid.addCharacter(e.key);
    } else if (e.code === 'Backspace'){
      grid.removeCharacter();
    }
});

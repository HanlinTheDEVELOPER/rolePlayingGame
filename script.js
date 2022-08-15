import characterData from "./data.js";
import Character from "./Character.js";

//for renden new monster after one die
let monsterArray = ["orc", "demon", "goblin"];

const getNewMonster = () =>
  monsterArray.length > 0
    ? new Character(characterData[monsterArray.shift()])
    : {};

//end

//for rendering characters
let monster = getNewMonster();
const wizard = new Character(characterData.hero);

const render = () => {
  document.getElementById("hero").innerHTML = wizard.renderChar();
  document.getElementById("monster").innerHTML = monster.renderChar();
};
//end

//attack button functionality
const attack = () => {
  wizard.getDeiceRollHtml();
  monster.getDeiceRollHtml();
  wizard.takeDamage(monster.currentDiceScore);
  monster.takeDamage(wizard.currentDiceScore);
  render();
  if (wizard.health == 0) {
    endGame();
  } else if (monster.health == 0) {
    document.getElementById("attack-button").style.visibility = "hidden";
    if (monsterArray.length > 0) {
      setTimeout(() => {
        monster = getNewMonster();
        document.getElementById("attack-button").style.visibility = "visible";
        render();
      }, 1500);
    } else {
      endGame();
    }
  }
};
//end

//check if one of character die and end the game
const endGame = () => {
  const endGameNotice =
    wizard.health === 0 && monster.health === 0
      ? "No Victious: Both are dead!"
      : wizard.health > 0
      ? "Wizard is Victorious"
      : "monster is Victious!";
  const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
  setTimeout(() => {
    document.getElementById("id").innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endGameNotice}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                <button id="restart-button">Restart</button>
                `;
    //for restarting the game
    document.getElementById("restart-button").onclick = () => history.go(0);
  }, 1500);
};

//end

document.getElementById("attack-button").onclick = attack;

render();

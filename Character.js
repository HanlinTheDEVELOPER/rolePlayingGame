import {
  getDeiceRoll,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

class Character {
 constructor(data) {
   Object.assign(this, data);

  this.maxHealth = this.health;

  this.diceArray = getDicePlaceholderHtml(this.diceCount);
 }
  getDeiceRollHtml = () => {
    this.currentDiceScore = getDeiceRoll(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((each) => `<div class="dice">${each}</div>`)
      .join(" ");
  };
  takeDamage = (attackPoint) => {
    const totalDamage = attackPoint.reduce(
      (total, eachDamage) => total + eachDamage
    );
    this.health -= totalDamage;
    this.health = this.health <= 0 ? 0 : this.health;
  };
  getHealthBarHtml = () => {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 && "danger"} " 
            style="width: ${percent}%;">
            </div>
        </div>`;
  };
  renderChar = () => {
    const { name, avatar, health, diceArray } = this;
    const healthBar = this.getHealthBarHtml();

    return `
  <div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}" />
            <div class="health">health: <b> ${health} </b></div>
            ${healthBar}
            <div class="dice-container">
                ${diceArray}
            </div>
        </div>
  `;
  };
}


export default Character;

//to get the random attack points
const getDeiceRoll = (diceCount) => {
  return new Array(diceCount)
    .fill(0)
    .map((each) => Math.floor(Math.random() * 6) + 1);
};
//end

//to show the blank as blank point at the start
const getDicePlaceholderHtml = (diceCount) => {
  return new Array(diceCount)
    .fill(0)
    .map((each) => `<div class="placeholder-dice"></div>`)
    .join(" ");
};
//end

//to get percentage of HP
const getPercentage = (remainHealth, maxHealth) =>
  (100 * remainHealth) / maxHealth;
//end

export { getDeiceRoll, getDicePlaceholderHtml, getPercentage };

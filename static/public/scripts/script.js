// import Swing from 'swing';
// const Swing = require("swing");

console.log("script linked");
const config = {
  /**
   * Invoked in the event of dragmove.
   * Returns a value between 0 and 1 indicating the completeness of the throw out condition.
   * Ration of the absolute distance from the original card position and element width.
   *
   * @param {number} xOffset Distance from the dragStart.
   * @param {number} yOffset Distance from the dragStart.
   * @param {HTMLElement} element Element.
   * @returns {number}
   */
  throwOutConfidence: (xOffset, yOffset, element) => {
    const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
    const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);

    return Math.max(xConfidence, yConfidence);
  },
};

//swing
const div = document.getElementById("cardDiv")
const stack = Swing.Stack(config);
const card = stack.createCard(div);

card.throwOut(Direction.LEFT, 0);
card.throwOut(Direction.RIGHT, 0);

stack.on("throwout", () => {
  
  console.log("Card has been thrown out of the stack.");

});
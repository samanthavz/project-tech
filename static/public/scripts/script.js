console.log("script linked");

// const bone = document.getElementById("bone");

// // Bone Listeners
// bone.addEventListener('dragstart', dragStart);
// bone.addEventListener("dragend", dragEnd);

// // Drag Functions
// function dragStart() {
//   console.log('start');
// }

// function dragEnd() {
//   console.log('End');
// }

const button = document.getElementById("infoButton");
const content = document.getElementById("overlay");
const closeIt = document.getElementById("close");

button.addEventListener("click", showTip)
closeIt.addEventListener("click", closeTip);

function showTip() {
  content.style.display = "block"
};

function closeTip() {
  content.style.display = "none"
};
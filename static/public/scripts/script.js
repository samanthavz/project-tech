console.log("script linked");

const bone = document.getElementById("bone");

// Bone Listeners
bone.addEventListener('dragstart', dragStart);
bone.addEventListener("dragend", dragEnd);

// Drag Functions
function dragStart() {
  console.log('start');
}

function dragEnd() {
  console.log('End');
}



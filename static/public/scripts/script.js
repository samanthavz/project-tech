//sources:
//sound effects: https://www.myinstants.com/index/nl/


//check connection
console.log("script linked");

  //info popup
  const button = document.getElementById("infoButton");
  const content = document.getElementById("overlay");
  const closeIt = document.getElementById("close");

  button.addEventListener("click", showTip);
  closeIt.addEventListener("click", closeTip);

  function showTip() {
    content.style.display = "block";
  }

  function closeTip() {
    content.style.display = "none";
  }


  //sound eastereggs
  const likeButton = document.getElementById("bone");
  likeButton.addEventListener("click", sound);
  likeButton.addEventListener("mouseover", wiggle);

  const dogImg = document.getElementById("dogImg");
  dogImg.addEventListener("click", sound2);

  function sound() {
    var audio = new Audio("./files/nom.mp3");
    audio.volume = 0.05;
    audio.play();
  }

  function wiggle() {

  }

  function sound2() {
    var audio = new Audio("./files/bark.mp3");
    audio.volume = 0.1;
    audio.play();
  }

const infoDog = document.getElementById("infodog")

//jumping dog
setInterval(hop, 4000);

function hop() {
  infoDog.style.marginBottom = "3em"
  setTimeout(down, 100);
}

function down () {
  infoDog.style.marginBottom = "0";
}



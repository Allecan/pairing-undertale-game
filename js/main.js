import "../css/style.css";

const cards = document.querySelectorAll(".card");
const btnStart = document.querySelector(".btn");
const boxInfo = document.querySelector(".info");
const flipCardSound = new Audio("../sounds/healthOk.mp3");
const flipCardSoundDoggo = new Audio("../sounds/dogResidue.mp3");
const flipCardSoundChara = new Audio("../sounds/KillAttack.mp3");
const flipCardErr = new Audio("../sounds/damgeFail.mp3");
const flipCardOk = new Audio("../sounds/goodChoose.mp3");
const dontTouchTheChild = new Audio("../sounds/dontTouchTheChild.mp3");
const wingame = new Audio("../sounds/Oh Yes.mp3");
const bgSound = new Audio("../sounds/Dummy-bg-sound.mp3");
const loseSound = new Audio("../sounds/looseHeartbreaking.mp3");
const url = window.location.origin;

let cardOne, cardTwo;
let matched = 0;
let disableDeck = false;

function flipCard(card) {
  if (!disableDeck) {
    card.classList.add("flip");
    // http://localhost:3000/cards/FriskCard.png

    let cardName = card
      .querySelector(".front-view img")
      .src.replace(url + "/cards/", "");

    if (cardName === "DoggoCard.png") {
      flipCardSoundDoggo.play();
      flipCardSoundDoggo.currentTime = 0;
    } else if (cardName === "CharaKillCard.png") {
      flipCardSoundChara.play();
      flipCardSoundChara.currentTime = 0;
      setTimeout(() => {
        bgSound.pause();
        loseSound.play();
        loseSound.currentTime = 0;
        boxInfo.style.color = "red";
        boxInfo.innerHTML = "Has perdido :)";
        setTimeout(() => {
          document.location.reload(true);
        }, 4000);
      }, 700);
    } else if (cardName === "FriskCard.png") {
      dontTouchTheChild.play();
      dontTouchTheChild.currentTime = 0;
      dontTouchTheChild.volume = 0.3;
      disableDeck = true;
      setTimeout(() => {
        cardOne = "";
        cardTwo = "";
        card.classList.remove("flip");
        disableDeck = false;
      }, 2000);
    } else {
      flipCardSound.play();
      flipCardSound.currentTime = 0;
    }
    if (!cardOne) {
      return (cardOne = card);
    }
    cardTwo = card;
    disableDeck = true;
    matchCards();
  }
}

function matchCards() {
  let cardOneImg = cardOne
    .querySelector(".front-view img")
    .src.replace(url + "/cards/", "");
  let cardTwoImg = cardTwo
    .querySelector(".front-view img")
    .src.replace(url + "/cards/", "");
  if (cardOneImg === cardTwoImg) {
    matched += 1;
    setTimeout(() => {
      flipCardOk.play();
      flipCardOk.currentTime = 0;
      if (matched == 4) {
        bgSound.pause();
        wingame.play();
        wingame.currentTime = 0;
        boxInfo.innerHTML = "Has ganado \n * Te llena de determinacion *";
        setTimeout(() => {
          document.location.reload(true);
        }, 4000);
      }
    }, 700);
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    flipCardErr.play();
    flipCardErr.currentTime = 0;
    disableDeck = false;
    cardOne.classList.remove("flip");
    cardTwo.classList.remove("flip");
    cardOne = cardTwo = "";
  }, 700);
}
function iniciarJuego() {
  btnStart.style.display = "none";
  boxInfo.style.display = "block";
  bgSound.play();
  bgSound.currentTime = 0;
  bgSound.loop = true;
  bgSound.volume = 0.1;
  cards.forEach((card) => {
    matched = 0;
    cardOne = cardTwo = "";
    card.classList.remove("flip");
    card.removeEventListener("click", function () {
      flipCard(card);
    });
    card.addEventListener("click", function () {
      flipCard(card);
    });
  });
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 10);
    card.style.order = ramdomPos;
  });
}
boxInfo.style.display = "none";
btnStart.addEventListener("click", iniciarJuego);
// iniciarJuego();

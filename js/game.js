const grid = document.querySelector(".grid");
const errorSound = document.getElementById("error-sound");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
  "caetano",
  "cafe",
  "danca",
  "diabo",
  "gato",
  "morte",
  "nazare",
  "sangue",
  "senhora",
  "vieira",
  "vizinho",
  "xuxa",
];

const sounds = {
  xuxa: "sound/xuxa.mp3",
  caetano: "sound/caetano.mp3",
  cafe: "sound/quero-cafe.mp3",
  danca: "sound/meme-caixao.mp3",
  diabo: "sound/morre-diabo.mp3",
  gato: "sound/bari-papa.mp3",
  morte: "sound/amostradinho.mp3",
  nazare: "sound/risada-nazare.mp3",
  sangue: "sound/sangue-de-jesus.mp3",
  senhora: "sound/senhora.mp3",
  vieira: "sound/datena-cadeirada.mp3",
  vizinho: "sound/halloween.mp3",
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";
let currentTime = 0;
let loop;

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === characters.length * 2) {
    clearInterval(interval);

    const music = document.getElementById("bgMusic");
    if (music) {
      music.pause();
      music.currentTime = 0;

      const allCards = document.querySelectorAll(".card");
      allCards.forEach((card) => card.classList.add("reveal-card"));

      setTimeout(() => {
        window.alert(
          `🎉 Parabéns, ${spanPlayer.innerHTML} você venceu! ⏱ Tempo: ${timer.innerHTML}`
        );
        resetGame();
      }, 500);
    }
  }
};

const resetGame = () => {
  clearInterval(interval);

  totalSeconds = 0;
  timer.innerHTML = "00:00";

  grid.innerHTML = "";

  loadGame();
  startTimer();
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    if (sounds[firstCharacter]) {
      const audio = new Audio(sounds[firstCharacter]);
      audio.volume = 0.7;
      audio.play();
    }

    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      errorSound.currentTime = 0;
      errorSound.play();

      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url(images/${character}.jpeg)`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const duplicatedCharacters = [...characters, ...characters];

  const shuffledArray = duplicatedCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

let totalSeconds = 0;
let interval;

const startTimer = () => {
  interval = setInterval(() => {
    totalSeconds++;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime =
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    timer.innerHTML = formattedTime;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");

  startTimer();
  loadGame();
};

window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  const muteBtn = document.getElementById("muteBtn");
  const muteIcon = document.getElementById("muteIcon");

  let isMuted = true;
  music.volume = 0.2;

  muteBtn.addEventListener("click", () => {
    if (isMuted) {
      music.play(); 
      music.volume = 0.2;
      muteIcon.src = "images/com-som.png";
      muteIcon.alt = "Som ligado";
      isMuted = false;
    } else {
      music.pause(); 
      muteIcon.src = "images/sem-som.png";
      muteIcon.alt = "Som desligado";
      isMuted = true;
    }
  });
});
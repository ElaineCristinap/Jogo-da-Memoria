const grid = document.querySelector(".grid");
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

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 24) {
    clearInterval(interval);
    alert(
      `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`
    );
    resetGame();
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
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("revel-card");
      secondCard.classList.remove("revel-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("revel-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("revel-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("revel-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url(../images/${character}.jpeg)`;

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
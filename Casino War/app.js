// Select dealer elements
const dealersCard = document.querySelector(".dealer-card");
const dealersCardTxt = document.querySelector(".dealer-card-txt");

// Select player elements
const playersCard = document.querySelector(".player-card");
const playerCardTxt = document.querySelector(".player-card-txt");

// Select the button element
const dealBtn = document.querySelector(".deal-button");

// Select the countdown element
const countdownElement = document.getElementById("countdown");

// Card combinations
const cardValues = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "jack",
  "queen",
  "king",
  "ace",
  "joker",
];
const cardSuits = ["clubs", "spades", "hearts", "diamonds"];

// Trigger function on button click
dealBtn.addEventListener("click", dealCards);

// dealCards function
function dealCards() {
  // Initialize countdown
  let countdown = 3;
  countdownElement.style.display = "block";
  countdownElement.textContent = countdown;

  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownElement.textContent = countdown;
    } else {
      clearInterval(countdownInterval);
      countdownElement.style.display = "none";
      createCards();
    }
  }, 1000);
}

function createCards() {
  // Randomly select symbols and values for both player and dealer
  const dealersValue = Math.floor(Math.random() * cardValues.length);
  const dealersSuit = Math.floor(Math.random() * cardSuits.length);

  const playersValue = Math.floor(Math.random() * cardValues.length);
  const playersSuit = Math.floor(Math.random() * cardSuits.length);

  // Check if cards are Jokers
  const isDealerJoker = cardValues[dealersValue] === "joker";
  const isPlayerJoker = cardValues[playersValue] === "joker";

  // Create new dealer card
  if (isDealerJoker) {
    dealersCard.src = `assets/black_joker.png`;
    dealersCardTxt.textContent = `Dealer: Joker`;
  } else {
    dealersCard.src = `assets/${cardValues[dealersValue]}_of_${cardSuits[dealersSuit]}.png`;
    dealersCardTxt.textContent = `Dealer: ${cardValues[dealersValue]} of ${cardSuits[dealersSuit]}`;
  }

  // Create new player card
  if (isPlayerJoker) {
    playersCard.src = `assets/red_joker.png`;
    playerCardTxt.textContent = `You: Joker`;
  } else {
    playersCard.src = `assets/${cardValues[playersValue]}_of_${cardSuits[playersSuit]}.png`;
    playerCardTxt.textContent = `You: ${cardValues[playersValue]} of ${cardSuits[playersSuit]}`;
  }

  checkWinner(playersValue, dealersValue, isPlayerJoker, isDealerJoker);
}

function checkWinner(pval, dval, isPlayerJoker, isDealerJoker) {
  countdownElement.style.display = "block";

  // Jokers always beat regular cards
  if (isPlayerJoker && !isDealerJoker) {
    countdownElement.textContent = "Player wins this hand! (Joker)";
  } else if (isDealerJoker && !isPlayerJoker) {
    countdownElement.textContent = "Dealer wins this hand! (Joker)";
  } else if (isPlayerJoker && isDealerJoker) {
    countdownElement.textContent = "Tie! (Two Jokers)";
  } else if (pval > dval) {
    countdownElement.textContent = "Player wins this hand!";
  } else if (pval === dval) {
    countdownElement.textContent = "Tie!";
  } else {
    countdownElement.textContent = "Dealer wins this hand!";
  }

  // Hide the message after 3 seconds
  setTimeout(() => {
    countdownElement.style.display = "none";
  }, 3000);
}

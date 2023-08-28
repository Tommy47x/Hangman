let copyLetters; // Global variables defined here
let remainingAttempts = 7;
let randomWord = "";
let guessedWord = "";
let resultContainer = null;
let wordContainer = null;
let attemptsContainer = null;


function startGame() {

  copyLetters = document.getElementById("letters-used");
  copyLetters.textContent = "Used letters:"; // Reset letters
  remainingAttempts = 7; //Reset attempts
  document.getElementById
    ("guess-button").disabled = false; // Reset 'Start'
  const words = ["wellcode", "programming", "tommy", "wisdom",
    "javascript", "frontend"];
  randomWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = "_".repeat(randomWord.length);
  resultContainer = document.getElementById("result");
  resultContainer.innerHTML = ""; // Reset in-page message
  wordContainer = document.getElementById("word-container");
  wordContainer.textContent = guessedWord.split("").join(" ");
  attemptsContainer = document.getElementById("attempts");
  attemptsContainer.textContent = ""; // Reset in-page attempts

}

function guessLetter() {

  //Input + Restrictions
  let guessedLetterInput = document.getElementById("input-text");
  let guessedLetter = guessedLetterInput.value.toLowerCase();
  if (guessedLetter.length !== 1 || !guessedLetter.match(/[a-z]/i)) {
    alert("Please enter a single valid letter.");
    guessedLetterInput.value = "";
    return;
  }
  let lettersUsed = document.getElementById("letters-used");
  let found = false; // For decreasing attempts
  let updatedGuessedWord = "";
  for (let i = 0; i < randomWord.length; ++i) { // Verifying letters
    if (randomWord[i] === guessedLetter) {
      updatedGuessedWord += guessedLetter;
      found = true;
    } else {
      updatedGuessedWord += guessedWord[i];
    }
  }
  if (updatedGuessedWord === randomWord) { // Message Succes
    document.getElementById
      ("guess-button").disabled = true;
    resultContainer.innerHTML =
      `<p class="text-success">You won! The word was "${randomWord}".</p> `;
  }

  if (!found) {
    --remainingAttempts; //Decrease attempts
  }

  if (remainingAttempts === 0) { // Message Fail
    document.getElementById("guess-button").disabled = true;
    resultContainer.innerHTML = `
      <p class="text-danger">Game over! The word was "${randomWord}". Press 'Start' to try again!</p>`;
  }
  lettersUsed.textContent += guessedLetter + " "; // In-page letters
  guessedWord = updatedGuessedWord; // In-page letter replacement
  wordContainer.textContent = guessedWord.split("").join(" ");// In-page letter replacement
  guessedLetterInput.value = ""; // Reset input
  attemptsContainer.textContent = `Remaining attempts:
  ${remainingAttempts}`;

}

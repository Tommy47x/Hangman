let usedLetters; // In-page shown letters
let remainingAttempts = 7; // Number of attempts, 0 = fail
let randomWord = ""; // var. for algorithm of choosing random word
let guessedWord = ""; // replacement with '_'

function startGame() { //Function called on 'Start' button
  usedLetters = document.getElementById("letters-used");// In-page shown letters
  usedLetters.textContent = "Used letters:"; // Reset 
  remainingAttempts = 7; // Reset
  document.getElementById("guess-button").disabled = false; // Reset Button
  const words = ["wellcode", "programming", "tommy", "wisdom", "javascript", "frontend"];
  randomWord = words[Math.floor(Math.random() * words.length)]; //Algorithm choosing the word
  guessedWord = "_".repeat(randomWord.length); // Replacement with '_'
  document.getElementById("result").innerHTML = ""; // Reset
  document.getElementById("word-container").textContent = guessedWord.split("").join(" "); // Hidden word in-page
  document.getElementById("attempts").textContent = ""; // Reset
}

function validateInput(guessedLetter) { // Restrictions for input
  const restrictionInput = document.getElementById("alerting");
  if (guessedLetter.length !== 1 || !guessedLetter.match(/[a-z]/i)) {
    restrictionInput.textContent = "Please enter a single valid letter";
    return false;
  }
  restrictionInput.textContent = " ";
  return true;
}

function updateGame(guessedLetter) {// Function that verifies letters
  let found = false; // For decreasing attempts
  let updatedGuessedWord = "";
  for (let i = 0; i < randomWord.length; ++i) {
    if (randomWord[i] === guessedLetter) {
      updatedGuessedWord += guessedLetter; // Adds correct letters for '____' word
      found = true;
    } else {
      updatedGuessedWord += guessedWord[i];
    }
  }

  if (updatedGuessedWord === randomWord) { // Winner message
    document.getElementById("guess-button").disabled = true; // Disabling button
    document.getElementById("result").innerHTML =
      `<p class="text-success">You won! The word was "${randomWord}".</p> `;
  }

  if (!found) { // Decrease attempts
    --remainingAttempts;
  }

  if (remainingAttempts === 0) { // Loser message
    document.getElementById("guess-button").disabled = true; // Disabling button
    document.getElementById("result").innerHTML = `
      <p class="text-danger">Game over! The word was "${randomWord}". Press 'Start' to try again!</p>`;
  }

  guessedWord = updatedGuessedWord; // Var. for changing in-page letters, to match the word
  document.getElementById("word-container").textContent = guessedWord.split("").join(" "); // In-page letters
  document.getElementById("attempts").textContent = `Remaining attempts: ${remainingAttempts}`; // Attempts
}

function guessLetter() { // Final function that enables all functions (Exception: StartGame)
  const guessedLetterInput = document.getElementById("input-text"); 
  const guessedLetter = guessedLetterInput.value.toLowerCase();

  if (validateInput(guessedLetter)) {
    updateGame(guessedLetter);
    usedLetters.textContent += guessedLetter + " ";
    guessedLetterInput.value = ""; // Reset Input
  }
  guessedLetterInput.value = ""; // Reset Input for mistakes
}

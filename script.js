const wordList = [
    {
        word: "Ramen",
        hint: "Lo primero que fuimos a cenar juntos"
    },
    {
        word: "Minecraft",
        hint: "Juego que empezamos a jugar y encontramos diamantes"
    },
    {
        word: "Gafas",
        hint: "cosa que tenemos los dos pero no necesitamos usar"
    },
    {
        word: "Chuche",
        hint: "comida dulce que te encanta"
    },
    {
        word: "Memes",
        hint: "mensajes divertidos que nos mandamos por insta"
    },
    {
        word: "Fumar",
        hint: "Tu deporte favorito"
    },
    {
        word: "uwu",
        hint: "emoji adorable"
    }
];
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

let currentWord, correctLetters, wrongGuessCount;
let palabra = 0;
const maxGuesses = 6;

const random = false;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-0.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {

    const { word, hint } = random ? wordList[Math.floor(Math.random() * wordList.length)] : wordList[palabra];
    currentWord = word.toLocaleLowerCase();
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    if (isVictory) {
        wordList.shift();
    }
    if (wordList.length > 0) {

        let modalText = isVictory ? `Has encontrado la palabra` : 'Vuelve a intentarlo';
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = isVictory ? 'Enhorabuena!' : 'Game Over!';
        gameModal.querySelector("p").innerHTML = `${modalText} `;
        gameModal.classList.add("show");
    }else{
        let modalText = `de regalo déjame invitarte a cenar algún dia 💓`;
        gameModal.querySelector("h4").innerText = '¡Has completado el juego!';
        gameModal.querySelector("img").src = `images/victory.gif`;
        gameModal.querySelector("p").innerHTML = `${modalText}`;
        gameModal.querySelector("button").style.display = 'none';
        gameModal.classList.add("show");
    }
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

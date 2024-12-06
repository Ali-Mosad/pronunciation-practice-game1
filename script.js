// Word sets for different categories and difficulty levels
const words = {
    common: [
        { word: 'cat', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/c/cat001.mp3', tip: 'Pay attention to the short "a" sound.' },
        { word: 'dog', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/d/dog001.mp3', tip: 'Practice the "o" sound as in "hot".' },
        { word: 'fish', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/f/fish001.mp3', tip: 'The "sh" sound is soft, like a whisper.' }
    ],
    difficult: [
        { word: 'squirrel', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/s/squirre01.mp3', tip: 'Try breaking it down into "squi-rr-el".' },
        { word: 'thorough', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/t/thoroug01.mp3', tip: 'The "ough" can be tricky—make it sound like "thur-uh".' },
        { word: 'mischievous', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/m/mischie01.mp3', tip: 'Emphasize the first syllable: "MIS-chie-vous".' }
    ],
    advanced: [
        { word: 'entrepreneur', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/e/entrepr01.mp3', tip: 'Practice saying it in syllables: "en-tre-pre-neur".' },
        { word: 'phenomenon', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/p/phenome01.mp3', tip: 'Stress the middle syllable: "phe-NOM-e-non".' },
        { word: 'anemone', audio: 'https://www.merriam-webster.com/audio/prons/en/us/mp3/a/anemone01.mp3', tip: 'The "e" is like "uh" and the "o" is silent: "uh-NEM-o-nee".' }
    ]
};

// Select elements from the HTML
const wordDisplay = document.getElementById('word');
const feedback = document.getElementById('feedback');
const startButton = document.getElementById('start-button');
const scoreValue = document.getElementById('score-value');
const audioElement = document.getElementById('word-audio');
const playAudioButton = document.getElementById('play-audio');

let currentScore = 0;
let currentWordSet = [];
let currentWord = {};

// Display a random word from the selected category and difficulty
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * currentWordSet.length);
    return currentWordSet[randomIndex];
}

// Display the chosen word
function displayWord() {
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord.word;
    audioElement.src = currentWord.audio;
}

// Start the game and set up the word set
function startGame() {
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    
    currentWordSet = words[category];
    displayWord();

    startButton.enabled = true;
    playAudioButton.enabled = true;
}

// Function to start speech recognition
function startRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Sorry, your browser does not support speech recognition.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onresult = (event) => {
        const spokenWord = event.results[0][0].transcript.toLowerCase();
        const correctWord = currentWord.word.toLowerCase();

        if (spokenWord === correctWord) {
            feedback.textContent = 'Correct! Great job!';
            feedback.style.color = 'green';
            currentScore++;
            scoreValue.textContent = currentScore;
            setTimeout(() => {
                displayWord();
                feedback.textContent = '';
            }, 2000);
        } else {
            feedback.textContent = `Try again! You said: "${spokenWord}". Tip: ${currentWord.tip}`;
            feedback.style.color = 'red';
        }
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
        feedback.textContent = 'Error occurred. Please try again.';
        feedback.style.color = 'red';
    };
}

// Play the audio pronunciation of the word
playAudioButton.addEventListener('click', () => {
    audioElement.play();
});

// Start the game when the "Start Practice" button is clicked
startButton.addEventListener('click', startGame);

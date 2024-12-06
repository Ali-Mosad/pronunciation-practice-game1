// List of words and sounds to practice (ensure the audio files exist in the 'audio/' folder)
const words = [
    { word: 'through', audio: 'audio/through.mp3' },
    { word: 'though', audio: 'audio/though.mp3' },
    { word: 'thought', audio: 'audio/thought.mp3' },
    { word: 'knight', audio: 'audio/knight.mp3' },
    { word: 'recipe', audio: 'audio/recipe.mp3' }
];

let currentWordIndex = 0;

// DOM Elements
const wordElement = document.getElementById('word');
const startBtn = document.getElementById('startBtn');
const playWordBtn = document.getElementById('playWordBtn');
const recordBtn = document.getElementById('recordBtn');
const feedbackElement = document.getElementById('result');
const micErrorElement = document.getElementById('micError');

// Initialize game
function startGame() {
    currentWordIndex = 0;
    feedbackElement.innerText = "Your pronunciation: ";
    updateWordDisplay();
    playWordBtn.disabled = false;
    recordBtn.disabled = false;
    micErrorElement.style.display = 'none';
}

// Update the word on the screen
function updateWordDisplay() {
    wordElement.innerText = words[currentWordIndex].word;
}

// Play the word audio
function playWordAudio() {
    const audio = new Audio(words[currentWordIndex].audio);
    audio.play();
}

// Record pronunciation (using Web Speech API)
async function recordPronunciation() {
    // Check if SpeechRecognition is supported
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        micErrorElement.style.display = 'block';
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onstart = () => {
        console.log('Speech recognition started. Speak now...');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const correctWord = words[currentWordIndex].word.toLowerCase();

        if (transcript === correctWord) {
            feedbackElement.innerText = "Your pronunciation is correct! 🎉";
        } else {
            feedbackElement.innerText = `Your pronunciation: "${transcript}" (Try again!)`;
        }
    };

    recognition.onerror = (event) => {
        micErrorElement.style.display = 'block';
        console.error('Speech recognition error:', event.error);
        feedbackElement.innerText = "Sorry, there was an error with speech recognition.";
    };

    recognition.onend = () => {
        console.log('Speech recognition ended.');
    };
}

// Event Listeners
startBtn.addEventListener('click', startGame);
playWordBtn.addEventListener('click', playWordAudio);
recordBtn.addEventListener('click', recordPronunciation);

// Disable buttons initially
startBtn.disabled = false;
playWordBtn.disabled = true;
recordBtn.disabled = true;

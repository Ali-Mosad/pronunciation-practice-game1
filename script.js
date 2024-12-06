// List of words for pronunciation practice with their corresponding audio files
const words = [
    { word: 'thorough', audio: 'audio/thorough.mp3' },
    { word: 'squirrel', audio: 'audio/squirrel.mp3' },
    { word: 'anemone', audio: 'audio/anemone.mp3' },
    { word: 'mischievous', audio: 'audio/mischievous.mp3' },
    { word: 'entrepreneur', audio: 'audio/entrepreneur.mp3' }
];

// Select the elements from the HTML
const wordDisplay = document.getElementById('word');
const feedback = document.getElementById('feedback');
const startButton = document.getElementById('start-button');
const counterDisplay = document.getElementById('counter');

// Counter for tracking the number of correct words
let correctCounter = 0;

// Display a random word when the game loads
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Function to play the audio for the correct pronunciation of the word
function playVoiceOver(word) {
    const audio = new Audio(word.audio);
    audio.play();
}

// Function to update the word counter
function updateCounter() {
    counterDisplay.textContent = `Correct Pronunciations: ${correctCounter}`;
}

// Function to start speech recognition
function startRecognition() {
    // Check for browser compatibility
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
        const correctWord = wordDisplay.textContent.toLowerCase();

        if (spokenWord === correctWord) {
            feedback.textContent = 'Correct! Great job!';
            feedback.style.color = 'green';
            correctCounter++; // Increment the correct pronunciation counter
            updateCounter(); // Update the counter display
            // Show the next word after a delay
            setTimeout(() => {
                const nextWord = getRandomWord();
                wordDisplay.textContent = nextWord.word;
                feedback.textContent = '';
                playVoiceOver(nextWord); // Play the voice-over for the next word
            }, 2000);
        } else {
            feedback.textContent = `Try again! You said: "${spokenWord}".`;
            feedback.style.color = 'red';
        }
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
        feedback.textContent = 'Error occurred. Please try again.';
        feedback.style.color = 'red';
    };
}

// Initialize the game
function initGame() {
    const firstWord = getRandomWord();
    wordDisplay.textContent = firstWord.word;
    playVoiceOver(firstWord); // Play voice-over when the game starts
    updateCounter(); // Set initial counter value
}

// Attach event listener to the button
startButton.addEventListener('click', startRecognition);

// Start the game when the page loads
window.onload = initGame;

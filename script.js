// List of words for pronunciation practice
const words = ['thorough', 'squirrel', 'anemone', 'mischievous', 'entrepreneur'];

// Select the elements from the HTML
const wordDisplay = document.getElementById('word');
const feedback = document.getElementById('feedback');
const startButton = document.getElementById('start-button');

// Display a random word when the game loads
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

wordDisplay.textContent = getRandomWord();

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
            // Show the next word after a delay
            setTimeout(() => {
                wordDisplay.textContent = getRandomWord();
                feedback.textContent = '';
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

// Attach event listener to the button
startButton.addEventListener('click', startRecognition);

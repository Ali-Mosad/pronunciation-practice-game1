// List of example words and their definitions
const dictionary = {
    "through": {
        definition: "Moving in one side and out the other side of (an opening, channel, or location).",
        audio: "audio/through.mp3"
    },
    "though": {
        definition: "In spite of the fact that; although.",
        audio: "audio/though.mp3"
    },
    "thought": {
        definition: "An idea or opinion produced by thinking or occurring suddenly in the mind.",
        audio: "audio/thought.mp3"
    },
    "knight": {
        definition: "A man who served his sovereign or lord as a mounted soldier in armor.",
        audio: "audio/knight.mp3"
    },
    "recipe": {
        definition: "A set of instructions for preparing a particular dish, including a list of the ingredients required.",
        audio: "audio/recipe.mp3"
    }
};

let currentWord = "";

// DOM Elements
const wordElement = document.getElementById('word');
const definitionElement = document.getElementById('definition');
const playWordBtn = document.getElementById('playWordBtn');
const recordBtn = document.getElementById('recordBtn');
const feedbackElement = document.getElementById('result');
const searchBtn = document.getElementById('searchBtn');
const wordSearchInput = document.getElementById('wordSearch');

// Search for a word in the dictionary
function searchWord() {
    const searchTerm = wordSearchInput.value.toLowerCase().trim();
    
    if (dictionary[searchTerm]) {
        currentWord = searchTerm;
        updateWordDisplay(dictionary[searchTerm].definition);
    } else {
        feedbackElement.innerText = "Sorry, the word is not in the dictionary.";
        resetButtons();
    }
}

// Update the word display and enable the buttons
function updateWordDisplay(definition) {
    wordElement.innerText = currentWord;
    definitionElement.innerText = definition;
    feedbackElement.innerText = "Your pronunciation: ";
    playWordBtn.disabled = false;
    recordBtn.disabled = false;
}

// Play the pronunciation audio
function playWordAudio() {
    const audio = new Audio(dictionary[currentWord].audio);
    audio.play();
}

// Record and check pronunciation using the Web Speech API
async function recordPronunciation() {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser does not support speech recognition.");
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
        const correctWord = currentWord.toLowerCase();

        if (transcript === correctWord) {
            feedbackElement.innerText = "Your pronunciation is correct! 🎉";
        } else {
            feedbackElement.innerText = `You said: "${transcript}" (Try again!)`;
        }
    };

    recognition.onerror = (event) => {
        feedbackElement.innerText = "Sorry, there was an error with speech recognition.";
    };

    recognition.onend = () => {
        console.log('Speech recognition ended.');
    };
}

// Reset buttons if word is not found
function resetButtons() {
    playWordBtn.disabled = true;
    recordBtn.disabled = true;
}

// Event Listeners
searchBtn.addEventListener('click', searchWord);
playWordBtn.addEventListener('click', playWordAudio);
recordBtn.addEventListener('click', recordPronunciation);

// Disable buttons initially
playWordBtn.disabled = true;
recordBtn.disabled = true;

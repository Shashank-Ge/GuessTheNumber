let randomNumber, numberOfGuesses, userName;

function startGame() {
    userName = document.getElementById('name').value;
    if (!userName) {
        alert('Please enter your name!');
        return;
    }

    document.getElementById('greeting').innerText = `Hello, ${userName}! Let's start the game.`;
    document.getElementById('gameArea').style.display = 'block';
    randomNumber = Math.floor(Math.random() * 100) + 1;
    numberOfGuesses = 0;
    provideHint();
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function provideHint() {
    if (isPrime(randomNumber)) {
        document.getElementById('message').innerText = "Hint: The number is prime.";
    } else {
        document.getElementById('message').innerText = "Hint: The number is composite.";
    }
}

function checkGuess() {
    let guess = parseInt(document.getElementById('guess').value);
    numberOfGuesses++;

    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById('message').innerText = "Please enter a valid number between 1 and 100.";
        return;
    }

    if (guess === randomNumber) {
        let message;
        if (numberOfGuesses <= 5) {
            message = "BRAVO !!!, You are the best!";
        } else if (numberOfGuesses <= 9) {
            message = "Excellent, but it sure took your time!";
        } else {
            message = "Better luck next time!";
        }

        // Display congratulatory message
        document.getElementById('message').innerText = `Congratulations, ${userName}! You guessed the number in ${numberOfGuesses} tries. ${message}`;
        
        // Disable input and button after winning
        document.getElementById('guess').disabled = true;
        document.querySelector("button[onclick='checkGuess()']").disabled = true;

        // Provide an option to restart the game
        const restartButton = document.createElement("button");
        restartButton.innerText = "Play Again";
        restartButton.onclick = resetGame;
        document.getElementById('gameArea').appendChild(restartButton);
        
    } else if (guess < randomNumber) {
        document.getElementById('message').innerText = `The number is greater than this. Try again! (Guess count: ${numberOfGuesses})`;
    } else {
        document.getElementById('message').innerText = `The number is lesser than this. Try again! (Guess count: ${numberOfGuesses})`;
    }
}

function resetGame() {
    // Clear previous messages and inputs
    document.getElementById('guess').value = '';
    document.getElementById('message').innerText = '';
    
    // Enable input and button for new game
    document.getElementById('guess').disabled = false;
    document.querySelector("button[onclick='checkGuess()']").disabled = false;

    // Remove any existing restart button
    const restartButton = document.querySelector("button[onclick='resetGame()']");
    if (restartButton) {
        restartButton.remove();
    }

    // Hide game area and reset variables
    document.getElementById('gameArea').style.display = 'none';
}

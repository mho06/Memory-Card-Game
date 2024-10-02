document.addEventListener('DOMContentLoaded', () => {
    const symbols = ['🍎', '🍌', '🍇', '🍒', '🍋', '🍓', '🍉', '🥝'];
    const gameContainer = document.getElementById('gameContainer');
    const resultDiv = document.getElementById('result');
    const timerDiv = document.getElementById('timer');
    const startButton = document.getElementById('startButton');
    const congratsDiv = document.getElementById('congrats');
    const playAgainButton = document.getElementById('playAgainButton');

    let activeCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let timerSeconds = 60; // Time limit in seconds
    let timerInterval;
    let canClick = true; // Flag to prevent clicking during animations

    // Function to shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to create and display cards
    function createCards() {
        const cardSymbols = [...symbols, ...symbols]; // Duplicate symbols for pairs
        shuffleArray(cardSymbols); // Shuffle symbols

        gameContainer.innerHTML = ''; // Clear previous cards

        cardSymbols.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">${symbol}</div>
                </div>`;
            card.addEventListener('click', () => revealCard(card));
            gameContainer.appendChild(card);
        });
    }

    // Function to start the timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timerSeconds--;
            timerDiv.textContent = `Time Left: ${timerSeconds} seconds`;

            if (timerSeconds === 0 || matchedPairs === symbols.length) {
                clearInterval(timerInterval);

                if (timerSeconds === 0) {
                    resultDiv.textContent = 'Time\'s up! You lost.';
                    playAgainButton.style.display = 'block';
                }
            }
        }, 1000);
    }

    // Function to reveal card symbol
    function revealCard(card) {
        if (!canClick || activeCards.length === 2 || card.classList.contains('matched')) return;

        card.classList.add('active');
        activeCards.push(card);

        const cardInner = card.querySelector('.card-inner');
        cardInner.style.transform = 'rotateY(180deg)';

        if (activeCards.length === 2) {
            moves++;
            canClick = false; // Disable clicking during card check
            setTimeout(() => checkMatch(), 1000);
        }
    }

    // Function to check if cards match
    // Function to check if cards match
function checkMatch() {
    const [card1, card2] = activeCards;
    const symbol1 = card1.querySelector('.card-back').textContent;
    const symbol2 = card2.querySelector('.card-back').textContent;

    if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === symbols.length) {
            resultDiv.textContent = `Congratulations! You won in ${moves} moves!`;
            showCongrats();
            playAgainButton.style.display = 'block';
        }
    } else {
        activeCards.forEach(card => {
            const cardInner = card.querySelector('.card-inner');
            cardInner.style.transform = 'rotateY(0deg)';
            card.classList.remove('active');
        });
    }

    activeCards = [];
    canClick = true; // Re-enable clicking after flipping cards
}


    // Function to show congratulations pop-up
    function showCongrats() {
        congratsDiv.style.display = 'block';
        setTimeout(() => {
            congratsDiv.style.display = 'none';
        }, 3000); // Hide after 3 seconds
    }

    // Event listener for the start button
    startButton.addEventListener('click', () => {
        createCards();
        startTimer();
        startButton.style.display = 'none'; // Hide the start button once clicked
        gameContainer.style.display = 'grid'; // Show the game container
        resultDiv.textContent = ''; // Clear result message
    });

    // Event listener for the play again button
    playAgainButton.addEventListener('click', () => {
        timerSeconds = 60; // Reset timer
        timerDiv.textContent = `Time Left: ${timerSeconds} seconds`;
        resultDiv.textContent = ''; // Clear result message
        matchedPairs = 0; // Reset matched pairs
        moves = 0; // Reset moves
        canClick = true; // Ensure clicking is enabled
        playAgainButton.style.display = 'none'; // Hide play again button
        createCards(); // Reset cards
        startTimer(); // Restart timer
    });
});

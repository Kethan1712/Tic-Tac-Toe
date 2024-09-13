document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const winnerDisplay = document.getElementById("winner");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let isGameActive = true;
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function handleClick(event) {
        const cell = event.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (gameBoard[cellIndex] !== "" || !isGameActive) return;

        cell.textContent = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;

        if (checkWin()) {
            winnerDisplay.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
        } else if (isTie()) {
            winnerDisplay.textContent = "It's a tie!";
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer === "O") {
                computerMove();
            }
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function isTie() {
        return gameBoard.every(cell => cell !== "");
    }

    function computerMove() {
        let availableCells = gameBoard
            .map((value, index) => value === "" ? index : null)
            .filter(value => value !== null);

        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameBoard[randomIndex] = "O";
        cells[randomIndex].textContent = "O";

        if (checkWin()) {
            winnerDisplay.textContent = "O wins!";
            isGameActive = false;
        } else if (isTie()) {
            winnerDisplay.textContent = "It's a tie!";
            isGameActive = false;
        } else {
            currentPlayer = "X";
        }
    }

    function restartGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = "X";
        winnerDisplay.textContent = "";
        isGameActive = true;
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);
});

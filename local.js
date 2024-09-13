document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const localButton = document.getElementById("local-multiplayer");
    const winnerDisplay = document.getElementById("winner");

    let currentPlayer = "X"; 
    let isGameActive = true;

    function handleClick(event) {
        const cell = event.target;

       
        if (cell.textContent !== "" || !isGameActive) return;

        
        cell.textContent = currentPlayer;

        
        if (checkWin()) {
            winnerDisplay.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
        } else if (isTie()) {
            winnerDisplay.textContent = "It's a tie!";
            isGameActive = false;
        } else {
           
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6], 
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent;
        });
    }

    function isTie() {
        return [...cells].every(cell => cell.textContent !== "");
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
});
function handleClick(event) {
    if (!isGameActive || event.target.textContent !== "" || currentPlayer !== "X") return;

    event.target.textContent = currentPlayer;
    if (checkWin()) {
        winnerDisplay.textContent = currentPlayer + " wins!";
        isGameActive = false;
        return;
    } else if (isTie()) {
        winnerDisplay.textContent = "Game tied!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; 
}

function isTie() {
    return [...cells].every(cell => cell.textContent !== "");
}

const playerTurnElement = document.querySelector(".playerTurn");
const allButtonElements = document.querySelectorAll(".buttons");
const resetBtn = document.querySelector(".resetBtn");

let playGame = true;
let playerTurn = "X";
let winner = "";
let boxFillCnt = 0;

// Winner Pattern.
const winnerPattern = [
	// Horizontal row
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	// Vertical column
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],

	// Diagonal
	[0, 4, 8],
	[2, 4, 6],
];

// Winner Buttons
let winnerButtons = [];

// Reset Game
resetBtn.addEventListener("click", function (event) {
	playerTurn = "X";
	displayMessage(`Turn: ${playerTurn}`);
	activateAllBoxes();
	winner = "";
	boxFillCnt = 0;
	resetHighlightCells();
	winnerButtons = [];

	playGame = true;
});

// Play Game
if (playGame) {
	allButtonElements.forEach(function (button) {
		button.addEventListener("click", function (event) {
			if (playerTurn === "X") {
                setFontColor(button, playerTurn);
				button.innerHTML = playerTurn;
				changeTurn(playerTurn);
				displayMessage(`Turn: ${playerTurn}`);
			} else {
                // playerTurn = "O".
                setFontColor(button, playerTurn);
				button.innerHTML = playerTurn;
				changeTurn(playerTurn);
				displayMessage(`Turn: ${playerTurn}`);
			}

			// Disable Button.
			button.setAttribute("disabled", "");
			button.style.cursor = "no-drop";

			boxFillCnt++;

			// Check for winner
			checkForWinner();
		});
	});
}

// Function to set different font color for player "X" and player "O".
function setFontColor(buttonElement, player){
    if(player === "X")
    {
        buttonElement.style.color = "#0C2D57";
    }
    else{
        // Player === "O"
        buttonElement.style.color = "#7D0A0A";
    }
}

// Function to change turn.
function changeTurn(currPlayerTurn) {
	playerTurn = currPlayerTurn === "X" ? "O" : "X";
}

// Function to display message.
function displayMessage(message) {
	playerTurnElement.innerHTML = message;
}

// Function to check for winner.
function checkForWinner() {
	for (const row of winnerPattern) {
		const posZero = allButtonElements[row[0]].innerHTML;
		const posOne = allButtonElements[row[1]].innerHTML;
		const posTwo = allButtonElements[row[2]].innerHTML;

		if (posZero != "" && posOne != "" && posTwo != "") {
			if (posZero === posOne && posOne === posTwo) {
				winnerButtons.push(allButtonElements[row[0]]);
				winnerButtons.push(allButtonElements[row[1]]);
				winnerButtons.push(allButtonElements[row[2]]);
				highlightCells();

				winner = posZero;
				break;
			}
		}
	}

	if (winner != "") {
		displayMessage(`🎉 Congratulations, Winner is ${winner} 🎉`);
		endGame();
	} else {
		if (boxFillCnt == 9) {
			displayMessage(`Game Tie`);
			endGame();
		}
	}
}

// Function to highlight winner cells.
function highlightCells() {
	winnerButtons[0].style.backgroundColor = "#9BCF53";
	winnerButtons[1].style.backgroundColor = "#9BCF53";
	winnerButtons[2].style.backgroundColor = "#9BCF53";
}

// Function to reset highlight winner cells to its normal color.
function resetHighlightCells() {
	winnerButtons[0].style.backgroundColor = "antiquewhite";
	winnerButtons[1].style.backgroundColor = "antiquewhite";
	winnerButtons[2].style.backgroundColor = "antiquewhite";
}

// Function to disable all boxes when winner is found.
function disableAllBoxes() {
	for (const box of allButtonElements) {
		box.setAttribute("disabled", "");
		box.style.cursor = "no-drop";
	}
}

// Function to enable all boxes when game is start over.
function activateAllBoxes() {
	for (const box of allButtonElements) {
		box.removeAttribute("disabled");
		box.style.cursor = "pointer";
		box.innerHTML = "";
	}
}

// Function to end game.
function endGame() {
	disableAllBoxes();
	playGame = false;
}

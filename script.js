// your JS code here. If required.
let submitBn = document.getElementById("submit");
let maincontainer = document.querySelector(".container");
let gameContainer = document.getElementById("game-container");
let initial = document.getElementById("initial-container");

console.log("Script loaded.");
console.log("gameContainer element:", gameContainer); // Check if gameContainer is found

submitBn.addEventListener("click", () => {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;

    if (player1.trim() !== "" && player2.trim() !== "") {
        alert("Form submitted successfully!");

        document.getElementById("input-container").style.display = "none";
        console.log("Input container hidden.");
        game(player1, player2);
    } else {
        alert("Please fill in all fields.");
    }
});

let board = ["", "", "", "", "", "", "", "", ""]; // Reset board for each game if it's outside game()

function game(player1, player2) {
    // Clear previous game board if any (important for replaying without refreshing)
    gameContainer.innerHTML = '';
    board = ["", "", "", "", "", "", "", "", ""]; // Ensure board is reset for new game

    let salut = document.createElement("h2");
    salut.textContent = `${player1}, you're up`;
    salut.classList.add("message");
    // Append salut to initial, but ensure initial-container doesn't hide game-container
    initial.appendChild(salut);
    console.log("Salut message added:", salut.textContent);

    // Apply grid styles to gameContainer BEFORE appending cells
    gameContainer.style.display = "grid";
    gameContainer.style.gridTemplateColumns = "repeat(3, 100px)";
    console.log("gameContainer display set to grid.");


    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("box");
        cell.setAttribute("id", `${i}`);
        cell.style.cssText = `
            display: grid;
            place-items: center;
            width: 100px;
            height: 100px;
            font-size: 2rem;
            cursor: pointer;
            background-color: rgb(255, 161, 161);
            border: 1px solid black;
            text-align: center;
            margin: 0; /* Changed from 'none' to '0' for proper CSS value */
            padding: 0;
        `;
        gameContainer.appendChild(cell);
        // console.log("Cell " + i + " appended."); // Uncomment if you want to see each cell being added
    }
    console.log("All 9 cells created and appended.");
    console.log("Current state of gameContainer:", gameContainer.outerHTML); // Check its HTML content


    let player1turn = true;
    let player2turn = false;
    let gameOver = false;
    document.querySelectorAll(".box").forEach((box) => {
        box.addEventListener("click", () => {
            if (gameOver) {
                console.log("Game is over, ignoring click.");
                return;
            }
            if (box.innerHTML === "x" || box.innerHTML === "o") {
                alert("This box is already filled!");
                console.log("Box already filled.");
                return;
            }

            if (player1turn) {
                box.innerHTML = "x";
                board[box.id] = "x";
                console.log(`Player 1 clicked box ${box.id}. Board:`, board);

                let result = checkWin(board);
                if (result === "x") {
                    gameOver = true;
                    salut.textContent = `${player1} congratulations you won!`;
                    console.log("Player 1 won!");
                    document.querySelectorAll(".box").forEach((b) => { // Changed variable name to b to avoid conflict
                        b.style.pointerEvents = "none";
                    });
                } else if (result === "o") { // This condition will not be met here for player1's turn
                    // This block should ideally not be reached if player1 just moved.
                    // If it is, there's a logic error in turn management or checkWin.
                    salut.textContent = `${player2} congratulations you won!`;
                    gameOver = true;
                    console.log("Player 2 won (unexpectedly after P1 move)!");
                    document.querySelectorAll(".box").forEach((b) => {
                        b.style.pointerEvents = "none";
                    });
                } else if (result === "draw") {
                    gameOver = true;
                    salut.textContent = "It's a draw!";
                    console.log("It's a draw!");
                    document.querySelectorAll(".box").forEach((b) => {
                        b.style.pointerEvents = "none";
                    });
                } else {
                    box.style.pointerEvents = "none";
                    player1turn = false;
                    player2turn = true;
                    salut.textContent = `${player2}, you're up`;
                    console.log("Player 2's turn.");
                }
            } else if (player2turn) {
                box.innerHTML = "o";
                board[box.id] = "o";
                console.log(`Player 2 clicked box ${box.id}. Board:`, board);

                let result = checkWin(board);
                if (result === "x") { // This condition will not be met here for player2's turn
                    // Similar to above, unexpected here.
                    salut.textContent = `${player1} congratulations you won!`;
                    gameOver = true;
                    console.log("Player 1 won (unexpectedly after P2 move)!");
                    document.querySelectorAll(".box").forEach((b) => {
                        b.style.pointerEvents = "none";
                    });
                } else if (result === "o") {
                    gameOver = true;
                    salut.textContent = `${player2} congratulations you won!`;
                    console.log("Player 2 won!");
                    document.querySelectorAll(".box").forEach((b) => {
                        b.style.pointerEvents = "none";
                    });
                } else if (result === "draw") {
                    gameOver = true;
                    salut.textContent = "It's a draw!";
                    console.log("It's a draw!");
                    document.querySelectorAll(".box").forEach((b) => {
                        b.style.pointerEvents = "none";
                    });
                } else {
                    box.style.pointerEvents = "none";
                    player2turn = false;
                    player1turn = true;
                    salut.textContent = `${player1}, you're up`;
                    console.log("Player 1's turn.");
                }
            }
        });
    });
}

function checkWin(board) {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6] // diagonals
    ];

    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            return board[a]; // "X" or "O"
        }
    }

    if (!board.includes("")) {
        return "draw";
    }

    return null;
}
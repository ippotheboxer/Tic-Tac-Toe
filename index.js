var i = 0;
var takenTiles = [];

var player1Tiles = [];
var player2Tiles = [];

var player1TotalScore = 0;
var player2TotalScore = 0;
var tieTotalScore = 0;

const winning_combinations = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
]

function checkWinner(playerTakenTiles) {
    for(let comboNo = 0; comboNo < winning_combinations.length; comboNo++) {
        const checkCombo = winning_combinations[comboNo];
        // Check if current winning combo is included in player's taken tiles
        let result = checkCombo.every(combo => playerTakenTiles.includes(combo));
        if (result === true) {
            $('.boardItem').off("click");
            return true;
        }
}}

function restartGame() {
    for(a = 0; a < 10; a++) {
        $(`#${a}`).text("");
    }
    i = 0;
    takenTiles = [];
    player1Tiles = [];
    player2Tiles = [];
    $("h2").text("Player 1, click a tile to start!");
    $(".scoreBoard").text(`Player 1 wins: ${player1TotalScore} | Player 2 wins: ${player2TotalScore} | Ties: ${tieTotalScore}`)
    $(".boardItem").on("click", game)
}

function game() {
    let noPressed = this.id;
    if (takenTiles.includes(noPressed)) {
    }
    else {
        if (i % 2 != 0) {
            $(`#${noPressed}`).text("X");
            $(`#${noPressed}`).css('color', 'blue');
            takenTiles.push(noPressed);
            player2Tiles.push(noPressed);
            // Update for next player's move
            $("h2").text("Player 1's turn"); 
        }
        else {
            $(`#${noPressed}`).text("O");
            $(`#${noPressed}`).css('color', 'red');
            takenTiles.push(noPressed);
            player1Tiles.push(noPressed);
            // Update for next player's move
            $("h2").text("Player 2's turn");  
        }
            i++;
        // Check for winners
        if (checkWinner(player1Tiles) === true) {
            $("h2").text(`Player 1 wins! 🚩`);
            player1TotalScore++;
        }
        if (checkWinner(player2Tiles) === true) {
            $("h2").text(`Player 2 wins! 🚩`);
            player2TotalScore++;
        }
        // If all tiles taken with no winner, it's a tie
        if (takenTiles.length===9) {
            $("h2").text("It's a tie!");
            tieTotalScore++;
        }
    }
}

$(".boardItem").click(game);

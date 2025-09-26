const prompt = require("prompt-sync")();

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = { //snake case convention
    //these are the amount of symbols present in the game(A is the rarest cuz only 2)
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOLS_VALUES = { //multipliers
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

const deposit = () => { 

    while(true){
        
        const Amount = prompt("Enter your deposit amount to start the game: ")
        const depositAmount = parseFloat(Amount);

        if(isNaN(depositAmount) || depositAmount <= 0){
            console.log("!! Enter a valid number to start the game !!")
        }
        else{
            return depositAmount;
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        
        const lines = prompt("Enter the number of lines you want to bet: ")
        const validLines = parseFloat(lines);

        if(isNaN(validLines) || validLines <= 0 || validLines > 3 ){
            console.log("Enter a valid number of lines from  1 to 3.")
        }
        else{
            return validLines;
        }
    }
}

const getBet = (balance, lines) => {
    while(true){
        
        const bet = prompt("Enter the amount you want to bet from your balance, per line: ")
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines ){
            console.log("Enter a valid bet amount")
        }
        else{
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = []; //empty array
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i<count; i++){
            symbols.push(symbol);
        }
    }


    const reels = [];
    for(let i = 0; i < COLS; i ++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i<ROWS; i++){
        rows.push([]);
        for(let j = 0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}


const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol
            if(i!=row.length-1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows, numberBet, lines) => {
    let winnings = 0;

    for(let row = 0; row<lines; row++){ //if line = 1 then go for row 0
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += numberBet*SYMBOLS_VALUES[symbols[0]];
        }
    }   
    return winnings;
}

const game = () => {
    let balance = deposit();

    while(true){
        console.log(`you have a balance of ${balance}$`)
        const validLines = getNumberOfLines();
        const numberBet = getBet(balance, validLines);
        balance -= numberBet * validLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, numberBet, validLines);
        balance+= winnings;
        console.log("you won, $"+winnings.toString());
        
        if(balance<=0){
            console.log("you ran out of money!")
            break;
        }
        const playAgain = prompt("Do you want to play again?(y/n)")

        if(playAgain != 'y') break;
    }
}

game();

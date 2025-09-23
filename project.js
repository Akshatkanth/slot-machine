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
            console.log("Enter a valid number of lines from  1 to 3")
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


    const reels = [[], [], []]
    for(let i = 0; i < COLS; i ++){
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

const reels = spin();
console.log(reels); 
let balance = deposit();
const validLines = getNumberOfLines();
const numberBet = getBet(balance, validLines);
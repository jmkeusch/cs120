//JAVASCRIPT//

//Global Variables
let ROUND = Number(0);
let MAXROUNDS = Number(5);
let OBJ = new Object;
let CHECK = new Object;
let WORD = "";
let isVAL = true;
let ANS = [];
let INV = [];
let GUESS = "";
let arrGuess = [];
let entry = document.getElementById('input1');
let guessBtn = document.getElementById('btn1');
let newGameBtn = document.getElementById('btn2');
let WIN = false;


//TODO: Call API to get word onload
window.onload = function getWord() {
    url = "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase";
    
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const strObj = JSON.stringify(data);
            WORD = data[0];
            console.log("The word is " + WORD);
        })
        .catch(err => console.log(err)) 
}

async function checkGuess() {
    let guess = GUESS.toLowerCase();
    url = "https://api.api-ninjas.com/v1/dictionary?word=" + guess;

        return fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'YLebFpb2Hmjvt69bAM4W1Q==5oLhmWtakZMlf08Y',
                'Accept': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                isVAL = data.valid;
            })
}

//Event Handlers
guessBtn.onclick = () => {
    processGuess();
}

newGameBtn.onclick = () => {
    startNewGame();
}

//Event Listener: Submit guess word on enter key
var input = document.getElementById("input1");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guessBtn.click();
    }
})

//Process submitted guess word
async function processGuess() {
    ANS = WORD.split("");
    //Get guess value
    GUESS = $("#input1").val();
    
    //NOTE TO GRADER: The URL in checkGuess was the only API dictionary I could find to return a boolean on word validity. 
    //Unfortunately, it did not have as large a word inventory as I had originally thought and it hinders user experience 
    //(e.g., 'tapes', 'laser' not recognized words). Feel free to uncomment this code to see it in action though. 

    // await checkGuess();
    // if(GUESS === WORD) {
    //     isVAL = true;
    // }

    //Check length
    if (GUESS.length != 5) {
        alert("You must guess a 5-letter word!");
        GUESS = "";
        document.getElementById('form1').reset();
        return;
    }

    //check if dictionary word
    if(isVAL === false) {
        alert("Please enter a real word.");
        GUESS = "";
        document.getElementById('form1').reset();
        return;
    }

    //Inventory array used to track placement/presence of letters in word
    INV = ANS;
    
    //Clear input
    document.getElementById('form1').reset();

    //Uppercase guess word
    GUESS = GUESS.toUpperCase();
    //Parse guess word
    arrGuess = GUESS.split("");
    //COMPARE WORDS
    //Exact word --> Game won
    if (GUESS === WORD) {
        document.getElementById("row"+ROUND).className = "correct";
        for (let i = 0; i < 5; i++) {
            cell = document.getElementById("c"+ROUND+i);
            cell.appendChild(document.createTextNode(GUESS[i]));
        }
        guessBtn.disabled = true;
        WIN = true;
        showNewGame();
        alert("Congratulations! You guessed the word!");
    } else {
        //Loop through GUESS against WORD (in respective arrays). Mark letters by match & placement, & update INV.
        //Case: Char matches answer index
        arrGuess.forEach(function (item, index) {
            cell = document.getElementById("c"+ROUND+index);
            cell.appendChild(document.createTextNode(item));
            //Matched letter and placement-->Mark green
            if (item === ANS[index]) {
                cell.className = "correct";
                INV[index] = "0";
            } 
        }) //Case: Loop through to determine partial and non-matches.
        arrGuess.forEach(function (item, index) {
            cell = document.getElementById("c"+ROUND+index);
            if (cell.className != "correct") {
                if (item != ANS[index]) {
                    foundIndex = ANS.findIndex(function (item1) {
                        return item1 === item;
                    }) //Matched letter, wrong placement-->Mark yellow (Green cells takes precedence per prev. loop)
                    if (foundIndex != (-1) && (cell.className != "correct")) {
                        INV[foundIndex] = "0";
                        cell.className = "present";
                    }
                }
            }
        })
    }
    //Increment round to next row and guess attempt
    ROUND++;
    //Game Lost
    if (ROUND > 5 && WIN != true) {
        guessBtn.disabled = true;
        showNewGame();
        alert("Sorry, you didn't get the word. The answer was " + WORD + ".");
    }
};

//Toggle 'New Game' Button
function showNewGame () {
    newGameBtn = document.getElementById("btn2").style.display = "block";
};
function hideNewGame () {
    newGameBtn = document.getElementById("btn2").style.display = "none";
}

//Event: Execute New Game Button
function startNewGame () {
    document.location.reload();
    //cell = document.getElementById("c"+ROUND+index);
    // console.log("In Start new game fxn");
    // for (let i = 0; i < 6; i++) {
    //     for (let j = 0; j < 5; j++) {
    //         let cell = document.getElementById("c"+i+j);
    //         cell.innerHTML = "";
    //         cell.className = "";
    //     }
    // }
    // hideNewGame();
    // ROUND = 0;
    // getWord();
}

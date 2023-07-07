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

        fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'YLebFpb2Hmjvt69bAM4W1Q==5oLhmWtakZMlf08Y',
                'Accept': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Validity: " + data.valid);
                isVAL = data.valid;
                console.log("Setting isVAL to " + isVAL);
            })
}

async function validateWord() {
    isVAL = await checkGuess();
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
function processGuess() {
    validateWord();
    ANS = WORD.split("");
    //Get guess value
    GUESS = $("#input1").val();

    if (GUESS.length != 5) {
        alert("You must guess a 5-letter word!");
        GUESS = "";
        document.getElementById('form1').reset();
        return;
    }

    //check if dictionary word
    
    console.log("isVal in main is " + isVAL);
    if(isVAL === false) {
        alert("Please enter a real word.");
        GUESS = "";
        document.getElementById('form1').reset();
        return;
    }

    //Inv used to track placement/presense of letters in word
    INV = ANS;
    
    //Clear input
    document.getElementById('form1').reset();

    //Uppercase guess word
    GUESS = GUESS.toUpperCase();
    //Parse
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
        //Loop through GUESS against WORD (in respective arrays). Mark letters by match & placement.
        arrGuess.forEach(function (item, index) {
            cell = document.getElementById("c"+ROUND+index);
            cell.appendChild(document.createTextNode(item));
            //Matched letter and placement-->Mark green
            if (item === ANS[index]) {
                cell.className = "correct";
                INV[index] = "0";
            } 
        })
        arrGuess.forEach(function (item, index) {
            cell = document.getElementById("c"+ROUND+index);
            if (cell.className != "correct") {
                if (item != ANS[index]) {
                    foundIndex = ANS.findIndex(function (item1) {
                        return item1 === item;
                    }) //Matched letter, wrong placement-->Mark yellow (Green cells takes precedence)
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

//TODO (Optional): Verify guess before parsing

//Events: Toggle 'New Game' Button
function showNewGame () {
    newGameBtn = document.getElementById("btn2").style.display = "block";
};
function hideNewGame () {
    newGameBtn = document.getElementById("btn2").style.display = "none";
}

//Event: Execute New Game Button
function startNewGame () {
    document.location.reload();
    // console.log("In Start new game fxn");
    // let i, j = 0;
    // let cell = document.getElementById("c"+i+j);
    // console.log("On cell " + cell);
    // for (i; i < MAXROUNDS; i++) {
    //     console.log("row is " + i);
    //     for (j; j < 5; j++) {
    //         cell = document.getElementById("c"+i+j);
    //         $("#cell").html("");
    //         //cell.classList.remove();
    //     }
    // }
    // //clear board words
    // //clear colors
    // //reset counter
    // ROUND = 0;
    // //hide new game button
    // hideNewGame();
    // //get new word
}

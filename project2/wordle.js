//JAVASCRIPT//

//Global Variables
let ROUND = Number(0);
let MAXROUNDS = Number(5);
let OBJ = new Object;
let CHECK = new Object;
let WORD = "";
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
            //console.log(data)
            const strObj = JSON.stringify(data);
            //console.log("STR OBJ: " + data[0]);
            WORD = data[0];
            console.log("The word is " + WORD);
            //return data[0];
            //OBJ = JSON.parse(strObj);
        })
        .catch(err => console.log(err)) 
}

function checkGuess() {
    guess = GUESS.toLowerCase();
    let isValid = true;
    url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + guess;

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then((response) => response.text())
            .then((response) => {
                const str = JSON.stringify(response);
                //console.log("str is " + str);
                CHECK = JSON.parse(str);
                //console.log("check is " + CHECK);
            })
            .catch(err => {
                return false;
            })
    return isValid;
}

// async function assignWord() {
//     //WORD = await getWord();
//     console.log("In assignWord");
//     WORD = await getWord();
//     console.log("The word is " + WORD);
//     ANS = WORD.split();
// }

guessBtn.onclick = () => {
    processGuess();
}

newGameBtn.onclick = () => {
    console.log("newGame Button clicked");
    startNewGame();
}

//Submit guess on enter key
var input = document.getElementById("input1");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guessBtn.click();
    }
})

//Process submitted guess word
function processGuess() {
    ANS = WORD.split("");
    INV = ANS;
    console.log("INV is " + INV);
    //Get guess value
    GUESS = $("#input1").val();

    //VALIDATION
    //Ensure guess is 5 chars
    if (GUESS.length != 5) {
        alert("You must guess a 5-letter word!");
        GUESS = "";
        document.getElementById('form1').reset();
        return;
    }
    //check if dictionary word
    if (!checkGuess()) {
        alert("Please enter a valid word.");
        GUESS = "";
        document.getElementById('form1').reset();
        return;
    };

    //Clear input
    input.value = "";

    //Uppercase guess word
    GUESS = GUESS.toUpperCase();
    console.log("Guess is " + GUESS);
    //Parse
    arrGuess = GUESS.split("");
    console.log("arrGuess is " + arrGuess);
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
              //No match-->Just add letter to board
            } else if (item != ANS[index]) {
                foundIndex = ANS.findIndex(function (item1) {
                    return item1 === item;
                }) //Matched letter, wrong placement-->Mark yellow (Green cells takes precedence)
                if (foundIndex != (-1) && (cell.className != "correct")) {
                    console.log("Foundindex is " + foundIndex);
                    cell.className = "present";
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

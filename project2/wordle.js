//JAVASCRIPT//

//Global Variables
let ROUND = Number(0);
let MAXROUNDS = Number(5);
let OBJ = new Object;
let WORD = "";
let ANS = [];
let INV = [];
let GUESS = "";
let arrGuess = [];
let WIN = false;
let newGame = false;


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

// async function assignWord() {
//     //WORD = await getWord();
//     console.log("In assignWord");
//     WORD = await getWord();
//     console.log("The word is " + WORD);
//     ANS = WORD.split();
// }

if (ROUND > 5) {
    alert("Sorry, you didn't get the word... The answer was " + WORD);
}

console.log("Round is " + ROUND);
    btnObj = document.getElementById('btn1');
    btnObj.onclick = () => {
        processGuess();
    }

//Submit guess on enter key
var input = document.getElementById("input1");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btn1").click();
    }
})


function processGuess() {
   //TODO: Event handler to intake word -- Main     Function
    //Get word value
    GUESS = $("#input1").val();
    //Ensure 5 chars
    if (GUESS.length != 5) {
        alert("You must guess a 5-letter word!");
        GUESS = "";
        return;
    }
    //check if dictionary word
    //Upper
    GUESS = GUESS.toUpperCase();
    console.log("Guess is " + GUESS);
    //Parse
    arrGuess = GUESS.split();
    
    //Compare letters (in array)
    
    //Color cells
};

//TODO: Change color
//Case: All correct
// document.getElementById("row"+ROUND).className = "correct"
// //Case: Letter correct
// document.getElementById("c"+ROUND+2).className = "present";
// //Case: Letter present
// document.getElementById("c"+ROUND+4).className = "present";

//TODO (Optional): Verify guess before parsing



//Event: Display New Game Button
function showNewGame () {
    let newGameBtn = document.getElementById("btn2").style.display = "block";
};

//Event: Execute New Game Button
function startNewGame () {
    button = document.getElementById("btn2");
    button.onclick = () => {
        //clear board words
        //clear colors
        //reset counter
        //hide new game button
        //get new word
    }
}

function playGame() {
    assignWord();
    while (WIN === false && ROUND < 5) {
        if (WIN === true) {
            alert("Congratulations! You guessed the word!");
            break;
        }
    }
}

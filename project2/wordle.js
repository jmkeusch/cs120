document.write("Hello");


//Global Variables
let ROUND = 0;
let MAXROUNDS = 5;
let WORD = "";
let ANS = [];
let GUESS = "";
let pGUESS = [];
let WIN = false;


window.onload = function() {
    WORD = getWord();
    alert("Word is " + WORD);
}

//TODO: Call API to get word onload
function getWord() {
    fetch("https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => response.text())
    .then(response => {
        WORD = response;
    })
    return WORD;
}

//TODO: Begin Round -- use while loop
while (WIN == false && ROUND < MAXROUNDS) {

}

//TODO (Optional): Verify guess before parsing

//TODO: Event handler to intake word -- Main Function
    //Upper
    //Parse
    //Compare letters (in array)
    //Color cells

//Event: Display New Game Button


//Event: Execute New Game Button



const words = ["javascript", "html", "css", "python","nodejs","hangman","apple","samsung",];
//
let correctWords = [];
let wrongWords = [];
let emptySpace = " ";
let selectedWord = words[Math.floor(Math.random() * words.length)];
let selectedWordArray = selectedWord.split("")
const displayWords = () => {
    document.querySelector(".right-words-container").innerHTML=`${selectedWord.split("").map(item => `<div class='letter'>${correctWords.includes(item) ? item : '&nbsp;&nbsp;'}</div>`).join('')}`
};

displayWords();

//console.log(selectedWord)

const closeTheModal = () => {
    document.querySelector(".winning-msg-container").style.display = "none"
}
document.getElementById("modal-close-btn").addEventListener("click", closeTheModal)

const checkIfWin = () => {
    if(document.querySelector(".right-words-container").innerText.replace(/\n/g, "") == selectedWord) {
        document.querySelector("#msg-board").innerText = "You have Won :)";
        document.querySelector(".winning-msg-container").style.display = "block"
    }
}
const closeThePopup = () => {
    document.querySelector(".pop-up-container").style.display = "none";
}
const showNotification = (msg) => {
    document.querySelector(".pop-up").innerText = msg;
    document.querySelector(".pop-up-container").style.display = "block";
    setTimeout(closeThePopup, 1500)
}
const resetTheGame = () => {
    location.reload()
}
document.getElementById("play-again").addEventListener("click", resetTheGame)

const showWrongWords = () => {
    document.querySelector(".wrong-letters-container").innerHTML = `
    <div>NOT : </div>
        ${
            wrongWords.map(item => `<div class='wrong-letters'>${item}</div>`)
        }
    `;
    document.querySelectorAll(".body-svg").forEach((item, index) =>{
        const errors = wrongWords.length;
        if(index < errors) {
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    } )

    if(wrongWords.length === document.querySelectorAll(".body-svg").length){
        document.querySelector("#msg-board").innerText = "You have Lost :(";
        document.querySelector(".winning-msg-container").style.display = "block"
    }
}
// input && e.keyCode <= 90
const inputEntered = (e) => {
    if ( 65<= e.keyCode  && e.keyCode <= 90 ) {
        let letter = e.key;
        if(selectedWordArray.includes(letter)){
            if(!correctWords.includes(letter)){
                correctWords.push(letter);
                displayWords()
                checkIfWin()
            }else{
                showNotification("You Already Entered That Letter");
                //console.log("tekrari")
            }
            //console.log(letter + " includes")
        }else{
            if(!wrongWords.includes(letter)){
                wrongWords.push(letter)
                showWrongWords()
            }else{
                showNotification("You Already Entered That Letter");
            }
            
        }
    }
}
//showNotification("WRONG ! Take Care");
window.addEventListener("keydown", inputEntered)
//console.log(document.querySelectorAll(".body-svg"))
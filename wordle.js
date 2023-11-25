const WORD_LENGTH = 5, GUESSES_AVAILABLE = 6;
let currentRow = 0, currentColumn = 0, isGameOver = false;
let word = dictionary[Math.floor(Math.random()*dictionary.length)].toUpperCase();
function initialize(){
    for(let i=0; i<GUESSES_AVAILABLE; i++){
        for(let j=0; j<WORD_LENGTH; j++){
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = i.toString() + "-" + j.toString();
            document.getElementById("board").appendChild(tile);
        }
    }
}

function update(currentWord){
    let correct = 0, original = [], o2 = [];
    for(let i=0; i<26; i++){
        original[i] = 0;
        o2[i] = 0;
    }
    for(let i=0; i<WORD_LENGTH; i++){
        original[word[i].charCodeAt(0)-65]++;
        o2[currentWord[i].charCodeAt(0)-65]++;
    }
    for(let i=0; i<WORD_LENGTH; i++){
        let currentTile = document.getElementById(currentRow.toString() + "-" + i.toString());
        let letter = currentTile.innerText;
        if(word[i] == letter){
            currentTile.style.animation = "flip-correct 500ms ease forwards";
            correct++;
            original[letter.charCodeAt(0)-65]--;
        }else if(word.includes(letter)){
            if(original[letter.charCodeAt(0)-65] <= 0)
                currentTile.style.animation = "flip-wrong 500ms ease forwards";
            else if(o2[letter.charCodeAt(0)-65] <= original[letter.charCodeAt(0)-65]){
                currentTile.style.animation = "flip-present 500ms ease forwards";
                original[letter.charCodeAt(0)-65]--;
            }else{
                currentTile.style.animation = "flip-wrong 500ms ease forwards";
            }
        }else{
            currentTile.style.animation = "flip-wrong 500ms ease forwards";
        }
        o2[letter.charCodeAt(0)-65]--;
    }
    if(correct == WORD_LENGTH){
        isGameOver = true;
        document.getElementById("answer").innerText = "Congrats!";
    }
}
function getWrittenWord(){
    let word = "";
    for(let i =0; i<WORD_LENGTH; i++){
        word += document.getElementById(currentRow.toString() + "-" + i.toString()).innerText.toLowerCase();
    }
    return word;
}
function keyAction(key){
    if(isGameOver)
        return;
    if(key.code >= "KeyA" && key.code <= "KeyZ"){
        let currentTile = document.getElementById(currentRow.toString() + "-" + currentColumn.toString());
        if(currentColumn < WORD_LENGTH && currentTile.innerText == ""){
            currentTile.innerText = key.code[3];
            currentColumn++;
        }
    }else if(key.code == "Backspace"){
        let currentTile = document.getElementById(currentRow.toString() + "-" + (currentColumn-1).toString());
        if(currentColumn > 0){
            currentTile.innerText = "";
            currentColumn--;
        }
    }else if(key.code == "Enter"){
        if(currentColumn == WORD_LENGTH){
            let currentWord = getWrittenWord();
            if(dictionary.includes(currentWord)){
                update(currentWord.toUpperCase());
                currentRow++;
                currentColumn = 0;
                if(currentRow == GUESSES_AVAILABLE){
                    isGameOver = true;
                    document.getElementById("answer").innerText = "The word was "+word;
                }
            }else{
                alert("The word must exist");
            }
        }else{
            alert("The word must contain 5 letters");
        }
    }
}
function newWord(){
    word = dictionary[Math.floor(Math.random()*dictionary.length)].toUpperCase();
    document.getElementById("answer").innerText = "";
    currentColumn = 0;
    currentRow = 0;
    isGameOver = false;
    for(let i=0; i<GUESSES_AVAILABLE; i++){
        for(let j=0; j<WORD_LENGTH; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            tile.innerText = "";
            tile.style.animation = "";
            tile.style.backgroundColor = "white";
            tile.style.borderColor = "lightgray";
        }
    }
    document.activeElement.blur();
}
window.onload = function(){
    initialize();
    document.addEventListener("keyup", keyAction);
}

// Appoggio termporaneo json
var dJson = '{ "dataComputer": [' +
    '{"word":"ACCOUNT", "tip":"The position of a user relative to a computer system, with which access and action permissions are defined."},' +
    '{"word":"APACHE", "tip":"Open Source software with WEB server function available for UNIX, Linux, Windows and other operating systems."},' +
    '{"word":"ARPANET", "tip":"Computer network created in the sixties of the twentieth century by the ARPA agency of the US Department of Defense. Now decommissioned, it has been the technological base from which the modern Internet is derived."} ]}';
var kJson = '{ "keyboard" : [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] }';


// ---------- ********** ---------- //


// IT- Dall'intero gruppo di parole+suggerimenti estraggo casualmente quelli da utilizzare nel gioco.
// EN- From the whole group of words+hints randomly extract the ones to use in the game.
function isMystery() {
    let mysteryObj = loadData(dJson);
    let luck = Math.floor(Math.random() * mysteryObj.length);
    console.log("MBOX", mysteryObj[luck]);
    return mysteryObj[luck];
}
// IT- Carico i dati dal contenuto json.
// EN- Load the data from the json content.
function loadData(contentJson) {
    return JSON.parse(contentJson).dataComputer;
}


// ---------- ********** ---------- //


// IT- Mostro a monitor la tastiera selezionata.
// EN- Keyboard on the monitor.
function createKeyboard () {
    let jsonKeyboard = loadKeyboard(kJson);
    document.getElementById("hangmanKeyboard").innerHTML = jsonKeyboard.map(function(item) {
        return "<button onclick='playGame(\"" + item + "\")'>" + item + "</button>";
    }).join(" ");
}
// IT- Carico i dati dal contenuto json.
// EN- Load the data from the json content.
function loadKeyboard (langJson) {
    return JSON.parse(langJson).keyboard;
}


// ---------- ********** ---------- //


// IT- Mostro a monitor lo spazio con la parola da indovinare
function createWord (word) {
    let wordA = [...word];
    document.getElementById("deathWord").innerHTML = wordA.map(function(item) {
        return "<span class='hidden'> _ </span>";
    }).join(" ");
}


// ---------- ********** ---------- //


// IT- Controllo la presenza della lettera nella parola.
// 
function checkLetter (letter, word) {
    console.log(word);
    let wordA = [...word]; // Trasformo stringa in array per utilizzare forEach altrimenti potevo lasciare e usare ciclo for normale
    console.log(wordA);
    console.log(wordA.length);
    let pos = [];
    wordA.forEach(function(value, index) {
        if (letter === value) {
            pos.push(index);
        }
    })
    console.log("pos", pos);
    console.log(pos.length);
    return pos;
}


// *** ---------- TEST ---------- *** //

createKeyboard();
var mysteryBox = isMystery();
//var mysteryWord = misteryBox.word;
var mysteryWord = "accavallavacca"
console.log("mysteryWord", mysteryWord);
var mysteryTip = mysteryBox.tip;
console.log("mysteryTip", mysteryTip);
createWord(mysteryWord);
function playGame(pippo) {
    console.log(pippo);
    checkLetter(pippo, mysteryWord);
}



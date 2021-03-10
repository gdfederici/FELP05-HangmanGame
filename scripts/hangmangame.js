
// Appoggio termporaneo json
var dJson = '{ "dataComputer": [' +
    '{"word":"ACCOUNT", "tip":"The position of a user relative to a computer system, with which access and action permissions are defined."},' +
    '{"word":"APACHE", "tip":"Open Source software with WEB server function available for UNIX, Linux, Windows and other operating systems."},' +
    '{"word":"ARPANET", "tip":"Computer network created in the sixties of the twentieth century by the ARPA agency of the US Department of Defense. Now decommissioned, it has been the technological base from which the modern Internet is derived."} ]}';
var kJson = '{ "keyboard" : [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] }';


// ---------- ********** ---------- //


// IT- Dall'intero gruppo di parole+suggerimenti estraggo casualmente quelli da utilizzare nel gioco.
// EN- From the whole group of words+hints randomly extract the ones to use in the game.
function isMistery() {
    let misteryObj = loadData(dJson);
    let luck = Math.floor(Math.random() * misteryObj.length);
    console.log("MBOX", misteryObj[luck]);
    return misteryObj[luck];
}

// IT- Carico i dati dal contenuto json.
// EN- Load the data from the json content.
function loadData(contentJson) {
    return JSON.parse(contentJson).dataComputer;
}


// ---------- ********** ---------- //


// IT- Mostro a monitor la tastiera selezionata.
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
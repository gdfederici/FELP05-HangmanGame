
var alphabet = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var testWord = "accavallavacca";


function createKeyboard (letters) {
    document.getElementById("provatemp").innerHTML = letters.map(function(item) {
        return "<button onclick='playGame(\"" + item + "\")'>" + item + "</button>";
    }).join(" ");
}


// *** ---------- TEST ---------- *** //
createKeyboard (alphabet);
function playGame(pippo) {
    console.log(pippo);
}
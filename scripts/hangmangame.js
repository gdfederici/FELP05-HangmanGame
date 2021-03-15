
// Appoggio termporaneo json
var dJson = '{ "dataComputer": [' +
    '{"word":"ACCOUNT", "tip":"The position of a user relative to a computer system, with which access and action permissions are defined."},' +
    '{"word":"APACHE", "tip":"Open Source software with WEB server function available for UNIX, Linux, Windows and other operating systems."},' +
    '{"word":"ARPANET", "tip":"Computer network created in the sixties of the twentieth century by the ARPA agency of the US Department of Defense. Now decommissioned, it has been the technological base from which the modern Internet is derived."},' +
    '{"word":"BACKDOOR", "tip":"Undocumented access route left in an application by its programmer, to access it secretly."},' +
    '{"word":"BACKUP", "tip":"An operation consisting in copying important files on a medium, in order to restore the system and not to lose data in case of theft, damage or malfunction of the computer."},' +
    '{"word":"BROWSER", "tip":"Client software capable of displaying resources provided by a web server."},' +
    '{"word":"BUFFER", "tip":"Memory space where data is temporarily stored waiting to be sent to a device."},' +
    '{"word":"CLIENT", "tip":"Application that allows the user to access the services offered by a server."},' +
    '{"word":"COOKIE", "tip":"Small amount of data that a web server can write to the user\'s client computer, usually for the purpose of recognizing it on a subsequent visit."},' +
    '{"word":"DATABASE", "tip":"Set of information structured in an accessible way for the machine."},' +
    '{"word":"DESKTOP", "tip":"Workspace of a window manager on which application windows are opened."},' +
    '{"word":"DIRECTORY", "tip":"In a filesystem is a binder within which files or other binders can be contained."},' +
    '{"word":"EDITOR", "tip":"Program used to view and edit a file."},' +
    '{"word":"FILESYSTEM", "tip":"Structure with which the operating system stores files on memory drives."},' +
    '{"word":"FIREWALL", "tip":"Hardware or software that controls and filters data traffic between a network or host and the rest of the Internet, in order to prevent unauthorized access and / or abuse."},' +
    '{"word":"HARDWARE", "tip":"It constitutes everything that is tangible in a computer, as opposed to software."},' +
    '{"word":"JAVASCRIPT", "tip":"interpreted language which can be inserted into HTML pages to create dynamic elements."},' +
    '{"word":"KERNEL", "tip":"It is the fundamental part of the operating system, which deals with the interaction with hardware and the fundamental input / output functions."},' +
    '{"word":"LOGIN", "tip":"Operation with which an accredited user is recognized by the system by entering the name and password upon access."},' +
    '{"word":"LOGOFF", "tip":"The opposite of login, a user logging out of the system."},' +
    '{"word":"MODEM", "tip":"Device that allows the connection of two computer systems through the normal telephone line."},' +
    '{"word":"PASSWORD", "tip":"Secret word requested by the user during login for his identification."},' +
    '{"word":"PLUGIN", "tip":"Software module that adds a new specific function to an existing application."},' +
    '{"word":"PROVIDER", "tip":"Company that provides the connection to the Internet and/or other IT services."},' +
    '{"word":"REGEXP", "tip":"Encoding method for defining the matching of character sequences"},' +
    '{"word":"ROUTER", "tip":"Machine that takes care of routing the TCP/IP packets to the destination host, defined by the IP address contained in the packet itself."},' +
    '{"word":"SERVER", "tip":"A process running on a computer whose purpose is to wait for and fulfill a client\'s requests. By extension also the machine that hosts it."},' +
    '{"word":"STREAMING", "tip":"Real-time transmission of audio / video streams over the Internet."},' +
    '{"word":"TELNET", "tip":"Procedure for accessing a remote terminal via the Internet."},' +
    '{"word":"VIRUS", "tip":"Program generally with malicious purposes able to replicate itself by exploiting the resources of a system and attaching itself to executable files"},' +
    '{"word":"WIRELESS", "tip":"Interconnection system that does not use wires, but radio waves or sometimes infrared rays."},' +
    '{"word":"WYSIWYG", "tip":"Said of programs that show the job on the screen exactly as it will be printed on paper."}' +
    '] }';
var kJson = '{ "keyboard" : [ "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"] }';


// ---------- ///// ---------- // ALPHA & OMEGA // ---------- ///// ---------- //

function alfaOmega() {
    showScore(theGame);
    import dJson from "scripts/hangmandata.json";
    mystery = playInit();
}


// ---------- ///// ---------- // INIZIALIZZAZIONE // ---------- ///// ---------- //
// ---------- ///// ---------- // THE BEGINNING // ---------- ///// ---------- //

// IT- Inizializzo il gioco.
// EN- Game's initialization.
function playInit() {
    cleanMonitor();
    document.getElementById("gallows").innerHTML = "<img src='img/hangman0.png'>";
    createKeyboard();
    var mysteryStart = isMysteryBox();
    createWord(mysteryStart.word);
    console.log("Mystery Object is:", mysteryStart);
    return mysteryStart;
}

// IT- Mostro a monitor la tastiera.
// EN- Keyboard on the monitor.
function createKeyboard () {
    let jsonKeyboard = loadData(kJson, "keyboard");
    /*
    // Per stampare tutta la tastiera su un'unica riga
    document.getElementById("hangmanKeyboard").innerHTML = jsonKeyboard.map(function(item) {
        return "<button class='endgame' id='key-" + item + "' onclick='playGame(\"" + item + "\")'>" + item + "</button>";
    }).join(" ");
    */
    // Per stampare la tastiera su più righe, stile QWERTY, estraggo un vettore con le lettere di ciascuna riga e poi lo stampo.
    document.getElementById("hangmanKeyboard__row_1").innerHTML = jsonKeyboard.slice(0, 10).map(function(item) {
        return "<button class='endgame key' id='key-" + item + "' onclick='playGame(\"" + item + "\")'>" + item + "</button>";
    }).join(" ");
    document.getElementById("hangmanKeyboard__row_2").innerHTML = jsonKeyboard.slice(10, 19).map(function(item) {
        return "<button class='endgame key' id='key-" + item + "' onclick='playGame(\"" + item + "\")'>" + item + "</button>";
    }).join(" ");
    document.getElementById("hangmanKeyboard__row_3").innerHTML = jsonKeyboard.slice(19, 26).map(function(item) {
        return "<button class='endgame key' id='key-" + item + "' onclick='playGame(\"" + item + "\")'>" + item + "</button>";
    }).join(" ");
}

// IT- Creo il box misterioso con tutti gli elementi per il gioco: parola, suggerimento, lettere indonivate, errori commessi.
// EN- Create the mystery box with all the elements: word, tip, check letters, mistakes.
function isMysteryBox() {
    var mysteryBox = isMystery();
    mysteryBox.ok = 0;
    mysteryBox.ko = 0;
    mysteryBox.letters = [];
    mysteryBox.errors = [];
    return mysteryBox;
}
// IT- Dall'intero gruppo di parole+suggerimenti estraggo casualmente quelli da utilizzare nel gioco.
// EN- From the whole group of words+hints randomly extract the ones to use in the game.
function isMystery() {
    let mysteryObj = loadData(dJson, "dataComputer");
    let luck = Math.floor(Math.random() * mysteryObj.length);
    return mysteryObj[luck];
}

// IT- Carico i dati dal contenuto json.
// EN- Load the data from the json content.
function loadData(contentJson, nameJson) {
    if (nameJson === "keyboard") {
        return JSON.parse(contentJson).keyboard;
    };
    if (nameJson === "dataComputer") {
        return JSON.parse(contentJson).dataComputer;
    };
}

// IT- Mostro a monitor lo spazio con la parola da indovinare.
// EN- Show space for mystery word.
function createWord (word) {
    let wordA = [...word];
    var i=-1;
    document.getElementById("death_word").innerHTML = wordA.map(function(item) {
        i++;
        return "<span id='place" + i + "' class='mystery_word'> _ </span>";
    }).join(" ");
}

// IT- Pulisco i resti del gioco precedente.
function cleanMonitor() {
    document.getElementById("mystery__tip").innerHTML = "";
    document.getElementById("death_letter").innerHTML = "";
    document.getElementById("gallows").innerHTML = "";
    document.getElementById("winner-loser").innerHTML = "";
}

// ---------- ///// ---------- // GIOCO // ---------- ///// ---------- //
// ---------- ///// ---------- // PLAY // ---------- ///// ---------- //

// IT- Inizia il gioco.
// EN- Game start.
function playGame(letterChoice) {
    document.getElementById("key-"+letterChoice).disabled = true;
    var checkResult = checkLetter(letterChoice, mystery.word);
    mystery.letters.push(letterChoice);
    if (!checkResult.length) { // !0 cioè se il vettore con le posizioni di controllo è vuoto. 
        mystery.ko++;
        mystery.errors.push(letterChoice);
        document.getElementById("death_letter").innerHTML = mystery.errors.map(function(item) {
            return item;
        }).join(" ");
        document.getElementById("gallows").innerHTML = "<img src='img/hangman" + mystery.ko + ".png'>";
        switch(mystery.ko) {
            case 5:
                youLose();
                break;
            case 3:
                document.getElementById("mystery__tip").innerHTML = "<h4>Tip</h4><p id='death_tip'>" + mystery.tip + "</p>";
                break;
        }
        }
    else {
        showLetter (checkResult, letterChoice);
        if (mystery.ok === mystery.word.length) { youWin(); }
    }
}

// IT- Controllo la presenza della lettera nella parola.
// EN- Check letter in the word.
function checkLetter (letter, word) {
    let wordA = [...word]; // Trasformo stringa in array per utilizzare forEach altrimenti potevo lasciare e usare ciclo for normale.
    let positions = [];
    wordA.forEach(function(value, index) {
        if (letter.toUpperCase() === value.toUpperCase()) {
            positions.push(index);
        }
    })
    return positions;
}

// IT- Mostro le lettere indovinate al posto degli spazi vuoti.
// EN- Show corret letter.
function showLetter (positions, letter) {
    let howManyCheck = positions.length;
    for (i=0; i<howManyCheck; i++) {
        document.getElementById("place" + positions[i]).innerHTML = letter;
        mystery.ok++;
    }
}

// IT- Sconfitta perché fatti troppi errori.
// EN- Loss because you made too many mistakes.
function youLose() {
    disableKeyboard();
    theGame.lose++;
    isEnd("<h4>Loser!</h4>" + "<p>Mystery word is<br/><span class='word_revealed'>" + mystery.word + "</span></p>");
}
// IT- Vittoria per parola indovinata.
// EN- Victory by guessed word.
function youWin() {
    disableKeyboard();
    theGame.win++;
    isEnd("<h4>Winner!</h4>");
}
// IT- Messaggio di fine partita.
// EN- Endgame message.
function isEnd(message) {
    document.getElementById("winner-loser").innerHTML = "<div class='game_end'>" + message + "</div>" +
                                                        "<div class='play_next'>" +
                                                            "<p>Another play?</p>" +
                                                            "<button class='play_yes' onclick='alfaOmega()'>Yes</button>" +
                                                            "<button class='play_no' onclick='isOmega()'>No</button>" +
                                                        "</div>";
}
// IT- Messaggio di fine gioco.
// EN- Final message.
function isOmega() {
    document.getElementById("main").innerHTML = "<h1 class='omega-message'>Thanks for playing!</h1>";
}

// IT- Disattivare tutte le lettere della tastiera.
// EN- Disable all keyboard.
function disableKeyboard() {
    let killKeyboard = document.getElementsByClassName("endgame"); // ByClassName restituisce un insieme di elementi di quella classe.
    for (let i=0; i<killKeyboard.length; i++) {
        killKeyboard[i].disabled = true;
    }
}


// ---------- ///// ---------- // ABRACADABRA // ---------- ///// ---------- //
// ---------- ///// ---------- // NOW YOU SEE // ---------- ///// ---------- //

function showScore (result) {
    document.getElementById("score").innerHTML = "<div id='score_win'><h3>Win:</h3><p>" + result.win + "</p></div><div id='score_lose'><h3>Lose:</h3><p>" + result.lose + "</p></div>";
}


// *** ---------- LIVE ---------- *** //

var theGame = { "win" : 0, "lose" : 0 };
var mystery;
alfaOmega();

// Appoggio temporaneo json
    var kJson = '{ "keyboard" : [ "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"] }';


    // ---------- ///// ---------- // ALPHA & OMEGA // ---------- ///// ---------- //
    
    async function alfaOmega() {
        try {
            showScore(theGame);
            mystery = await playInit();
        } catch (error) {
            console.log("Si è verificato un errore in alfaOmega:", error)
            return false
        }
    }
    
    
    // ---------- ///// ---------- // INIZIALIZZAZIONE // ---------- ///// ---------- //
    // ---------- ///// ---------- // THE BEGINNING // ---------- ///// ---------- //
    
    // IT- Inizializzo il gioco.
    // EN- Game's initialization.
    async function playInit() {
        try {
            cleanMonitor();
            document.getElementById("gallows").innerHTML = "<img src='img/hangman0.png'>";
            createKeyboard();
            var mysteryStart = await isMysteryBox();
            createWord(mysteryStart.word);
            console.log("Mystery Object is:", mysteryStart);
            return mysteryStart;
        } catch (error) {
            console.log("Si è verificato un errore in playInit:", error)
            return false
        }
    }
    
    // IT- Mostro a monitor la tastiera.
    // EN- Keyboard on the monitor.
    function createKeyboard () {
        let jsonKeyboard = loadData(kJson, "keyboard");
        /*
        // Per stampare tutta la tastiera su un'unica riga | To print the entire keyboard on one line
        document.getElementById("hangmanKeyboard").innerHTML = jsonKeyboard.map(function(item) {
            return "<button class='endgame' id='key-" + item + "' onclick='playGame(\"" + item + "\")'>" + item + "</button>";
        }).join(" ");
        */
        // Per stampare la tastiera su più righe, stile QWERTY, estraggo un vettore con le lettere di ciascuna riga e poi lo stampo. | To print the keyboard on multiple lines, QWERTY style, I extract a vector with the letters of each line and then I print it.
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
    async function isMysteryBox() {
        try {
            var mysteryBox = await isMystery();
            mysteryBox.ok = 0;
            mysteryBox.ko = 0;
            mysteryBox.letters = [];
            mysteryBox.errors = [];
            return mysteryBox;
        } catch (error) {
            console.log("Si è verificato un errore in isMysteryBox:", error)
            return false
        }
    }
    // IT- Dall'intero gruppo di parole+suggerimenti estraggo casualmente quelli da utilizzare nel gioco.
    // EN- From the whole group of words+hints randomly extract the ones to use in the game.
    async function isMystery() {
        try {
            let mysteryObj = await loadExternalData();
            let luck = Math.floor(Math.random() * mysteryObj.length);
            return mysteryObj[luck];
        } catch (error) {
            console.log("Si è verificato un errore in isMystery:", error)
            return false
        }
    }
    
    // IT- Carico i dati dal contenuto json.
    // EN- Load the data from the json content.
    function loadData(contentJson, nameJson) {
        return JSON.parse(contentJson)[nameJson];
    }
    // IT- Carico i dati dal file esterno json.
    async function loadExternalData() {
        try {
            let response = await fetch("scripts/hangmandata.json")
            let json = await response.json()
            return json.dataComputer;
        } catch (error) {
            console.log("Si è verificato un errore in loadExternalData:", error)
            return false
        }
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
    
    
    // ---------- ///// ---------- // AGGIUNTA TASTIERA // ---------- ///// ---------- //
    // ---------- ///// ---------- // ADD KEYBOARD // ---------- ///// ---------- //
    // IT- Input da tastiera.
    // EN- Keyboard input.
    function realKeyboard(e)  {
        var keyPress = e.key.toUpperCase();
        var twoAreTooMuch = 0;
        mystery.letters.forEach(function(value, index) { // Controlliamo che la lettera sulla tastiera non sia stata già premuta in precedenza. | We check that the letter on the keyboard has not already been pressed before.
            if (keyPress === value.toUpperCase()) {
                twoAreTooMuch++;
            }
        });
        if ((!twoAreTooMuch) && (mystery.ko<5)) { // !0 cioè se la lettera è nuova e non abbiamo ancora perso allora giochiamo, altrimenti ignoriamo l'imput. | If the letter is new and we haven't lost yet then let's play, otherwise we ignore the input.
            playGame(keyPress);
        }
        if (mystery.ko === 5) {
            switch (keyPress) {
                case "Y": 
                    alfaOmega();
                    break;
                case "N":
                    isOmega();
                    break;
                default:
            }
        } 
    }
    
    
    // ---------- ///// ---------- // GIOCO // ---------- ///// ---------- //
    // ---------- ///// ---------- // PLAY // ---------- ///// ---------- //
    // IT- Inizia il gioco.
    // EN- Game start.
    function playGame(letterChoice) {
        document.getElementById("key-"+letterChoice).disabled = true;
        var checkResult = checkLetter(letterChoice, mystery.word);
        mystery.letters.push(letterChoice);
        if (!checkResult.length) { // !0 cioè se il vettore con le posizioni di controllo è vuoto. | If the vector with the control positions is empty.
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
        let wordA = [...word]; // Trasformo stringa in array per utilizzare forEach altrimenti potevo lasciare e usare ciclo for normale. | I transform string into array to use forEach otherwise I could leave and use normal for loop.
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
        let killKeyboard = document.getElementsByClassName("endgame"); // ByClassName restituisce un insieme di elementi di quella classe. | ByClassName returns a collection of elements of that class.
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
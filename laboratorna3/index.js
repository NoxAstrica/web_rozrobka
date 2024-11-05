import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-337f3-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const gameListInDB = ref(database, "gameList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const gameListEl = document.getElementById("game-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    if (inputValue) {
        push(gameListInDB, { name: inputValue, characters: {} });
        clearInputFieldEl();
    } else {
        alert("Please enter a game name!");
    }
});

onValue(gameListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        clearGameListEl();

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            appendItemToGameListEl(currentItem);
        }
    } else {
        gameListEl.innerHTML = "No games added yet...";
    }
});

function clearGameListEl() {
    gameListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToGameListEl(item) {
    let itemID = item[0];
    let itemData = item[1];
    let itemValue = itemData.name;

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    let editGameButton = document.createElement("button");
    editGameButton.textContent = "✏️";
    editGameButton.classList.add("edit-game-button");
    editGameButton.addEventListener("click", function() {
        let newGameName = prompt("✏️ Game Name:", itemValue);
        if (newGameName) {
            set(ref(database, `gameList/${itemID}/name`), newGameName);
        }
    });

    let deleteGameButton = document.createElement("button");
    deleteGameButton.textContent = "x";
    deleteGameButton.classList.add("delete-game-button"); 
    deleteGameButton.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `gameList/${itemID}`);
        remove(exactLocationOfItemInDB);
    });


    let characterInput = document.createElement("input");
    characterInput.placeholder = "Enter character name";

    let addCharacterButton = document.createElement("button");
addCharacterButton.textContent = "Add Character";
addCharacterButton.classList.add("add-character-button"); 

addCharacterButton.addEventListener("click", function() {
    let characterName = characterInput.value;

    if (characterName) {
        const characterRef = push(ref(database, `gameList/${itemID}/characters`), { name: characterName, pityCount: 0 });
        characterInput.value = "";
    } else {
        alert("Please enter a character name!");
    }
});

    let characterListEl = document.createElement("ul");


    onValue(ref(database, `gameList/${itemID}/characters`), function(snapshot) {
        clearCharacterListEl(characterListEl);

        if (snapshot.exists()) {
            let characterArray = Object.entries(snapshot.val());
            for (let j = 0; j < characterArray.length; j++) {
                appendCharacterToList(characterArray[j], itemID, characterListEl);
            }
        }
    });

    newEl.appendChild(editGameButton);
    newEl.appendChild(deleteGameButton);
    newEl.appendChild(characterInput);
    newEl.appendChild(addCharacterButton);
    newEl.appendChild(characterListEl);
    gameListEl.append(newEl);
}

function clearCharacterListEl(characterListEl) {
    characterListEl.innerHTML = "";
}

function appendCharacterToList(character, gameID, characterListEl) {
    let characterID = character[0];
    let characterData = character[1];
    let characterName = characterData.name;
    let pityCount = characterData.pityCount;

    let characterEl = document.createElement("li");
    characterEl.textContent = characterName;


    let pityCountInput = document.createElement("input");
    pityCountInput.type = "number";
    pityCountInput.placeholder = "Enter pity count";
    pityCountInput.value = pityCount;
    pityCountInput.min = 0;
    pityCountInput.max = 100;

    pityCountInput.addEventListener("change", function() {
        let newPityCount = pityCountInput.value;
        set(ref(database, `gameList/${gameID}/characters/${characterID}/pityCount`), newPityCount);
    });

    let editCharacterButton = document.createElement("button");
editCharacterButton.textContent = "✏️";
editCharacterButton.classList.add("edit-character-button"); 
editCharacterButton.addEventListener("click", function() {
    let newCharacterName = prompt("✏️ Character Name:", characterName);
    if (newCharacterName) {
        set(ref(database, `gameList/${gameID}/characters/${characterID}/name`), newCharacterName);
    }
});

let deleteCharacterButton = document.createElement("button");
deleteCharacterButton.textContent = "x";
deleteCharacterButton.classList.add("delete-character-button"); 
deleteCharacterButton.addEventListener("click", function() {
    let exactLocationOfCharacterInDB = ref(database, `gameList/${gameID}/characters/${characterID}`);
    remove(exactLocationOfCharacterInDB);
});

    
    characterEl.appendChild(pityCountInput); 
    characterEl.appendChild(editCharacterButton); 
    characterEl.appendChild(deleteCharacterButton);
    characterListEl.appendChild(characterEl);
}

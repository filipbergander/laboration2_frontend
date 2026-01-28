"use strict";

document.addEventListener("DOMContentLoaded", async() => {
    importData();
    document.getElementById("search").addEventListener("input", filterData); // Lyssnar på input i sökfält
});

let allData = []; // Tom array

// Eventlyssnare på rubriker i tabellen som trigger funktioner på klick, för att sortera
document.getElementById("course-code").addEventListener("click", () => sortCode());

document.getElementById("course-name").addEventListener("click", () => sortName());

document.getElementById("course-progression").addEventListener("click", () => sortProgression());

async function importData() { // Asynkron funktion som inhämtar data
    try {
        const response = await fetch( // Hämtar in data från url
            "https://webbutveckling.miun.se/files/ramschema.json"
        );
        const info = await response.json(); // Sparar datan i variabeln info
        showData(info); // Kallar på funktionen för att visa datan
        allData = info;
    } catch (error) {
        console.error("Felmeddelanden: ", error); // Felmeddelande vid error
    }
}

function showData(info) {
    const tableBodyEl = document.getElementById("table-body");
    tableBodyEl.innerHTML = ""; // Rensar listan i början
    info.forEach(row => { //Loopa genom varje index
        tableBodyEl.innerHTML += // Skapar en tabell där datan skrivs ut
            `
    <tr>
        <td>${row.code}</td>
        <td>${row.coursename}</td>
        <td>${row.progression}</td>
    </tr>
        `
    });
}

function filterData() { // För att filtrera datan 
    const searchPhrase = document.getElementById("search").value.toLowerCase(); // Hämtar in värde som skrivs i sökfältet, gör om värdet till gemener
    const filteredData = allData.filter((row) =>
        row.code.toLowerCase().includes(searchPhrase) || // Om något söks på kodnamn
        row.coursename.toLowerCase().includes(searchPhrase) || // Om något söks på kursnamn
        row.progression.toLowerCase().includes(searchPhrase)); // Om något söks på progression
    showData(filteredData) // Kallar på funktionen igen men genom att filtrera
}

function sortCode() { // Sorterar kurskod
    allData.sort((a, b) => a.code.localeCompare(b.code)); // Jämför datan inom code för att kunna sortera A till Ö.
    showData(allData); // Triggar funktionen för att visa datan igen med den nya "sorterade arrayen"
}

function sortName() { // Sorterar kursnamn
    allData.sort((a, b) => a.coursename.localeCompare(b.coursename)); // Jämför datan inom kursnamn för att kunna sortera A till Ö.
    showData(allData); // Triggar funktionen för att visa datan igen med den nya "sorterade arrayen"
}

function sortProgression() { // Sorterar progression
    allData.sort((a, b) => a.progression.localeCompare(b.progression)); // Jämför datan inom progression för att kunna sortera A till Ö.
    showData(allData); // Triggar funktionen för att visa datan igen med den nya "sorterade arrayen"
}
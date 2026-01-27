"use strict";

document.addEventListener("DOMContentLoaded", async() => {
    importData();
    document.getElementById("search").addEventListener("input", filterData);
});

let allData = [];


async function importData() {
    try {
        const response = await fetch( // Hämtar url
            "https://webbutveckling.miun.se/files/ramschema.json"
        );
        const info = await response.json(); // Sparar datan i variabeln info
        showData(info);
        allData = info
    } catch (error) {
        console.error("Felmeddelanden: ", error); // Felmeddelande vid error
    }
}

function showData(info) {
    const tableBodyEl = document.getElementById("table-body");
    tableBodyEl.innerHTML = ""; // Rensar listan 
    info.forEach(row => { //Loopa genom varje index
        tableBodyEl.innerHTML += `
    <tr>
        <td>${row.code}</td>
        <td>${row.coursename}</td>
        <td>${row.progression}</td>
    </tr>
        ` // Skapar en tabell där datan ska skrivas ut i
    });
}

function filterData() { // För att filtrera datan 
    const searchPhrase = document.getElementById("search").value.toLowerCase(); // Hämtar in värde som skrivs i sökfältet
    const filteredData = allData.filter((row) =>
        row.code.toLowerCase().includes(searchPhrase) || // Om något söks på kodnamn
        row.coursename.toLowerCase().includes(searchPhrase) ||
        row.progression.toLowerCase().includes(searchPhrase));
    showData(filteredData) // Kallar på funktionen igen men genom att filtrera
}
"use strict";

document.addEventListener("DOMContentLoaded", async() => {
    importData();
    document.getElementById("search").addEventListener("input", filterData);
});

let allData = [];


async function importData() {
    try {
        const response = await fetch(
            "https://webbutveckling.miun.se/files/ramschema.json"
        );
        const info = await response.json();
        console.table(info)
        showData(info);
        allData = info
    } catch (error) {
        console.error("Felmeddelanden: ", error);
    }
}

function showData(info) {
    const tableEl = document.getElementById("table-body");
    tableEl.innerHTML = ""; // Rensar listan 
    info.forEach(row => { //Loopa genom varje index
        tableEl.innerHTML += `
    <tr>
        <td>${row.code}</td>
        <td>${row.coursename}</td>
        <td>${row.progression}</td>
    </tr>
        `
    });
}

function filterData() {
    const searchPhrase = document.getElementById("search").value;
    const filteredData = allData.filter((row) =>
        row.code.toLowerCase().includes(searchPhrase) ||
        row.coursename.toLowerCase().includes(searchPhrase) ||
        row.progression.toLowerCase().includes(searchPhrase));
    showData(filteredData)
}
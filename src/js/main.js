"use strict";

document.addEventListener("DOMContentLoaded", async() => {
    importData();
    document.getElementById("search").addEventListener("input", filterData);
});

let allData = [];

const code = [
    {}
]

async function importData() {
    try {
        const response = await fetch(
            "https://webbutveckling.miun.se/files/ramschema.json"
        );
        const info = await response.json();
        console.table(info)
        showData(info);
    } catch (error) {
        console.error("Felmeddelanden: ", error);
    }
}

function showData(info) {
    const tableEl = document.getElementById("main-table");
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
/* Logic for displaying the books */
const form = document.getElementById("form");

let main = document.querySelector("main");
let table = document.createElement("table");
let tbody = document.createElement("tbody");
let thead = document.createElement("thead");

main.appendChild(table);
table.appendChild(thead)
table.appendChild(tbody);

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

setAttributes(table, {"class": "table table-light"}); // Adding Bootstrap classes //

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let tr_elem = document.createElement("tr");

    function trFunction(number) {
        var td_elem = document.createElement("td");
        td_elem.textContent = 'Hola' + number;

        tr_elem.appendChild(td_elem);
        tbody.appendChild(tr_elem);

        console.dir(td_elem);
    }

    for (var i = 0; i < 5; i++) {
        trFunction(i);
    }
});


/* Book structures that hold all information */

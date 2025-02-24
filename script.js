/* Logic for displaying the books */

const form = document.getElementById("form");

let main = document.querySelector("main");
let table = document.createElement("table");
main.appendChild(table);

form.addEventListener("submit", function(event) {

    event.preventDefault();
    let tr_elem = document.createElement("tr");

    for (var i = 0; i < 5; i++) {
        trFunction(i);
    }

    function trFunction(number) {
        var td_elem = document.createElement("td");
        td_elem.textContent = 'Hola';
    
        tr_elem.appendChild(td_elem);
        table.appendChild(tr_elem);
        // table.appendChild(td_elem);
    }
});


/* Book structures that hold all information */

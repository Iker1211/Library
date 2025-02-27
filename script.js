/* Logic for displaying the books */
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

const form = document.getElementById("form");
const main = document.querySelector("main");
const table = document.createElement("table");
const tbody = document.createElement("tbody");
const statement = document.getElementById("statement");

main.appendChild(table);
table.appendChild(tbody);

setAttributes(table, {"class": "table table-light"}); // Adding Bootstrap classes //

const listener = form.addEventListener("submit", function(event) {

    event.preventDefault();

    statement.style.display = 'none';

    addBookToLibrary();
    empty_form();
    render();
    console.log(my_library);
    // let tr_elem = document.createElement("tr");
    // console.log(tr_elem);

    /* ForEach */
    // function trFunction(number) {

    //     var td_elem = document.createElement("td");
    //     td_elem.textContent = 'Hola' + i; // //

    //     tr_elem.appendChild(td_elem);
    //     tbody.appendChild(tr_elem);
    // }

    // for (var i = 0; i < 5; i++) { /* Loops through the array */
    //     trFunction(i);
    // }

    // let last_td = tr_elem.lastChild;

    // addBookToLibrary();
    // console.table(myLibrary);
});

/* Book structures that hold all information */

const my_library = [];

const $name = document.getElementById("title");
const $author = document.getElementById("author");
const $nr_pages = document.getElementById("pages");
const $status = document.getElementById("status");

class Book {
    constructor(name, author, nr_pages, status) {
        this.name = name;
        this.author = author;
        this.nr_pages = nr_pages;
        this.status = status;
    }
}

function addBookToLibrary() {
    const new_book = new Book($name.value, $author.value, $nr_pages.value, $status.value);
    my_library.push(new_book);
}

function chageStatus(book) {
    if (library[book].status === "read") {
        library[book].status = "not read";
      } else library[book].status = "read";
}

function empty_form() {
 $name.value = '';
 $author.value = '';
 $nr_pages.value = '';
 $status.value = 'read';
} 

function render() {
    // checkLocalStorage();
    tbody.innerHTML = "";
    my_library.forEach((book) => {
      const htmlBook = `
        <tr>
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td>${book.nr_pages}</td>
          <td><button class="btn btn-success">${book.status}</button></td>
          <td><button class="btn btn-danger">delete</button></td>
        </tr>
        `;
      tbody.insertAdjacentHTML("afterbegin", htmlBook);
    });
}

render();














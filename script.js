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
});

table.addEventListener("click", (e) => {

    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == "delete") {
      if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        deleteBook(findBook(my_library, currentTarget.innerText));
    }
    if (e.target.classList.contains("status-button")) {
        changeStatus(findBook(my_library, currentTarget.innerText));
    }
    updateLocalStorage();
    render();
});

function empty_form() {
    $name.value = '';
    $author.value = '';
    $nr_pages.value = '';
    $status.value = 'read';
   } 
   
function render() {
    tbody.innerHTML = "";
    my_library.forEach((book) => {
        const htmlBook = `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.nr_pages}</td>
            <td><button class="btn btn-success status-button">${book.status}</button></td>
            <td><button class="btn btn-danger">delete</button></td>
        </tr>
        `;
        tbody.insertAdjacentHTML("afterbegin", htmlBook);
    });
   }

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
    updateLocalStorage();
}

function changeStatus(book) {
    if (my_library[book].status === "read") {
        my_library[book].status = "not read";
      } else my_library[book].status = "read";
}

function deleteBook(currentBook) {
    my_library.splice(currentBook, currentBook + 1);
}

function findBook(libraryArray, name) {
    if (libraryArray.length === 0 || libraryArray === null) {
      return;
    }
    for (book of libraryArray)
      if (book.name === name) {
        return libraryArray.indexOf(book);
      }
}

function updateLocalStorage() {
    localStorage.setItem("my_library", JSON.stringify(my_library));
  }

function checkLocalStorage() {
    if (localStorage.getItem("library")) {
      my_library = JSON.parse(localStorage.getItem("my_library"));
    } else {
      my_library = DEFAULT_DATA;
    }
  }

render();















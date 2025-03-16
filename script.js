class Library {
  constructor() {
      this.my_library = [];
      this.read_ones = [];
      this.unread_ones = [];
      this.$name = document.getElementById("title");
      this.$author = document.getElementById("author");
      this.$nr_pages = document.getElementById("pages");
      this.$status = document.getElementById("status");
      this.nr_books = document.getElementById("n_books");
      this.read_books = document.getElementById("read_books");
      this.unread_books = document.getElementById("unread_books");
      this.table = document.createElement("table");
      this.tbody = document.createElement("tbody");
      this.statement = document.getElementById("statement");
      this.form = document.getElementById("form");
      this.main = document.querySelector("main");

      this.init();
  }

  init() {
      this.main.appendChild(this.table);
      this.table.appendChild(this.tbody);
      this.setAttributes(this.table, {"class": "table table-light"});
      this.form.addEventListener("submit", (event) => this.handleSubmit(event));
      this.table.addEventListener("click", (e) => this.handleTableClick(e));
      this.render();
  }

  setAttributes(el, attrs) {
      for (var key in attrs) {
          el.setAttribute(key, attrs[key]);
      }
  }

  handleSubmit(event) {
      event.preventDefault();
      this.statement.style.display = 'none';
      this.addBookToLibrary();
      this.emptyForm();
      this.render();
  }

  handleTableClick(e) {
      const currentTarget = e.target.parentNode.parentNode.childNodes[1];
      if (e.target.innerHTML == "delete") {
          if (confirm(`are you sure you want to delete ${currentTarget.innerText} ?`))
              this.deleteBook(this.findBook(this.my_library, currentTarget.innerText));
      }
      if (e.target.classList.contains("status-button")) {
          this.changeStatus(this.findBook(this.my_library, currentTarget.innerText));
      }
      this.updateLocalStorage();
      this.render();
  }

  emptyForm() {
      this.$name.value = '';
      this.$author.value = '';
      this.$nr_pages.value = '';
      this.$status.value = 'read';
  }

  render() {
      this.tbody.innerHTML = "";
      this.my_library.forEach((book) => {
          const htmlBook = `
          <tr>
              <td>${book.name}</td>
              <td>${book.author}</td>
              <td>${book.nr_pages}</td>
              <td><button class="btn btn-warning status-button">${book.status}</button></td>
              <td><button class="btn btn-danger">delete</button></td>
          </tr>
          `;
          this.tbody.insertAdjacentHTML("afterbegin", htmlBook);
      });
  }

  updateBookCounters() {
      this.read_books.textContent = this.read_ones.length;
      this.unread_books.textContent = this.unread_ones.length;
  }

  addBookToLibrary() {
      const new_book = new Book(this.$name.value, this.$author.value, this.$nr_pages.value, this.$status.value);
      this.my_library.push(new_book);
      this.updateLocalStorage();
      this.nr_books.textContent = this.my_library.length;

      if (new_book.status === "read") {
          this.read_ones.push(" ");
      } else {
          this.unread_ones.push(" ");
      }

      this.updateBookCounters();
  }

  changeStatus(bookIndex) {
      const book = this.my_library[bookIndex];
      if (book.status === "read") {
          book.status = "not read";
          this.read_ones.pop();
          this.unread_ones.push(" ");
      } else {
          book.status = "read";
          this.unread_ones.pop();
          this.read_ones.push(" ");
      }

      this.updateBookCounters();
  }

  deleteBook(currentBook) {
      this.my_library.splice(currentBook, currentBook + 1);
      this.nr_books.textContent = this.my_library.length;

      if (this.read_ones.length > 0) {
          this.read_ones.pop();
      }
      if (this.unread_ones.length > 0) {
          this.unread_ones.pop();
      }

      this.updateBookCounters();
  }

  findBook(libraryArray, name) {
      if (libraryArray.length === 0 || libraryArray === null) {
          return;
      }
      for (let book of libraryArray)
          if (book.name === name) {
              return libraryArray.indexOf(book);
          }
  }

  updateLocalStorage() {
      localStorage.setItem("my_library", JSON.stringify(this.my_library));
  }

  checkLocalStorage() {
      if (localStorage.getItem("library")) {
          this.my_library = JSON.parse(localStorage.getItem("my_library"));
      } else {
          this.my_library = DEFAULT_DATA;
      }
  }
}

class Book {
  constructor(name, author, nr_pages, status) {
      this.name = name;
      this.author = author;
      this.nr_pages = nr_pages;
      this.status = status;
  }
}

// Inicializa la biblioteca
const library = new Library();
















const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages"); 

const inputs = document.getElementsByTagName("input");
const form = document.getElementById("form");

function doSo() {

    validate_title()
    validate_author()
    validate_pages()
    form.reset();
}

function validate_title() {
    if (title.validity.valueMissing) {
        title.setCustomValidity('Dale escríbeme');
        title.validity.valueMissing === false;
    } else return;
}

function validate_author() {
    if (author.validity.valueMissing) {
        author.setCustomValidity('Dale escríbeme');
        author.validity.valueMissing === false;
    } else return;
}

function validate_pages() {
    if (pages.validity.valueMissing) {
        pages.setCustomValidity('Dale escríbeme');
        pages.validity.valueMissing === false;
    } else return;
}
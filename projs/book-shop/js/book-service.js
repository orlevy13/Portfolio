'use strict';

const KEY_BOOKS = 'books';
var gBooks;

function createBooks() {
    var books = getBooks();
    if (!books || !books.length) {
        books = [
            { id: makeId(), name: 'Life of Pi', price: getRandomInt(50, 100), imageUrl: '1.jpeg', rate: 0 },
            { id: makeId(), name: 'Meditations', price: getRandomInt(50, 100), imageUrl: '2.jpeg', rate: 0 },
            { id: makeId(), name: 'Rich dad poor dad', price: getRandomInt(50, 100), imageUrl: '3.jpeg', rate: 0 },
            { id: makeId(), name: 'The alchemist', price: getRandomInt(50, 100), imageUrl: '4.jpeg', rate: 0 },
            { id: makeId(), name: 'The subtle art of not giving a fuck', price: getRandomInt(50, 100), imageUrl: '5.jpeg', rate: 0 }
        ];
    };
    gBooks = books;
    saveToStorage(KEY_BOOKS, gBooks);
};


function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => book.id === bookId);
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveToStorage(KEY_BOOKS, gBooks);
};

function addBook(name, price) {
    var book = {
        id: makeId(),
        name: name,
        price: price,
        imageUrl: 'noimg.jpeg',
        rate: 0
    };
    gBooks.push(book);
    saveToStorage(KEY_BOOKS, gBooks);
};


function updateBook(bookId, price) {
    var book = getBook(bookId);
    if (!book) return;
    book.price = price;
    saveToStorage(KEY_BOOKS, gBooks);
};


function changeRate(bookId, value) {
    var book = getBook(bookId);
    if (book.rate === 10 && value === 1 || //rate must be between 1-10
        book.rate === 0 && value === -1) return;
    book.rate += value;
    saveToStorage(KEY_BOOKS, gBooks);
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId);
};

function getBooks() {
    return loadFromStorage(KEY_BOOKS);
};
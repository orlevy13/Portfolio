'use strict';

function onInit() {
    createBooks();
    renderBooks();
}


function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(book => {
        return `<tr> <td>${book.id}</td>
        <td class="book-name">${book.name}</td>
        <td>${book.price}</td>
        <td><img src="images/${book.imageUrl}"</td>
        <td class="action-btn"><span onclick="onReadBook('${book.id}')">Read</span></td>
        <td class="action-btn"><span onclick="onUpdateBook('${book.id}')">Update</span></td>
        <td class="action-btn"><span onclick="onRemoveBook('${book.id}')">Delete</span></td> </tr>`
    });
    document.querySelector('tbody').innerHTML = strHTML.join('');
};

function readBook(bookId) {
    var book = getBook(bookId);
    var strHTML = `<div class="book-title">${book.name}<button onclick="onHideModal()">✖️</button></div>
    <img src="/images/${book.imageUrl}" width="100">
    <div class="book-rate">Rate:
    <button onclick="onChangeRate('${bookId}',-1)">-</button>
    ${book.rate}<button onclick="onChangeRate('${bookId}',1)">+</button>
    </div>
    <p class="book-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo aperiam
    voluptatem! Vero aut, placeat autem natus corrupti ipsam nobis tempora quam, nisi reprehenderit, magni
    impedit cumque possimus ea tempore? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
    inventore voluptates voluptas reprehenderit, enim neque iusto. Tempore culpa, veniam cupiditate
    repudiandae ex natus atque dolor assumenda, aliquid maxime delectus excepturi. </p>`;
    document.querySelector('.book-details').innerHTML = strHTML;
}

function showInputFieldForNewBook() {
    document.querySelector('.input-field').style = 'display: flex;';
    document.querySelector('.name-input').style = 'display: block'
    // document.querySelector('.update-btn').style = 'display: none';
}

function onAddBook() {
    document.querySelector('.input-field').style = 'display: none;';
    var name = document.querySelector('input[name="book-name"]').value;
    if (!name) return;
    var price = document.querySelector('input[name="book-price"]').value;
    if (!price) return;
    addBook(name, price);
    renderBooks();
    document.querySelector('input[name="book-name"]').value = null;
    document.querySelector('input[name="book-price"]').value = null;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

// function showInputFieldToUpdateBook() {
//     showInputFieldForNewBook();
//     document.querySelector('.name-input').style = 'display: none';
//     document.querySelector('.update-btn').style = 'display: block';
// }


function onUpdateBook(bookId) {
    var price = +prompt('Price?');//todo: get info from input
    if (price < 0 || isNaN(price)) return;
    updateBook(bookId, price);
    renderBooks();
};


function onReadBook(bookId) {
    readBook(bookId);
    document.querySelector('.book-details').classList.remove('hide');
}


function onHideModal() {
    document.querySelector('.book-details').classList.add('hide');
}

function onChangeRate(bookId, value) {
    changeRate(bookId, value);
    readBook(bookId);
}
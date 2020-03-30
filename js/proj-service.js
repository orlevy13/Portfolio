'use strict';

var gProjs = [
    {
        id: "minesweeper",
        name: "MineSweeper",
        title: "Can you dodge the mines?",
        desc: "Same old MineSweeper with added features and style!",
        url: "https://orlevy13.github.io/MineSweeper/",
        publishedAt: 'March 19th, 2020',
        labels: ["Matrixes", "Games"],
    },
    {
        id: "book-shop",
        name: "Book Shop",
        title: "Simple Ecom example",
        desc: "My books",
        url: "projs/book-shop/book-shop.html",
        publishedAt: 'March 29th, 2020',
        labels: ["Ecom", "Layout"],
    },
    {
        id: "pacman",
        name: "Pacman",
        title: "Do I really need to say?",
        desc: `Pac-Man is a maze chase video game.
        The player controls the titular character through an enclosed maze
        the objective of the game is to eat all of the dots placed in the maze 
        while avoiding four colored ghosts that pursue him.`,
        url: "projs/pacman/index.html",
        publishedAt: 'March 25th, 2020',
        labels: ["Matrixes", "Games"],
    }
];

function getGProjs() {
    return gProjs;
}

function getProjById(projId) {
    return gProjs.find(proj => proj.id === projId);
}


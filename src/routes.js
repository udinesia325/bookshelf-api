const { storeBook, allBook, allBookWithid, updateBook, deleteBook } = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/books",
        handler: storeBook
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: allBookWithid
    },
    {
        method: "GET",
        path: "/books",
        handler: allBook
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: updateBook
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBook
    },

]


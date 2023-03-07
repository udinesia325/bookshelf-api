const { storeBook } = require("./handler");

module.exports = [
    {
        method: "POST",
        path: "/books",
        handler:storeBook
    }
]


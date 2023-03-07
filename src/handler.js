const { nanoid } = require("nanoid")
const books = require("./books")

const storeBook = (request, h) => {
    const payload = request.payload
    const id = nanoid()
    if (!payload.name) {
        return h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }).code(400)
    }
    if (payload.readPage > payload.pageCount) {
        return h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400)
    }
    const now = new Date().toISOString()
    books.push({
        id,
        ...payload,
        finished: payload.pageCount === payload.readPage,
        updatedAt: now,
        insertedAt: now,
    })
    return h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            "bookId": id
        }
    }).code(201)

}

const allBook = (request, h) => {

    return {
        "status": "success",
        "data": {
            books:
                [...books.map(book => {
                    return { id: book.id, name: book.name, publisher: book.publisher }
                })]

        }

    }
}
const allBookWithid = (request, h) => {
    const { bookId = null } = request.params
    const indexTarget = books.findIndex((book) => book.id == bookId)
    if (indexTarget == -1) {
        return h.response({
            "status": "fail",
            "message": "Buku tidak ditemukan"
        }).code(404)

    }
    return {
        "status": "success",
        "data": {
            book: { ...books[indexTarget] }
        }
    }
}
const updateBook = (request, h) => {
    const { bookId = null } = request.params
    const payload = request.payload
    // jika tidak ada name 
    if (!payload.name) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400)
    }
    // jika readpage lebih besar
    if (payload.readPage > payload.pageCount) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400)
    }
    const indexTarget = books.findIndex((book) => book.id == bookId)
    if (indexTarget == -1) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404)

    }
    books[indexTarget] = {
        ...books[indexTarget],
        ...payload
    }
    return {
        "status": "success",
        "message": "Buku berhasil diperbarui"
    }
}
const deleteBook = (request, h) => {
    const { bookId = null } = request.params
    const indexTarget = books.findIndex((book) => book.id == bookId)
    if (indexTarget == -1) {
        return h.response({
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan"
        }).code(404)

    }
    books.splice(indexTarget, 1)
    return {
        "status": "success",
        "message": "Buku berhasil dihapus"
    }
}

module.exports = { storeBook, allBook, allBookWithid, updateBook, deleteBook }
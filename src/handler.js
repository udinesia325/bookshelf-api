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
    return {
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            "bookId": id
        }
    }

}

module.exports = { storeBook }
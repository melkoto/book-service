const prisma = require('../../../prisma/prismaClient')

exports.findAll = async () => {
    return prisma.book.findMany()
}

exports.findById = async (bookId) => {
    return prisma.book.findUnique({
        where: { id: parseInt(bookId) },
    })
}

exports.create = async (bookData) => {
    return prisma.book.create({
        data: bookData,
    })
}

exports.update = async (bookId, bookData) => {
    return prisma.book.update({
        where: { id: parseInt(bookId) },
        data: bookData,
    })
}

exports.delete = async (bookId) => {
    await prisma.book.delete({
        where: { id: parseInt(bookId) },
    })
    return true
}

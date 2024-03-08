function bookResponseDto(book) {
    const { ...rest } = book

    return rest
}

module.exports = bookResponseDto

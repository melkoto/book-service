```Получение всех книг:
GET /books
Получение книги по ID:

GET /books/{bookId}
Создание новой книги:

POST /books
Обновление информации о книге:

PUT /books/{bookId}
Удаление книги:

DELETE /books/{bookId}
Получение всех комментариев для определенной книги:

GET /books/{bookId}/comments
Получение комментария по ID:

GET /comments/{commentId}
Создание нового комментария для книги:

POST /books/{bookId}/comments
Обновление информации о комментарии:

PUT /comments/{commentId}
Удаление комментария:

DELETE /comments/{commentId}
Получение всех лайков для определенного комментария или книги:

GET /comments/{commentId}/likes
GET /books/{bookId}/likes
Добавление лайка к комментарию или книге:

POST /comments/{commentId}/likes
POST /books/{bookId}/likes
Удаление лайка:

DELETE /likes/{likeId}
Получение всех дизлайков для определенного комментария или книги:

GET /comments/{commentId}/dislikes
GET /books/{bookId}/dislikes
Добавление дизлайка к комментарию или книге:

POST /comments/{commentId}/dislikes
POST /books/{bookId}/dislikes
Удаление дизлайка:

DELETE /dislikes/{dislikeId}
Получение всех пользователей:

GET /users
Получение пользователя по ID:

GET /users/{userId}
Создание нового пользователя:

POST /users
Обновление информации о пользователе:

PUT /users/{userId}
Удаление пользователя:

DELETE /users/{userId}

```

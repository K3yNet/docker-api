const request = require('supertest');
const { app } = require("../src/server");

describe('Book API', () => {
    let newBook;

    it('POST /books - create a book', async () => {
        const response = await request(app)
            .post('/books')
            .send({
                title: "Test title",
                author: "Test author",
                pages: 777,
                genres: ["Test genre"],
                rating: 7
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Test title");
        newBook = response.body; // Salva o livro criado para usar nos outros testes
    });

    it('GET /books - get all books', async () => {
        const response = await request(app)
            .get('/books');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('GET /books/:id - get a book by id', async () => {
        const response = await request(app)
            .get(`/books/${newBook._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Test title");
    });

    it('PUT /books/:id - update a book', async () => {
        const response = await request(app)
            .put(`/books/${newBook._id}`)
            .send({
                rating: 77
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.rating).toBe(77)
    });

    it('DELETE /books/:id - delete a book', async () => {
        const response = await request(app)
            .delete(`/books/${newBook._id}`);
        expect(response.statusCode).toBe(204);
        expect(response.body).toEqual({});
    });
});
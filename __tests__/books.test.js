const request = require('supertest');
const app = require('../path/to/your/server'); // Atualize com o caminho correto do seu app Express

describe('Book API', () => {
    let newBook;

    it('POST /book - create a book', async () => {
        const response = await request(app)
            .post('/book')
            .send({
                title: "1984",
                author: "George Orwell",
                pages: 328,
                genres: ["dystopian", "political fiction"],
                rating: 9
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("1984");
        newBook = response.body; // Salva o livro criado para usar nos outros testes
    });

    it('GET /book - get all books', async () => {
        const response = await request(app)
            .get('/book');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('GET /book/:id - get a book by id', async () => {
        const response = await request(app)
            .get(`/book/${newBook._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("1984");
    });

    it('PUT /book/:id - update a book', async () => {
        const response = await request(app)
            .put(`/book/${newBook._id}`)
            .send({
                rating: 10
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Book updated!");
    });

    it('DELETE /book/:id - delete a book', async () => {
        const response = await request(app)
            .delete(`/book/${newBook._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Book deleted!");
    });
});
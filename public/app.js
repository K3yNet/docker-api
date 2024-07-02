document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-book-form');
    const bookList = document.getElementById('books');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const genres = document.getElementById('genres').value.split(',');
        const rating = document.getElementById('rating').value;

        const book = {
            title,
            author,
            pages: parseInt(pages),
            genres,
            rating: parseFloat(rating)
        };

        try {
            const response = await fetch('/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            const newBook = await response.json();
            addBookToList(newBook);
        } catch (error) {
            console.error('Error adding book:', error);
        }

        form.reset();
    });

    async function fetchBooks() {
        try {
            const response = await fetch('/books');
            const books = await response.json();
            books.forEach(book => addBookToList(book));
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    function addBookToList(book) {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} - ${book.pages} pages - Rating: ${book.rating}`;
        bookList.appendChild(li);
    }

    fetchBooks();
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-book-form');
    const bookList = document.getElementById('books');
    const updatePopup = document.getElementById('update-book-popup');
    const updateForm = document.getElementById('update-book-form');
    let currentBookId = null;

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
            console.error('Erro ao adicionar livro:', error);
        }

        form.reset();
    });

    async function fetchBooks() {
        try {
            const response = await fetch('/books');
            const books = await response.json();
            books.forEach(book => addBookToList(book));
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    }

    function addBookToList(book) {
        const li = document.createElement('li');
        li.textContent = `${book.title} por ${book.author} - ${book.pages} páginas - Nota: ${book.rating}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Book';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', async () => {
            try {
                await fetch(`/books/${book._id}`, {
                    method: 'DELETE'
                });
                li.remove();
            } catch (error) {
                console.error('Erro ao deletar livro:', error);
            }
        });

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update Book';
        updateButton.classList.add('update');
        updateButton.addEventListener('click', () => {
            currentBookId = book._id;
            document.getElementById('update-title').value = book.title;
            document.getElementById('update-author').value = book.author;
            document.getElementById('update-pages').value = book.pages;
            document.getElementById('update-genres').value = book.genres.join(',');
            document.getElementById('update-rating').value = book.rating;
            updatePopup.showModal();
        });

        li.appendChild(updateButton);
        li.appendChild(deleteButton);
        bookList.appendChild(li);
    }

    updateForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('update-title').value;
        const author = document.getElementById('update-author').value;
        const pages = document.getElementById('update-pages').value;
        const genres = document.getElementById('update-genres').value.split(',');
        const rating = document.getElementById('update-rating').value;

        const updatedBook = {
            title,
            author,
            pages: parseInt(pages),
            genres,
            rating: parseFloat(rating)
        };

        try {
            await fetch(`/books/${currentBookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBook)
            });
            updatePopup.close();
            bookList.innerHTML = '';
            fetchBooks();
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
        }
    });

    document.getElementById('close-popup').addEventListener('click', () => {
        updatePopup.close();
    });

    fetchBooks();
});
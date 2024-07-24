import { Inter } from "next/font/google";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]); // Lista de livros a serem exibidos
  const [book, setBook] = useState({
    title: '',
    author: '',
    pages: '',
    genres: '',
    rating: ''
  });
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState({
    id: '',
    title: '',
    author: '',
    pages: '',
    genres: '',
    rating: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3030/books');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [data]);

  const handleAddBook = async (event) => {
    event.preventDefault();
    const genresArray = book.genres.split(',').map(genre => genre.trim());

    try {
      const response = await axios.post('http://localhost:3030/books', {
        title: book.title,
        author: book.author,
        pages: parseInt(book.pages, 10),
        genres: genresArray,
        rating: parseFloat(book.rating),
      });

      const newData = [...data, response.data];
      setData(newData);

      setBook({
        title: '',
        author: '',
        pages: '',
        genres: '',
        rating: ''
      });

      setError(null);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteBook = async (_id) => {
    try {
      await axios.delete(`http://localhost:3030/books/${_id}`);
      const newData = data.filter(item => item._id !== _id);
      setData(newData);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedBook = { ...book, [name]: value };
    setBook(updatedBook);
  };

  function openModal(idPopup) {
    const popup = document.getElementById(idPopup);
    popup.showModal();
  }

  function closeModal(idPopup) {
    const popup = document.getElementById(idPopup);
    popup.close();
  }

  return (
    <div className={styles.container}>
      <form className={styles.addBookForm} onSubmit={handleAddBook}>
        <h2>Add a New Book</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            name="author"
            type="text"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pages">Pages:</label>
          <input
            id="pages"
            name="pages"
            type="number"
            value={book.pages}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="genres">Genres (comma-separated):</label>
          <input
            id="genres"
            name="genres"
            type="text"
            value={book.genres}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            value={book.rating}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Add Book</button>
      </form>

      <main>
        <ul className={styles.bookList}>
          {data.map(item => (
            <li key={item._id} className={styles.bookItem}>
              <div className={styles.bookTitle}>{item.title}</div>

              <div className={styles.bookDetails}>
                <div className={styles.bookDetail}><span>Author:</span> {item.author}</div>
                <div className={styles.bookDetail}><span>Pages:</span> {item.pages}</div>
                <div className={styles.bookDetail}><span>Genres:</span> {item.genres.join(', ')}</div>
                <div className={styles.bookDetail}><span>Rating:</span> {item.rating}</div>

                <button
                  className={styles.updateButton}
                  onClick={() => openModal('updatePopUp')}
                >
                  Update
                </button>

                <dialog id="updatePopUp">
                  <h2>Título do Pop-up</h2>
                  <p>Este é o conteúdo do pop-up.</p>
                  <button
                    className={styles.updateButton}
                    onClick={() => closeModal('closeUpdatePopUp')}
                  >
                    Update
                  </button>
                </dialog>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteBook(item._id)}
                >
                  Delete
                </button>
              </div>

            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
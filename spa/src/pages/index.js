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
  }, []);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedBook = { ...book, [name]: value };
    setBook(updatedBook);
  };

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
            <li key={item.id} className={styles.bookItem}>
              <div className={styles.bookTitle}>{item.title}</div>
              <div className={styles.bookDetails}>
                <div className={styles.bookDetail}><span>Author:</span> {item.author}</div>
                <div className={styles.bookDetail}><span>Pages:</span> {item.pages}</div>
                <div className={styles.bookDetail}><span>Genres:</span> {item.genres.join(', ')}</div>
                <div className={styles.bookDetail}><span>Rating:</span> {item.rating}</div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
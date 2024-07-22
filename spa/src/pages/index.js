import { Inter } from "next/font/google";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css'; // Importando o CSS

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [genres, setGenres] = useState('');
  const [rating, setRating] = useState('');
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
    const genresArray = genres.split(',').map(genre => genre.trim());

    try {
      const response = await axios.post('http://localhost:3030/books', {
        title,
        author,
        pages: parseInt(pages, 10),
        genres: genresArray,
        rating: parseFloat(rating),
      });

      setData(prevData => [...prevData, response.data]); // Atualiza a lista de livros
      setTitle('');
      setAuthor('');
      setPages('');
      setGenres('');
      setRating('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
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
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pages">Pages:</label>
          <input
            id="pages"
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="genres">Genres (comma-separated):</label>
          <input
            id="genres"
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
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
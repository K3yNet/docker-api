// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import api from '../api';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/books');
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book._id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
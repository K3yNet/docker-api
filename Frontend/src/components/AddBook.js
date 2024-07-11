// src/components/AddBook.js
import React, { useState } from 'react';
import api from '../api';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/books', { title, author });
            console.log('Book added:', response.data);
        } catch (error) {
            console.error("Error adding book", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
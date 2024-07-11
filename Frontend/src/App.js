// src/App.js
import React from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const App = () => {
  return (
    <div>
      <AddBook />
      <BookList />
    </div>
  );
};

export default App;

import React from "react";
import BookstoreService from "../../services/bookstore-service";
import BookList from '../book-list';

const bookstoreService = new BookstoreService();

const HomePage = () => {
    return <BookList books={bookstoreService.getBooks()} />;
};

export default HomePage;
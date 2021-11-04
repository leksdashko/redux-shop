import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchBooks, bookAddedToCart } from "../../actions";
import BookListItem from "../book-list-item";
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import { withBookstoreService } from '../hoc';
import './book-list.css';

const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}><BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)}/></li>
                    );
                })
            }
        </ul>
    );
};

class BookListContainer extends Component {

    componentDidMount(){
        this.props.fetchBooks();
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props;

        if(loading){
            return <Spinner/>
        }

        if(error){
            return <ErrorIndicator />
        }

        return <BookList books={books} onAddedToCart={onAddedToCart} />
    }
}

// const mapStateToProps = (state) => {
//     return {
//         books: state.books,
//         loading: state.loading
//     }
// };

// const mapDispatchToProps = {
//     booksLoaded,
//     booksRequested,
//     booksError
// };

const mapStateToProps = ({bookList: {books, loading, error}}) => {
    return {books, loading, error};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;

    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(BookListContainer);
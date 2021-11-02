import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchBooks } from "../../actions";
import BookListItem from "../book-list-item";
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import { withBookstoreService } from '../hoc';
import './book-list.css';

const BookList = ({books}) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}><BookListItem  book={book}/></li>
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
        const { books, loading, error } = this.props;

        if(loading){
            return <Spinner/>
        }

        if(error){
            return <ErrorIndicator />
        }

        return <BookList books={books} />
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

const mapStateToProps = ({books, loading, error}) => {
    return {books, loading, error};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;

    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch)
    }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(BookListContainer);
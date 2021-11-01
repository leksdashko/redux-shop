import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { booksLoaded, booksRequested, booksError } from "../../actions";
import BookListItem from "../book-list-item";
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import { withBookstoreService } from '../hoc';
import './book-list.css';

class BookList extends Component {

    componentDidMount(){
        // 1. receive data
        const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;

        booksRequested();

        bookstoreService.getBooks().then((data) => {
            // 2. dispatch action to store
            booksLoaded(data); 
        })
        .catch((err) => booksError(err));
    }

    render() {
        const { books, loading, error } = this.props;

        if(loading){
            return <Spinner/>
        }

        if(error){
            return <ErrorIndicator />
        }

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
    }
}

// const mapStateToProps = (state) => {
//     return {
//         books: state.books,
//         loading: state.loading
//     }
// };

const mapStateToProps = ({books, loading, error}) => {
    return {books, loading, error};
};

const mapDispatchToProps = {
    booksLoaded,
    booksRequested,
    booksError
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(BookList);
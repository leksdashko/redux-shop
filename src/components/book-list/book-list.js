import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { booksLoaded, booksRequested } from "../../actions";
import BookListItem from "../book-list-item";
import Spinner from '../spinner';

import { withBookstoreService } from '../hoc';
import './book-list.css';

class BookList extends Component {

    componentDidMount(){
        // 1. receive data
        const { bookstoreService, booksLoaded, booksRequested } = this.props;

        booksRequested();

        bookstoreService.getBooks().then((data) => {
            // 2. dispatch action to store
            booksLoaded(data); 
        });
    }

    render() {
        const { books, loading } = this.props;

        if(loading){
            return <Spinner/>
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

const mapStateToProps = ({books, loading}) => {
    return {books, loading};
};

const mapDispatchToProps = {
    booksLoaded,
    booksRequested
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps),
)(BookList);
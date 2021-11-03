const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 220
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            }
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            }
        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            }
        case 'BOOK_ADDED_TO_CART':
            const bookId = action.payload;
            const cartBook = state.cartItems.find((book) => book.id === bookId);
            const book = state.books.find((book) => book.id === bookId);

            if(cartBook){
                const cartItems = [];
                state.cartItems.map((item) => {
                    if(item.id === bookId){
                        item = {
                            ...item,
                            count: ++item.count,
                            total: item.total + book.price
                        };
                    }
                    cartItems.push(item);
                });

                return {
                    ...state,
                    cartItems: cartItems
                }
            }
            
            const newItem = {
                id: book.id,
                title: book.title,
                count: 1,
                total: book.price
            };

            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    newItem
                ]
            }
        default:
            return state;
    }
}

export default reducer;
import { Book } from "../../interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface BooksState {
    isFetching: boolean;
    error: null | Error;
    books: Book[] | [];
    currentBook: Book;
}

const initialState: BooksState = {
    isFetching: false,
    error: null,
    books: [],
    currentBook: {
        _id: '',
        name: '',
        category: '',
        subcategory: '',
        webImage: '',
        mobileImage: '',
        files: [],
        indexName: '',
        initialMessage: '',
        suggestedQuestions: []
    }
}


const booksSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action: PayloadAction<Error>) => { state.isFetching = false; state.error = action.payload; },


        getBooksReducer: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload
        },
        setBookReducer: (state, action: PayloadAction<Book>) => {
            state.currentBook = action.payload
        },
        searchBookReducer: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload
        },
        uploadFileReducer: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload
        },
        createBookReducer: (state, action: PayloadAction<Book>) => {
            state.books = [...state.books, action.payload]
        },
        updateBookReducer: (state, action: PayloadAction<Book>) => {
            state.books = state.books.map(book => book = book._id == action.payload._id ? action.payload : book);
        },
        enableFileReducer: (state) => {
            state.books = state.books.map(book=>book)
        },
        disableFileReducer: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload
        },
        deleteBookReducer: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter((book: Book) => book._id != action.payload);
        },
        deleteFileFromBookReducer: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload
        },
        deleteFileReducer: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload
        },


    }
})

export const {
    start, end, error,
    setBookReducer,
    getBooksReducer,
    searchBookReducer,
    uploadFileReducer,
    createBookReducer,
     updateBookReducer,
    enableFileReducer,
    disableFileReducer,
    deleteBookReducer,
    deleteFileFromBookReducer,
    deleteFileReducer,
} = booksSlice.actions
export default booksSlice.reducer
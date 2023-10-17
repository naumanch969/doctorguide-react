import { Book } from '../../interfaces';
import * as api from '../api'
import {
    start, end, error,
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
} from '../reducer/book'
import { AsyncAction } from '../store'

export const getBooks = (query: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.getBooks(query)
        dispatch(getBooksReducer(data.results))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const searchBook = (searchValue: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.searchBook(searchValue)
        dispatch(searchBookReducer(data.results))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const createBook = (bookData: Omit<Book, 'files'> & { files: string[] }): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.createBook(bookData)
        dispatch(createBookReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
interface CustomBook {
    name: string,
    category: string,
    subcategory: string,
    webImage: string,
    mobileImage: string,
}
export const updateBook = (bookId: string, bookData: CustomBook): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.updateBook(bookId, bookData)
        dispatch(updateBookReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteBook = (bookId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteBook(bookId)
        dispatch(deleteBookReducer(bookId))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}


export const uploadFile = (file: FormData): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.uploadFile(file)
        dispatch(uploadFileReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const enableFile = (fileId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.enableFile(fileId)
        dispatch(enableFileReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const disableFile = (fileId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.disableFile(fileId)
        dispatch(disableFileReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteFileFromBook = (bookId: string, fileId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteFileFromBook(bookId, fileId)
        dispatch(deleteFileFromBookReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const deleteFile = (fileId: string): AsyncAction => async (dispatch, getState) => {
    try {
        dispatch(start())
        const { data } = await api.deleteFile(fileId)
        dispatch(deleteFileReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
} 